var express = require("express");
var router = express.Router();
const Book = require("./users");

// Route for GET all Books from the database
router.get("/books", async (req, res) => {
  try {
    const books = await Book.find({});
    res.json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error);
  }
});

// Route for getting one book from the database by id

router.get("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json(book);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route for updating the book

router.put("/book/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }

    const { id } = req.params;

    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.json({ message: "Book not found" });
    }

    return res.send({ message: "Book updated successfully" });
  } catch (error) {}
});

// Route for deleting a book

router.delete("/book/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.json({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// post request for sending books data
router.post("/books", async (req, res) => {
  try {
    // Check if all required fields are provided
    if (
      !req.body.title ||
      !req.body.author ||
      !req.body.publishYear
    ) {
      return res.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }

    // Create a new book object
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    // Create the book in the database
    const book = await Book.create(newBook);

    return res.status(201).send(book);
  } catch (error) {
    console.error("Error creating book:", error);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
