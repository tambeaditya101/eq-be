// authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authenticateToken = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const decoded = jwt.verify(token, "poo");
    req.user = await User.findById(decoded.userId);
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = authenticateToken;
