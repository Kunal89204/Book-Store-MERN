const mongoose = require("mongoose");
let url = 'mongodb+srv://root:Kunal892004@cluster0.nvano9w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(url);

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