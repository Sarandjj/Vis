const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema({
  authorName: {
    type: String,
    required: true,
  },
  quote: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: () => new Date().toISOString().split("T")[0],
  },
});

const Quote = mongoose.model("Quote", quoteSchema);

module.exports = Quote;
