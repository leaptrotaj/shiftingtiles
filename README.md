[Shifting Tiles](https://github.com/leaptrotaj/shiftingtiles/)
=============

Shifting Tiles is the gallery that looks like the OS X Mountain Lion's Shifting Tiles screensaver.

It pissed me off that I couldn't find a suitable replacement for this stupid screensaver, but thankfully hermanbanken had already developed something. I made updates because their last commit was 13 years prior, but overall I have so little idea what I'm doing here. I just want to make a digital photo display that my wife can hang on the wall.

On Windows, I launch the webpage with Mongoose (https://mongoose.ws/) using a schedulted task.
At user logon, it runs:
  conhost.exe --headless "D:\Scripts and Tools\Shifting Tiles\mongoose.exe" -d "D:\Scripts and Tools\Shifting Tiles"
  
