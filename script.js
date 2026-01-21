// ---------------- MAP ----------------
const map = L.map("map").setView([28.6139, 77.2090], 11);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap"
}).addTo(map);

// ---------------- LIVE WEATHER ----------------
// Get free API key from https://openweathermap.org/api
const API_KEY = "f4b2cf3c91a86b42b122be71612b20a7";
const CITY = "Delhi";

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`)
    .then(res => res.json())
    .then(data => {
        const rain = data.rain ? data.rain["1h"] || 0 : 0;
        const temp = data.main.temp;

        document.getElementById("weather").innerHTML =
            `🌡️ ${temp}°C | 🌧️ Rain (1h): ${rain} mm`;
    })
    .catch(() => {
        document.getElementById("weather").innerHTML =
            "Weather data unavailable";
    });

// ---------------- WARD BOUNDARIES ----------------
function wardStyle(feature) {
    let risk = feature.properties.risk;
    let color = "green";

    if (risk === "High") color = "red";
    else if (risk === "Medium") color = "orange";

    return {
        color: color,
        weight: 1,
        fillOpacity: 0.35
    };
}

fetch("wards.geojson")
    .then(res => res.json())
    .then(data => {
        L.geoJSON(data, {
            style: wardStyle,
            onEachFeature: (feature, layer) => {
                layer.bindPopup(
                    `<b>Ward:</b> ${feature.properties.name}<br>
                     <b>Risk:</b> ${feature.properties.risk}`
                );
            }
        }).addTo(map);
    });
