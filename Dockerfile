# This image will be published as dspace/dspace-angular
# See https://github.com/DSpace/dspace-angular/tree/main/docker for usage details

FROM docker.io/library/node:14-alpine
WORKDIR /app
ADD . /app/
EXPOSE 4000
ENV NODE_OPTIONS=--max_old_space_size=4144

# We run yarn install with an increased network timeout (5min) to avoid "ESOCKETTIMEDOUT" errors from hub.docker.com
# See, for example https://github.com/yarnpkg/yarn/issues/5540
RUN yarn install --network-timeout 300000

#generate the production browser and server stubs
RUN yarn run build:prod

#environment variables - can be overwritten in the environmental variables of the container
ENV DSPACE_UI_SSL='false'
ENV DSPACE_UI_HOST='localhost'
ENV DSPACE_UI_PORT='4000'
ENV DSPACE_UI_NAMESPACE='/'
ENV DSPACE_REST_SSL='true'
ENV DSPACE_REST_HOST='openrepositorydev.aut.ac.nz'
ENV DSPACE_REST_PORT='443'
ENV DSPACE_REST_NAMESPACE='/server'

# ssr is production mode
# make it listen on 0.0.0.0 and use the pod to handle external networking
#for prod use ssr - dev needs ssr disabled because of cross site scripting issues
#CMD yarn serve:ssr --host 0.0.0.0
CMD yarn serve:ssr --host 0.0.0.0

