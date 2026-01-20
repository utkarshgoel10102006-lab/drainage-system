// Initialize map centered on Delhi
const map = L.map("map").setView([28.6139, 77.2090], 11);

// Load OpenStreetMap tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors"
}).addTo(map);

// Sample water-logging hotspots
const hotspots = [
    { name: "Minto Bridge", lat: 28.6357, lng: 77.2233, severity: "High" },
    { name: "ITO Crossing", lat: 28.6289, lng: 77.2410, severity: "Medium" },
    { name: "Ring Road", lat: 28.7041, lng: 77.1025, severity: "High" }
];

// Add markers
hotspots.forEach(h => {
    L.marker([h.lat, h.lng])
        .addTo(map)
        .bindPopup(`<b>${h.name}</b><br>Severity: ${h.severity}`);
});
fetch("http://192.168.1.22/:5000/api/hotspots")
  .then(response => response.json())
  .then(data => {
      console.log("Received from backend:", data);
      data.forEach(item => {
          document.body.innerHTML +=
              `<p>${item.location} - ${item.severity}</p>`;
      });
  })
  .catch(err => console.error("Error:", err));

