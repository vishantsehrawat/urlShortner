const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["User", "Admin"], default: "User" },
  urlPreferences: {
    allowCustomAlias: {
      type: Boolean,
      default: true,
    },
    expireAfter: {
      type: Number,
      default: 0,
    },
  },
});

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };
