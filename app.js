// Import necessary dependencies
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cryptoRandomString = require("crypto-random-string");

// Initialize express app
const app = express();

// Import other modules
const URL = require("./models/url");
const validatePayload = require("./middleware/apiMiddleware");

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

// Template for response
let response = {
  message: "",
  status: "",
  data: {},
};

// Routes
app.post("/", async (req, res) => {
  // URL Regex
  const urlRegex = /https?:\/\/(www.)?[-a-zA-Z0-9@:%._+~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&\/\/=]*)/;
  let url;

  // Checks if the url exists and matches the regex
  if (req.body.url && urlRegex.test(req.body.url)) {
    // checks if the url is in the db
    const checkUrl = await URL.findOne({ url: req.body.url });
    if (checkUrl) {
      const visitors = checkUrl.no_of_visitors + 1;
      // adds to the visitor numbers every time user reaches the route
      url = await URL.findOneAndUpdate(
        { _id: checkUrl._id },
        { no_of_visitors: visitors }
      );
    } else {
      const short_url = cryptoRandomString({ length: 5, type: "base64" });
      // creates a new url document if it doesn't exist
      url = await URL.create({
        url: req.body.url,
        short_url,
        no_of_visitors: 0,
      });
    }

    // Send this response for valid url
    response = {
      message: "Valid URL",
      status: "success",
      data: {
        url: url.url,
        short_url: req.headers.host + "/" + url.short_url,
        date_created: url.date_created,
        no_of_visitors: url.no_of_visitors,
      },
    };
    res.status(200);
  } else {
    // Response for invalid url
    response = {
      message:
        "Invalid URL: 'url must start with the protocol, the domain name must end with an extension' ",
      status: "error",
      data: null,
    };
    res.status(400);
  }
  res.json(response);
});

app.get("/:route", async (req, res) => {
  const url = await URL.findOne({ short_url: req.params.route });
  if (url) {
    //   Redirects to the url in the database
    res.redirect(`${url.url}`);
  } else {
    //   Response if the route does not exist
    res.status(404).json({
      message: "Route does not exist",
      status: "error",
      data: null,
    });
  }
});

// Set server to listen for a specific port
const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Server is running at ${PORT}`);
});
