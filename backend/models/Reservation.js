const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  userId: String,
  bookId: String,
  reservedAt: {
    type: Date,
    default: Date.now
  },
  validUntil: Date
});

module.exports = mongoose.model('Reservation', reservationSchema);
