const JUPITER_CENTER = [26.934, -80.094];

const map = L.map("map").setView(JUPITER_CENTER, 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

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
const markers = [];

SPOTS.forEach((spot) => {
  const marker = L.marker(spot.coords).addTo(map).bindPopup(popupHtml(spot));
  markers.push(marker);

  const item = document.createElement("li");
  const button = document.createElement("button");
  button.type = "button";
  button.innerHTML = `
    <span class="spot-name">${escapeHtml(spot.name)}</span>
    <span class="spot-meta">${escapeHtml(spot.category)} · ${escapeHtml(spot.address)}</span>`;
  button.addEventListener("click", () => {
    map.setView(spot.coords, 16);
    marker.openPopup();
  });
  item.appendChild(button);
  list.appendChild(item);
});

if (markers.length > 0) {
  map.fitBounds(L.featureGroup(markers).getBounds(), { padding: [60, 60], maxZoom: 14 });
}
