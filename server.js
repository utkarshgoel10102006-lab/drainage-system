const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());              // VERY IMPORTANT
app.use(express.json());

const hotspots = [
  { id: 1, location: "Minto Bridge", severity: "High" },
  { id: 2, location: "ITO Crossing", severity: "Medium" }
];

app.get("/api/hotspots", (req, res) => {
  res.json(hotspots);
});

app.listen(5000, "0.0.0.0", () => {
  console.log("Backend running on port 5000");
});
