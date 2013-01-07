#!/bin/sh
rm -rf ../js_author/main_built.js
node r.js -o build.js
cat license.frag > ../js_author/main_built.js
cat main_built.js >> ../js_author/main_built.js
exit 0
