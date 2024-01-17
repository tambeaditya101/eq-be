// routes/books.js
const express = require("express");
const booksRouter = express.Router();
const authenticateToken = require("../middlewares/authMiddleware");
const Book = require("../models/bookModel");
const User = require("../models/userModel");

// Create Book API
booksRouter.post("/", authenticateToken, async (req, res) => {
  try {
    const userRoles = req.user.roles;
    if (userRoles.includes("CREATOR")) {
      const { title, author } = req.body;
      const createdBy = req.user._id;
      const newBook = new Book({ title, author, createdBy });
      await newBook.save();
      res
        .status(201)
        .json({ message: "Book created successfully", book: newBook });
    } else {
      res.status(400).json({
        message: "This Action is prohibited for your role",
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// View Books API
booksRouter.get("/", authenticateToken, async (req, res) => {
  try {
    const userRoles = req.user.roles;
    let books;
    if (userRoles.includes("VIEW_ALL")) {
      books = await Book.find().populate("createdBy", "username");
    } else {
      books = await Book.find({ createdBy: req.user._id });
    }

    res.json({ books });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Book API
booksRouter.delete("/delete/:id", authenticateToken, async (req, res) => {
  try {
    const bookId = req.params.id;
    const userRoles = req.user.roles;

    if (!userRoles.includes("CREATOR")) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete the book" });
    }
    const bookToDelete = await Book.findById(bookId);
    if (!bookToDelete) {
      return res.status(404).json({ message: "Book not found" });
    }
    await bookToDelete.remove();
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Show Books Created 10 Minutes Ago and More API
booksRouter.get("/old", authenticateToken, async (req, res) => {
  try {
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    const oldBooks = await Book.find({ createdAt: { $lte: tenMinutesAgo } });
    res.json({ oldBooks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Show Books Created Less Than 10 Minutes Ago API
booksRouter.get("/new", authenticateToken, async (req, res) => {
  try {
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    const newBooks = await Book.find({ createdAt: { $gt: tenMinutesAgo } });
    res.json({ newBooks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = booksRouter;
