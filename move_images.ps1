# PowerShell script to move and rename transformation images
$ErrorActionPreference = 'Stop'

# Define source and destination
$src1 = "input\Screenshot 2025-07-12 012915.png"
$dst1 = "images\portfolio\transformations\before.png"
$src2 = "input\new transoform.png"
$dst2 = "images\portfolio\transformations\after.png"

# Move and rename
if (Test-Path $src1) { Move-Item -Force $src1 $dst1 }
if (Test-Path $src2) { Move-Item -Force $src2 $dst2 }

Write-Host "Transformation images moved and renamed successfully." 