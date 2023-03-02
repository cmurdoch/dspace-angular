#param ($env='Prod')

#write-host "This is for env: $env"
podman build ./ -f Dockerfile_stage -t libraryappscontainerregistry.azurecr.io/dspaceangularaut:latest_stage