# The Locals Map

A simple map of Jupiter, Florida showing local spots picked by people who live here. No clutter from every chain and random business, just the places locals actually go.

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
- `js/app.js`: draws the map with [Leaflet](https://leafletjs.com/) and [OpenStreetMap](https://www.openstreetmap.org/) tiles. No API key needed.

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

## Running locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

Then visit http://localhost:8000.

## Deploying to Netlify

1. In Netlify, choose **Add new site → Import an existing project** and pick this GitHub repo.
2. Leave the build command empty. The publish directory is `.`, which `netlify.toml` already sets.
3. Deploy. Every push to `main` redeploys the site.
