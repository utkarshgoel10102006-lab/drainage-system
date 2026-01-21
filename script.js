alert("Site can be harmful")
const API_URL = "http://localhost:5000/api/hotspots";

// Initialize Map
const map = L.map("map").setView([28.6139, 77.2090], 11);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap"
}).addTo(map);

// Fetch Hotspots
fetch(API_URL)
    .then(res => res.json())
    .then(data => {
        renderHotspots(data.data);
        plotOnMap(data.data);
    })
    .catch(err => {
        document.getElementById("hotspotList").innerText =
            "Error loading data";
        console.error(err);
    });

// Sidebar Rendering
function renderHotspots(hotspots) {
    const list = document.getElementById("hotspotList");
    list.innerHTML = "";

    hotspots.forEach(h => {
        const div = document.createElement("div");
        div.className = `hotspot ${h.severity.toLowerCase()}`;
        div.innerHTML = `
            <strong>${h.location}</strong><br>
            Ward: ${h.ward}<br>
            Severity: ${h.severity}
        `;

        div.onclick = () => {
            map.setView([h.lat, h.lng], 15);
        };

        list.appendChild(div);
    });
}

// Map Plotting
function plotOnMap(hotspots) {
    hotspots.forEach(h => {
        L.circleMarker([h.lat, h.lng], {
            radius: 8,
            color: getColor(h.severity),
            fillOpacity: 0.8
        })
        .addTo(map)
        .bindPopup(`
            <b>${h.location}</b><br>
            Ward: ${h.ward}<br>
            Severity: ${h.severity}
        `);
    });
}

function getColor(sev) {
    if (sev === "High") return "red";
    if (sev === "Medium") return "orange";
    return "green";
}
