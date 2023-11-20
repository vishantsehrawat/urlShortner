const express = require("express");
const userRouter = express.Router();
const { authMiddleware } = require("../middlewares/authMiddleware");

const {
  registerUser,
  userLogin,
  updateUserDetails,
  userLogout,
} = require("../controllers/user.controller");

require("dotenv").config();

userRouter.post("/login", userLogin);

userRouter.post("/logout", authMiddleware, userLogout);

userRouter.post("/register", registerUser);

userRouter.patch("/update/:id", authMiddleware, updateUserDetails);

module.exports = {
  userRouter,
};
