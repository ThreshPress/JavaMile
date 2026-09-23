# JavaMile prototype
Dependency-free HTML/CSS/ES modules. Serve `dist` with any static HTTP server. Branding is isolated in `data.js` and the HTML header/metadata; JavaMile is a working name.

## Working flows
For You ranks at most three drinks. Milk, caffeine, and budget are hard filters; temperature, sweetness, and strength are transparent ranking preferences. Budget excludes unknown prices. Explore searches the same filtered menu. Match My Usual uses a conservative, explainable style/ingredient parser, not AI or verified brand recipes. Device-local saved drinks, ratings and preferences persist in localStorage. Native dialogs support keyboard focus and Escape. Location is requested automatically on opening (unless the user explicitly selects sample mode). The browser controls permission. Granted coordinates and accuracy are retained only in memory for this visit; they are not persisted; rounded coordinates are sent to Overpass for nearby search. Denied, unavailable and timeout states include retry and sample fallback. Late callbacks cannot override a switch to sample mode. Live café directions use source-listed coordinates; demo directions remain disabled.

## Data integration
Replace `provider.list` in `dist/data.js` with a location-aware repository. Production records should include café IDs, coordinates/address, menu source URL, last-checked timestamp, normalized size/ingredients/caffeine, verified price/currency, availability provenance and photo rights. Keep missing values null. Bind live distance to the selected user location and verified coordinates. Add provider errors/loading, stale-data rules, genuine per-drink review records with abuse controls, authentication and synced saves if needed. Move scoring/parser into services as the app grows. Never use sample prices as verified data. Add real maps directions only after verifying the destination. Current photos are generated illustrations.

## Validation
JavaScript syntax and representative ranking/parser assertions checked. No detailed browser or mobile QA performed. WebMCP registration is feature-detected; supported browser validation unavailable in this environment.

## GitHub / local development
Run `npm run check` for syntax validation and `npm start` to serve locally at http://localhost:8080. There are no npm dependencies or API keys. Serve the `dist` folder over HTTPS in production. The `.openai/hosting.json` file identifies the existing Sites deployment; GitHub source hosting does not automatically change hosting or enable GitHub-to-Sites deployment. Live location permission should be checked on a real phone/browser.

## 0.3.0: nearby listings
Live mode now uses browser location and the public OpenStreetMap Overpass endpoint to discover cafés within 8 km (expandable to 25 km). Approximate coordinates rounded to three decimal places are sent to Overpass. Results are sorted by straight-line distance, cached in memory for five minutes, and never substituted with demo data. Coverage varies. Community-listed drink types may appear when explicitly tagged, but complete drink menus and personalized real-drink matches are NOT connected. Menu/website URLs and OSM provenance are shown. Production-scale service needs a supported places provider plus sourced item-level menu data. No API key is required for this limited public-service integration.
