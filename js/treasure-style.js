// A hand-tuned MapLibre style that gives the map an old treasure-map look.
// Map data comes from OpenFreeMap (free, no API key), which follows the
// OpenMapTiles schema: https://openmaptiles.org/schema/
//
// Only main roads (motorway, trunk, primary, secondary) are drawn so the
// map stays uncluttered.

const INK = "#3b2a1a";
const INK_FADED = "#6b5236";
const PARCHMENT = "#ecdcb4";
const WATER = "#a9bfae";
const MAIN_ROADS = ["motorway", "trunk", "primary", "secondary"];

const WATER_LABEL_LAYOUT = {
  "text-field": ["get", "name"],
  "text-font": ["Noto Sans Italic"],
  "text-size": 13,
  "text-letter-spacing": 0.2,
};
const WATER_LABEL_PAINT = { "text-color": "#4d6a5a", "text-halo-color": WATER, "text-halo-width": 1 };

const TREASURE_STYLE = {
  version: 8,
  glyphs: "https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf",
  sources: {
    openmaptiles: {
      type: "vector",
      url: "https://tiles.openfreemap.org/planet",
    },
  },
  layers: [
    {
      id: "background",
      type: "background",
      paint: { "background-color": PARCHMENT },
    },
    {
      id: "parks",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "park",
      paint: { "fill-color": "#c9c38f", "fill-opacity": 0.45 },
    },
    {
      id: "woods",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "landcover",
      filter: ["in", ["get", "class"], ["literal", ["wood", "wetland"]]],
      paint: { "fill-color": "#c4bd88", "fill-opacity": 0.35 },
    },
    {
      id: "water",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "water",
      paint: { "fill-color": WATER },
    },
    {
      // Inked shoreline.
      id: "water-outline",
      type: "line",
      source: "openmaptiles",
      "source-layer": "water",
      paint: { "line-color": INK_FADED, "line-width": 1, "line-opacity": 0.6 },
    },
    {
      id: "waterways",
      type: "line",
      source: "openmaptiles",
      "source-layer": "waterway",
      filter: ["in", ["get", "class"], ["literal", ["river", "canal"]]],
      paint: { "line-color": WATER, "line-width": 1.5 },
    },
    {
      // Soft shadow under main roads, like ink bleeding into paper.
      id: "roads-casing",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      filter: ["in", ["get", "class"], ["literal", MAIN_ROADS]],
      layout: { "line-cap": "round", "line-join": "round" },
      paint: {
        "line-color": "#c2a571",
        "line-width": ["interpolate", ["linear"], ["zoom"], 11, 3, 15, 9],
        "line-blur": 2,
      },
    },
    {
      id: "roads-secondary",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      filter: ["==", ["get", "class"], "secondary"],
      layout: { "line-cap": "round", "line-join": "round" },
      paint: {
        "line-color": INK_FADED,
        "line-width": ["interpolate", ["linear"], ["zoom"], 11, 0.8, 15, 2.5],
        "line-dasharray": [3, 1.5],
      },
    },
    {
      id: "roads-main",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      filter: ["in", ["get", "class"], ["literal", ["motorway", "trunk", "primary"]]],
      layout: { "line-cap": "round", "line-join": "round" },
      paint: {
        "line-color": INK,
        "line-width": ["interpolate", ["linear"], ["zoom"], 11, 1.2, 15, 4],
      },
    },
    {
      id: "road-labels",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "transportation_name",
      filter: ["in", ["get", "class"], ["literal", MAIN_ROADS]],
      layout: {
        "symbol-placement": "line",
        "text-field": ["coalesce", ["get", "name"], ["get", "ref"]],
        "text-font": ["Noto Sans Italic"],
        "text-size": ["interpolate", ["linear"], ["zoom"], 12, 10, 16, 13],
        "symbol-spacing": 400,
      },
      paint: {
        "text-color": INK,
        "text-halo-color": PARCHMENT,
        "text-halo-width": 1.5,
      },
    },
    {
      id: "water-labels",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "water_name",
      filter: ["!=", ["geometry-type"], "LineString"],
      layout: WATER_LABEL_LAYOUT,
      paint: WATER_LABEL_PAINT,
    },
    {
      id: "river-labels",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "water_name",
      filter: ["==", ["geometry-type"], "LineString"],
      layout: { ...WATER_LABEL_LAYOUT, "symbol-placement": "line" },
      paint: WATER_LABEL_PAINT,
    },
    {
      id: "town-labels",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "place",
      filter: ["in", ["get", "class"], ["literal", ["city", "town", "village"]]],
      layout: {
        "text-field": ["upcase", ["get", "name"]],
        "text-font": ["Noto Sans Bold"],
        "text-size": ["interpolate", ["linear"], ["zoom"], 11, 13, 15, 18],
        "text-letter-spacing": 0.25,
      },
      paint: {
        "text-color": INK,
        "text-opacity": 0.75,
        "text-halo-color": PARCHMENT,
        "text-halo-width": 2,
      },
    },
  ],
};
