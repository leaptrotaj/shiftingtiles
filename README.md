[Shifting Tiles](https://github.com/leaptrotaj/shiftingtiles/)
=============

Shifting Tiles is a photo gallery that looks like the OS X Mountain Lion's Shifting Tiles screensaver.


I couldn't find a suitable replacement for this old screensaver, but thankfully hermanbanken had already developed something. I made updates because their last commit was 13 years prior, but it's largely still the same product.

On Windows, I launch the webpage with Mongoose (https://mongoose.ws/) using a schedulted task.
At user logon, it runs:
  conhost.exe --headless "D:\Scripts and Tools\Shifting Tiles\mongoose.exe" -d "D:\Scripts and Tools\Shifting Tiles"

Then I can see the gallery in my web browser at http://mylocalip:8000/


Check out the sample with some of my drone pictures at
https://leaptrotaj.github.io/shiftingtiles/


How To Update Images
=============

1. Put the images for your gallery into /images
2. Run shiftingtiles/updateimages.json.ps1 to generate a new version of shiftingtiles/images.json
   - Or you can update the array yourself -- my way feels easier.
  

Note: Because the javascript is using the local file "images.json", double-clicking index.html will not launch the gallery. That is why a tool like Mongoose.exe or GitHub Pages is needed for hosting. 
