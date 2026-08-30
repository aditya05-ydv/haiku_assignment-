// server/index.js
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/submit", (req, res) => {
  const data = req.body;
  console.log("Received intake submission:");
  console.log(JSON.stringify(data, null, 2));

  res.json({ success: true, message: "Intake received", data });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});