// userModel.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    roles: [
      { type: String, enum: ["CREATOR", "VIEWER", "VIEW_ALL"], required: true },
    ],
  },
  { versionKey: false }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
