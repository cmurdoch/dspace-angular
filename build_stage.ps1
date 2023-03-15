#param ($env='Prod')

#id's of the thesis and aut open research collections
#prod thesis
#b716080b-eeac-450b-a4e4-f4c0d87b6db0
#stage
#c1a67939-5700-41a4-9c49-ea1da42ee2ff

#prod open research
#e5184fa2-e342-4984-9e74-5cf6ec0971e4
#stage
#2f1dac01-66e8-4d18-938f-6e9a9f52c279
#replace the prod collection GUIDs on the home page with the stage GUIDs
(((Get-Content -Path C:\Users\nhunt\repos\dspace-angular-aut\src\themes\aut\app\home-page\home-page.component.html) -replace 'b716080b-eeac-450b-a4e4-f4c0d87b6db0', 'c1a67939-5700-41a4-9c49-ea1da42ee2ff') -replace 'e5184fa2-e342-4984-9e74-5cf6ec0971e4','2f1dac01-66e8-4d18-938f-6e9a9f52c279')  | Set-Content -Path C:\Users\nhunt\repos\dspace-angular-aut\src\themes\aut\app\home-page\home-page.component.html
#it's possible that if we have been running this on dev, that the dev GUIDs would be active so replace them
(((Get-Content -Path C:\Users\nhunt\repos\dspace-angular-aut\src\themes\aut\app\home-page\home-page.component.html) -replace 'b168151e-a186-41c7-bce5-88f04793bbd4', 'c1a67939-5700-41a4-9c49-ea1da42ee2ff') -replace 'c9c94ae0-30a0-4a80-9496-c34060caaac0','2f1dac01-66e8-4d18-938f-6e9a9f52c279')  | Set-Content -Path C:\Users\nhunt\repos\dspace-angular-aut\src\themes\aut\app\home-page\home-page.component.html
#write-host "This is for env: $env"
podman build ./ -f Dockerfile_stage -t libraryappscontainerregistry.azurecr.io/dspaceangularaut:latest_stage

#reverse the GUID change we did
(((Get-Content -Path C:\Users\nhunt\repos\dspace-angular-aut\src\themes\aut\app\home-page\home-page.component.html) -replace 'c1a67939-5700-41a4-9c49-ea1da42ee2ff', 'b716080b-eeac-450b-a4e4-f4c0d87b6db0') -replace '2f1dac01-66e8-4d18-938f-6e9a9f52c279','e5184fa2-e342-4984-9e74-5cf6ec0971e4')  | Set-Content -Path C:\Users\nhunt\repos\dspace-angular-aut\src\themes\aut\app\home-page\home-page.component.html