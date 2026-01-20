const express = require("express");
const router = express.Router();

let hotspots = require("../data/hotspots");

// ---------------- GET all hotspots ----------------
router.get("/", (req, res) => {
    res.json({
        success: true,
        count: hotspots.length,
        data: hotspots
    });
});

// ---------------- ADD new hotspot ----------------
router.post("/", (req, res) => {
    const { name, latitude, longitude, ward, severity } = req.body;

    // Validation
    if (!name || !latitude || !longitude || !ward || !severity) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    const newHotspot = {
        id: hotspots.length + 1,
        name,
        latitude,
        longitude,
        ward,
        severity
    };

    hotspots.push(newHotspot);

    res.status(201).json({
        success: true,
        message: "Hotspot added successfully",
        data: newHotspot
    });
});

// ---------------- GET hotspot by ID ----------------
router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const hotspot = hotspots.find(h => h.id === id);

    if (!hotspot) {
        return res.status(404).json({
            success: false,
            message: "Hotspot not found"
        });
    }

    res.json({
        success: true,
        data: hotspot
    });
});

// ---------------- UPDATE severity ----------------
router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { severity } = req.body;

    const hotspot = hotspots.find(h => h.id === id);

    if (!hotspot) {
        return res.status(404).json({
            success: false,
            message: "Hotspot not found"
        });
    }

    hotspot.severity = severity;

    res.json({
        success: true,
        message: "Severity updated",
        data: hotspot
    });
});

// ---------------- DELETE hotspot ----------------
router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    hotspots = hotspots.filter(h => h.id !== id);

    res.json({
        success: true,
        message: "Hotspot deleted"
    });
});

module.exports = router;
