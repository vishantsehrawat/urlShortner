const mongoose = require("mongoose");
const shortid = require("shortid");

const urlSchema = new mongoose.Schema(
  {
    longUrl: { type: String, required: true },
    shortUrl: {
      type: String,
      required: true,
      unique: true,
      default: shortid.generate(), // can use if we dont want ot generate it during the saving
    },
    visits: { type: Number, required: true, default: 0 },
    createdAt: { type: Date, default: Date.now },
    // expiry: { type: Date, default: Date.now, expires: 10 }, // 24 hours =  (86400 seconds) //^ we can also ask the user for specfic date of expiration
    expiry: { type: Date, default: Date.now() + 7* 24* 60 * 60 * 1000 }, // Expiry set to 1 hours from creation
    // expiry: { type: Date, default: Date.now, expires: "60s" }, // Set expiration to 10 seconds
    // expiry: { type: Date, default: Date.now, expires: "60s" },
  },
  { versionKey: false, timestamps: true }
);
// urlSchema.index({ expiry: 1 }, { expireAfterSeconds: 10 });
// urlSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 });

const UrlModel = mongoose.model("url", urlSchema);

module.exports = { UrlModel };
