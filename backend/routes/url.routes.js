const express = require("express");
const urlRouter = express.Router();

const {
  shortenUrl,
  redirectToOriginalUrl,
  customShortenUrl,
} = require("../controllers/url.controller"); // Adjust the path based on your file structure

// ^URL shortening
urlRouter.post("/shorten", shortenUrl);

// ^getting the original URL using the shortened URL
urlRouter.get("/:shortenedPath", redirectToOriginalUrl);

// ^custom shortened URL
urlRouter.post("/customShorten", customShortenUrl);
module.exports = {
  urlRouter,
};
