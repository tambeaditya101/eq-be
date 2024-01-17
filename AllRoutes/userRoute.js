// routes/users.js
const express = require("express");
const userRouter = express.Router();
const User = require("../models/userModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

// User Registration
userRouter.post("/register", async (req, res) => {
  try {
    const { username, password, roles } = req.body;
    const user = new User({ username, password, roles });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// User Login

userRouter.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (!user)
      return res.status(401).json({ message: "Invalid username or password" });

    const token = jwt.sign({ userId: user._id }, "poo");
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = userRouter;
