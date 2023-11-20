const mongoose = require("mongoose");
const shortid = require("shortid");

const urlSchema = new mongoose.Schema({
  longUrl: { type: String, required: true },
  shortUrl: {
    type: String,
    required: true,
    unique: true,
    default: shortid.generate(), // can use if we dont want ot generate it during the saving
  },
  visits: { type: Number, required: true, default: 0 },
  createdAt: { type: Date, default: Date.now },
  expiry: { type: Date, default: Date.now, expires: 86400 }, // expires in 24 hours (86400 seconds) //^ we can also ask the user for specfic date of expiration
});
urlSchema.index({ expiry: 1 }, { expireAfterSeconds: 0 });

const UrlModel = mongoose.model("url", urlSchema);

module.exports = { UrlModel };
