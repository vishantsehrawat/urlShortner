const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");
const { BlacklistModel } = require("../models/blacklist.model");

const registerUser = async (req, res) => {
  const userData = req.body;
  // console.log(
  // "🚀 ~ file: user.controller.js:10 ~ registerUser ~ userData:",
  // userData
  // );

  try {
    req.body.userUid = uuidv4();
    let alreadyPresent = await UserModel.findOne({ email: userData.email });
    if (alreadyPresent) {
      return res.status(400).json({
        message: "User is already present. Please use a different email.",
        success: false,
      });
    } else {
      const hash = bcrypt.hashSync(userData.password, 4);
      userData.password = hash;
      const user = new UserModel(userData);
      await user.save();
      return res.status(200).json({ message: "New user added", success: true });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Cannot add new user",
      success: false,
      error: error.message,
    });
  }
};

const userLogin = async (req, res) => {
  const user = req.body;
  // console.log("🚀 ~ file: user.controller.js:42 ~ userLogin ~ user:", user);

  try {
    const myUser = await UserModel.findOne({ email: user.email });
    if (myUser) {
      bcrypt.compare(user.password, myUser.password, function (err, result) {
        if (err || !result) {
          return res.status(400).json({
            message: "Invalid credentials",
            success: false,
          });
        }

        var token = jwt.sign({ userId: myUser._id }, process.env.TOKEN_SECRET, {
          expiresIn: "7d",
        });
        var refreshToken = jwt.sign(
          { userId: myUser._id },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: "24d" }
        );
        return res.status(200).json({
          message: "User logged in",
          token,
          refreshToken,
          userId: myUser._id,
          success: true,
        });
      });
    } else {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error.message || "Error logging in",
      success: false,
    });
  }
};

const userLogout = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  // console.log("🚀 ~ file: user.controller.js:87 ~ userLogout ~ token:", token);
  try {
    const blacklist = new BlacklistModel({ token });
    await blacklist.save();
    return res.status(200).json({ message: "Logged out", success: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Cannot logout", success: false });
  }
};

const updateUserDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserModel.findByIdAndUpdate(id, req.body);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "User details updated successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

module.exports = {
  registerUser,
  userLogin,
  userLogout,
  updateUserDetails,
};
