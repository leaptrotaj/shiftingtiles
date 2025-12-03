$scriptDir   = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectRoot = Split-Path -Parent $scriptDir
$imagesPath  = Join-Path $projectRoot "images"
$outputFile  = Join-Path $projectRoot "images.json"

# Build images.json
$files = Get-ChildItem -Path $imagesPath -File | Where-Object { $_.Extension -match '^(?i)\.(jpg|jpeg|png|gif)$' }
$relativePaths = $files | ForEach-Object { "images/" + $_.Name }
$json = @{ images = $relativePaths } | ConvertTo-Json -Depth 2
$json | Out-File -FilePath $outputFile -Encoding UTF8
