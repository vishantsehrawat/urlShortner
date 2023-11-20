const express = require("express");
const urlRouter = express.Router();

const {
  shortenUrl,
  redirectToOriginalUrl,
  customShortenUrl,
  getAllShortenedUrls,
} = require("../controllers/url.controller"); // Adjust the path based on your file structure

// ^URL shortening
urlRouter.post("/shorten", shortenUrl);

// ^custom shortened URL
urlRouter.post("/customShorten", customShortenUrl);

// ^get all shortened URL
urlRouter.get("/getall", getAllShortenedUrls);

// ^getting the original URL using the shortened URL
urlRouter.get("/:shortenedPath", redirectToOriginalUrl);
module.exports = {
  urlRouter,
};
