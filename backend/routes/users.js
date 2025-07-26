const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/Books-Store-MERN");

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishYear: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("books-collection", bookSchema)