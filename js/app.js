// The area the map is locked to: Tequesta in the north, Jupiter in the
// middle, Palm Beach Gardens in the south. [west, south], [east, north].
const AREA_BOUNDS = [
  [-80.2, 26.78],
  [-80.03, 27.0],
];

const map = new maplibregl.Map({
  container: "map",
  style: TREASURE_STYLE,
  bounds: AREA_BOUNDS,
  maxBounds: AREA_BOUNDS,
  minZoom: 11,
  maxZoom: 17,
  dragRotate: false,
  pitchWithRotate: false,
  attributionControl: {
    customAttribution: '<a href="https://openfreemap.org" target="_blank" rel="noopener">OpenFreeMap</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors',
  },
});

map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-left");
map.touchZoomRotate.disableRotation();

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function popupHtml(spot) {
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(spot.address)}`;
  return `
    <div class="popup">
      <span class="category">${escapeHtml(spot.category)}</span>
      <h3>${escapeHtml(spot.name)}</h3>
      <p>${escapeHtml(spot.address)}</p>
      ${spot.note ? `<p>${escapeHtml(spot.note)}</p>` : ""}
      <p><a href="${directions}" target="_blank" rel="noopener">Directions</a></p>
    </div>`;
}

const list = document.getElementById("spot-list");

SPOTS.forEach((spot) => {
  // spots.js uses [latitude, longitude]; MapLibre wants [longitude, latitude].
  const lngLat = [spot.coords[1], spot.coords[0]];

  const el = document.createElement("button");
  el.type = "button";
  el.className = "x-marker";
  el.textContent = "✕";
  el.setAttribute("aria-label", spot.name);

  const popup = new maplibregl.Popup({ offset: 18, maxWidth: "260px" }).setHTML(popupHtml(spot));
  const marker = new maplibregl.Marker({ element: el }).setLngLat(lngLat).setPopup(popup).addTo(map);

  const item = document.createElement("li");
  const button = document.createElement("button");
  button.type = "button";
  button.innerHTML = `
    <span class="spot-name">${escapeHtml(spot.name)}</span>
    <span class="spot-meta">${escapeHtml(spot.category)} · ${escapeHtml(spot.address)}</span>`;
  button.addEventListener("click", () => {
    map.flyTo({ center: lngLat, zoom: 15 });
    if (!popup.isOpen()) marker.togglePopup();
  });
  item.appendChild(button);
  list.appendChild(item);
});
