const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  usn: { type: String, required: true, unique: true },
  dob: { type: String, required: true }, // 'YYYY-MM-DD'
  borrowedBooks: [String],
  borrowLimit: {
    type: Number,
    default: 3
  }
});

module.exports = mongoose.model('User', userSchema);
