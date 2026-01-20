const express = require("express");
const cors = require("cors");

const hotspotRoutes = require("./routes/hotspots");

const app = express();

// Middleware
app.use(cors());                 // Allow frontend on other devices
app.use(express.json());         // Parse JSON body

// Routes
app.use("/api/hotspots", hotspotRoutes);

// Health check
app.get("/", (req, res) => {
    res.send("✅ Water-Logging Hotspot API is running");
});

// Server
const PORT = 5000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Backend running on port ${PORT}`);
});
