// Import necessary dependencies
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Initialize express app
const app = express();

// Import other modules
const validatePayload = require("./middleware/apiMiddleware");
const apiRoutes = require("./routes/apiRoutes");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(validatePayload);

// Connect to MongoDB
mongoose.connect(
  process.env.DB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB");
  }
);

// Routes
app.use(apiRoutes);

// Set server to listen for a specific port
const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Server is running at ${PORT}`);
});
