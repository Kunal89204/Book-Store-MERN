const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://kunalkhandelwal108:db123@cluster0.shjtqzn.mongodb.net/Books-Store-MERN");

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