# JavaMile — GitHub Pages upload

1. Extract this ZIP on your computer.
2. In your GitHub repository, choose Add file → Upload files. Upload the extracted `index.html`, `app.js`, `data.js`, `location.js`, `style.css`, `assets` folder, and `.nojekyll` into the top level of `main`. Commit. Do not upload the ZIP itself.
3. In Settings → Pages, set Source: Deploy from a branch; Branch: main; Folder: /(root). Save.
4. Open Actions to check the Pages deployment. When successful, Settings → Pages shows Visit site.

The old `dist` folder can remain in the repository; Pages will use the new top-level `index.html`. This is a sample-data prototype. Browser location permission works on HTTPS, but café search and live menus are not connected.
