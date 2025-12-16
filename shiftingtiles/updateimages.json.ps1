$scriptDir   = $PSScriptRoot
$projectRoot = Split-Path -Parent $scriptDir
$imagesPath  = Join-Path $projectRoot "images"
$outputFile  = Join-Path $projectRoot "index.html"

# Build the JS array
$files = Get-ChildItem -Path $imagesPath -File | Where-Object { $_.Extension -match '^(?i)\.(jpg|jpeg|png|gif)$' }
$relativePaths = $files | ForEach-Object { "'images/" + $_.Name + "'" }
$jsArray = "    const images = [" + [string]::Join(",`n      ", $relativePaths) + "`n];"

# Build the full HTML content
$html = @"
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Leaptrot Den Photo Album</title>
  <link rel="stylesheet" href="shiftingtiles/shiftingtiles.css">
  <link rel="icon" type="image/png" href="shiftingtiles/favicon.png">
  <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
  <script src="shiftingtiles/shiftingtiles.js" defer></script>
</head>
<body>
  <div id="elem" class="shiftingtiles"></div>

  <script>
$jsArray
  </script>

  <script>
    `$(function() {
      console.log("Loaded images:", images);
      `$("#elem").shiftingtiles(images, { 
        duration: 6000,
        jitterPercent: 0.25
      });

      `$("#elem").on("st-animate-before", function(e, disappear) {
        console.log("Animating tile:", disappear);
      });
    });
  </script>
</body>
</html>
"@

# Save index.html
$html | Out-File -FilePath $outputFile -Encoding UTF8
