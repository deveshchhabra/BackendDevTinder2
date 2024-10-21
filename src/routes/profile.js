const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const {validateEditProfileData} =require("../utils/validation")
const User = require("../models/user");
const bcrypt = require('bcrypt');



profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req?.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR :+ " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }
    const loggedInUser = req.user;
    // console.log(loggedInUser)
    await loggedInUser.save();
    Object.keys(req.body).forEach((key)=>(loggedInUser[key]=req.body[key]));
    // console.log(loggedInUser)
    await loggedInUser.save();
    res.json({
      message:`${loggedInUser.firstName},your profile is updated`,
      data:loggedInUser
    })
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});
profileRouter.patch("/profile/forgetPassword", async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("user not found");
    }
    const isPasswordSame = await bcrypt.compare(newPassword, user.password);
    if (isPasswordSame) {
      throw new Error("New password is similar to the existing one!");
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.json({ message: "password updated successfully!", data: user });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = profileRouter;