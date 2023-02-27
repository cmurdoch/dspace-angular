#param ($env='Prod')

#write-host "This is for env: $env"
podman build ./ -t libraryappscontainerregistry.azurecr.io/dspaceangularaut:latest