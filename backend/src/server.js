const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Backend Running");
});

app.get("/api/message", (req, res) => {
  res.json({
    message: "Hello from backend",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});