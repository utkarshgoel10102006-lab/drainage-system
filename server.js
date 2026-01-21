const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const hotspots = [
    {
        location: "Minto Bridge",
        ward: "NDMC-01",
        severity: "High",
        lat: 28.6396,
        lng: 77.2089
    },
    {
        location: "ITO Crossing",
        ward: "CD-02",
        severity: "Medium",
        lat: 28.6289,
        lng: 77.2410
    },
    {
        location: "Dwarka Sector 10",
        ward: "SW-05",
        severity: "Low",
        lat: 28.5795,
        lng: 77.0606
    }
];

app.get("/api/hotspots", (req, res) => {
    res.json({
        status: "success",
        count: hotspots.length,
        data: hotspots
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
