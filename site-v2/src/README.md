# 3D scenes

`scenes.js` is the source of the two three.js scenes on the page (the turning
gyros spit in the hero and the pita being rolled as you scroll). The page
inlines a minified bundle of it so it works as a single file.

Rebuild after editing:

    npm install three@0.170.0 esbuild@0.24.0
    npx esbuild scenes.js --bundle --minify --format=iife --target=es2019 --legal-comments=none --outfile=scenes.min.js

then replace the `<script>(()=>{...` block in `../index.html` with the new bundle.
