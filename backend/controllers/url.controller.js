const { UrlModel } = require("../models/url.model"); // Adjust the path based on your file structure
const shortid = require("shortid");

// Controller method for URL shortening
const shortenUrl = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res
        .status(400)
        .json({ message: "URL is required", success: false });
    }

    const existingUrl = await UrlModel.findOne({ longUrl: url });

    if (existingUrl) {
      return res.status(200).json({
        message: "URL already shortened",
        shortenedUrl: `http://localhost:8080/${existingUrl.shortUrl}`,
        success: true,
      });
    }

    const shortenedUrl = shortid.generate();

    const newUrl = new UrlModel({ longUrl: url, shortUrl: shortenedUrl });
    await newUrl.save();

    return res.status(200).json({
      shortenedUrl: `http://localhost:8080/${shortenedUrl}`,
      success: true,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

// Controller method for URL redirection
const redirectToOriginalUrl = async (req, res) => {
  try {
    const { shortenedPath } = req.params;

    const url = await UrlModel.findOne({ shortUrl: shortenedPath });

    if (!url) {
      return res.status(404).json({
        message: "Shortened URL not found or expired",
        success: false,
      });
    }

    if (url.expiry && url.expiry < Date.now()) {
      return res.status(404).json({
        message: "Shortened URL has expired",
        success: false,
      });
    }

    return res.redirect(url.longUrl);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false, error: err });
  }
};

// Controller method for custom shortened URL
const customShortenUrl = async (req, res) => {
  try {
    const { url, customUrl } = req.body;
    if (!url) {
      return res
        .status(400)
        .json({ message: "URL is required", success: false });
    }

    let shortenedUrl;
    if (customUrl) {
      const existingUrl = await UrlModel.findOne({ shortUrl: customUrl });
      if (existingUrl) {
        return res
          .status(400)
          .json({ message: "Custom alias is already taken", success: false });
      }
      shortenedUrl = customUrl;
    }

    const newUrl = new UrlModel({ longUrl: url, shortUrl: shortenedUrl });
    await newUrl.save();

    return res.status(200).json({
      shortenedUrl: `http://localhost:8080/${shortenedUrl}`,
      success: true,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false, error: err });
  }
};

//retrieve all shortened URLs
const getAllShortenedUrls = async (req, res) => {
  try {
    const allUrls = await UrlModel.find({});
    // console.log("🚀 ~ file: url.controller.js:111 ~ getAllShortenedUrls ~ allUrls:", allUrls)
    return res
      .status(200)
      .json({ urls: allUrls, success: true, message: "Retrieved all URLs" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

module.exports = {
  shortenUrl,
  redirectToOriginalUrl,
  customShortenUrl,
  getAllShortenedUrls,
};
