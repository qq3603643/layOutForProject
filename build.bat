@echo off
node node_modules/requirejs/bin/r.js -o build/build.js
gulp
echo Press any key to exit!
echo. & pause