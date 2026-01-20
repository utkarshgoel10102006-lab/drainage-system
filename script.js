// ---------------- CONFIG ----------------
const API_URL = "http://<BACKEND-IP>:5000/api/hotspots";

// ---------------- MAP INIT ----------------
const map = L.map("map").setView([28.6139, 77.2090], 11);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors"
}).addTo(map);

// ---------------- ICON COLORS ----------------
function getColor(severity) {
    if (severity === "High") return "red";
    if (severity === "Medium") return "orange";
    return "green";
}

// ---------------- LOAD HOTSPOTS ----------------
fetch(API_URL)
    .then(res => res.json())
    .then(result => {
        const hotspots = result.data;
        displayHotspots(hotspots);
        plotHotspotsOnMap(hotspots);
    })
    .catch(err => {
        document.getElementById("hotspotList").innerText =
            "Failed to load hotspot data";
        console.error(err);
    });

// ---------------- DISPLAY IN SIDEBAR ----------------
function displayHotspots(hotspots) {
    const list = document.getElementById("hotspotList");
    list.innerHTML = "";

    hotspots.forEach(h => {
        const div = document.createElement("div");
        div.className = `hotspot ${h.severity.toLowerCase()}`;
        div.innerHTML = `
            <strong>${h.name}</strong><br>
            Ward: ${h.ward}<br>
            Severity: ${h.severity}
        `;

        div.onclick = () => {
            map.setView([h.latitude, h.longitude], 15);
        };

        list.appendChild(div);
    });
}

// ---------------- PLOT ON MAP ----------------
function plotHotspotsOnMap(hotspots) {
    hotspots.forEach(h => {
        L.circleMarker([h.latitude, h.longitude], {
            radius: 8,
            color: getColor(h.severity),
            fillOpacity: 0.8
        })
        .addTo(map)
        .bindPopup(`
            <b>${h.name}</b><br>
            Ward: ${h.ward}<br>
            Severity: ${h.severity}
        `);
    });
}
