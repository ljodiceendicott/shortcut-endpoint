const express = require("express");
const app = express();

// Define the port your app will listen on
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Simple route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
