const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  copiesAvailable: Number,
  softCopyLink: String
});

module.exports = mongoose.model('Book', bookSchema);
