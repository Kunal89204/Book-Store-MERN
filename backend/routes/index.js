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
    const books = await Book.findById(id);

    return res.status(200).json(books);
  } catch (error) {}
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
      console.log(error);
    }

    return res.json({ message: "Done" });
  } catch (error) {
    console.log(error);
  }
});

// post request for sending books data
router.post("/books", async (req, res) => {
  try {
    // Check if all required fields are provided
    if (
      !req.body.productName ||
      !req.body.productDescription ||
      !req.body.price ||
      !req.body.discountedPrice ||
      !req.body.productImage ||
      !req.body.variedImages ||
      !req.body.addToCart
    ) {
      return res.status(400).send("All fields are required");
    }

    // Create a new product object
    const newProduct = {
      productName: req.body.productName,
      productDescription: req.body.productDescription,
      price: req.body.price,
      discountedPrice: req.body.discountedPrice,
      productImage: req.body.productImage,
      variedImages: req.body.variedImages,
      addToCart: req.body.addToCart,
    };

    // Create the product in the database
    const product = await Product.create(newProduct);

    return res.status(201).send(product);
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
