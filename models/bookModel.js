// bookModel.js
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { versionKey: false }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
