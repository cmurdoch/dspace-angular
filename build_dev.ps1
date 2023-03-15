#For now this just changes some stuff in files

#id's of the thesis and aut open research collections
#prod thesis
#b716080b-eeac-450b-a4e4-f4c0d87b6db0
#dev
#b168151e-a186-41c7-bce5-88f04793bbd4

#prod open research
#e5184fa2-e342-4984-9e74-5cf6ec0971e4
#dev
#c9c94ae0-30a0-4a80-9496-c34060caaac0
#replace the prod collection GUIDs on the home page with the stage GUIDs
(((Get-Content -Path C:\Users\nhunt\repos\dspace-angular-aut\src\themes\aut\app\home-page\home-page.component.html) -replace 'b716080b-eeac-450b-a4e4-f4c0d87b6db0', 'b168151e-a186-41c7-bce5-88f04793bbd4') -replace 'e5184fa2-e342-4984-9e74-5cf6ec0971e4','c9c94ae0-30a0-4a80-9496-c34060caaac0')  | Set-Content -Path C:\Users\nhunt\repos\dspace-angular-aut\src\themes\aut\app\home-page\home-page.component.html
#write-host "This is for env: $env"
#podman build ./ -f Dockerfile_stage -t libraryappscontainerregistry.azurecr.io/dspaceangularaut:latest_dev

#reverse the GUID change we did
#(((Get-Content -Path C:\Users\nhunt\repos\dspace-angular-aut\src\themes\aut\app\home-page\home-page.component.html) -replace 'b168151e-a186-41c7-bce5-88f04793bbd4', 'b716080b-eeac-450b-a4e4-f4c0d87b6db0') -replace 'c9c94ae0-30a0-4a80-9496-c34060caaac0','e5184fa2-e342-4984-9e74-5cf6ec0971e4')  | Set-Content -Path C:\Users\nhunt\repos\dspace-angular-aut\src\themes\aut\app\home-page\home-page.component.html