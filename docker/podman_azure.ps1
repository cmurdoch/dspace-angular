podman pull libraryappscontainerregistry.azurecr.io/dspaceangularaut:latest


podman pod stop dspaceui
podman pod rm dspaceui

podman pod create --publish 4000:4000 dspaceui

podman run -dt --pod dspaceui --name dspaceui_ui -e DSPACE_UI_HOST=0.0.0.0 -e DSPACE_REST_HOST=openrepositorydev.aut.ac.nz libraryappscontainerregistry.azurecr.io/dspaceangularaut:latest