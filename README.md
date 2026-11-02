# The Locals Map

A treasure-map style map of Jupiter, Tequesta and Palm Beach Gardens, Florida, showing local spots picked by people who live here. No clutter from every chain and random business, just the places locals actually go. The map shows only the main roads and is locked to the local area.

## What's on the map

| Spot | Category | Address |
| --- | --- | --- |
| Perk Coffee House | Coffee | 384 Tequesta Dr, Tequesta, FL 33469 |
| Golden Juicery | Coffee & Juice | 4050 S US Hwy 1, Jupiter, FL 33477 |

## How it works

It's a plain static site with no build step:

- `index.html`: the page layout
- `styles.css`: styling, including a mobile layout
- `js/spots.js`: **the list of spots** (edit this to add or change places)
- `js/treasure-style.js`: the treasure-map look (colors, which roads show, labels)
- `js/app.js`: draws the map with [MapLibre](https://maplibre.org/), places the ✕ markers, and locks the view to the local area (`AREA_BOUNDS`)

Map data comes from [OpenFreeMap](https://openfreemap.org/) (built on [OpenStreetMap](https://www.openstreetmap.org/)). It's free and needs no API key.

## Adding a spot

Open `js/spots.js` and add an entry:

```js
{
  name: "Spot Name",
  category: "Coffee",
  address: "123 Example St, Jupiter, FL 33458",
  coords: [26.9342, -80.0942], // [latitude, longitude]
  note: "Why locals love it.",
},
```

To get coordinates, right-click the spot in Google Maps. The latitude and longitude show at the top of the menu, and clicking them copies them.

## Changing the look

- **Colors:** edit the constants at the top of `js/treasure-style.js` (`PARCHMENT`, `INK`, `WATER`).
- **Which roads show:** edit `MAIN_ROADS` in the same file. Options are `motorway`, `trunk`, `primary`, `secondary`, `tertiary`, and `minor`.
- **Visible area:** edit `AREA_BOUNDS` in `js/app.js`.

## Running locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

Then visit http://localhost:8000.

## Deploying to Cloudflare

1. In the Cloudflare dashboard, go to **Workers & Pages → Create → Import a repository** and pick this GitHub repo.
2. Leave the build command empty. The deploy command is `npx wrangler deploy`, which reads `wrangler.jsonc` and serves the repo root as static files.
3. Deploy. Every push to `main` redeploys the site at `https://thelocalsmap.jlezcano.workers.dev`.

If you use a Cloudflare **Pages** project instead, set the framework preset to **None**, leave the build command empty, and set the build output directory to `/`.

## Deploying to Netlify

1. In Netlify, choose **Add new site → Import an existing project** and pick this GitHub repo.
2. Leave the build command empty. The publish directory is `.`, which `netlify.toml` already sets.
3. Deploy. Every push to `main` redeploys the site.
