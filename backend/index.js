const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const User = require('./models/User');
const Book = require('./models/Book');
const Reservation = require('./models/Reservation');

const app = express();
const PORT = process.env.PORT || 5000;

// 🔧 Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/library_portal', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// 🔄 Function to clear expired reservations
const cleanExpiredReservations = async () => {
  const now = new Date();
  const expired = await Reservation.find({ validUntil: { $lt: now } });

  for (let res of expired) {
    const book = await Book.findById(res.bookId);
    if (book) {
      book.copiesAvailable += 1;
      await book.save();
    }

    const user = await User.findById(res.userId);
    if (user) {
      user.borrowedBooks = user.borrowedBooks.filter(b => b !== res.bookId);
      await user.save();
    }

    await Reservation.findByIdAndDelete(res._id);
    console.log(`Expired reservation cleared: ${res._id}`);
  }
};

// ✅ Root Route
app.get('/', (req, res) => {
  res.send('Library server is running!');
});

// ✅ Login route (USN + DOB)
app.post('/login', async (req, res) => {
  const { username: usn, password: dob } = req.body;

  console.log("Login attempt:", usn, dob);

  try {
    const user = await User.findOne({ usn, dob });

    if (!user) {
      console.log("❌ Invalid credentials");
      return res.status(401).json({ message: 'Invalid USN or DOB' });
    }

    console.log("✅ Login successful for:", user.usn);
    res.json({ message: 'Login successful', user });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ message: 'Login failed' });
  }
});

// ✅ Search route
app.get('/search', async (req, res) => {
  try {
    await cleanExpiredReservations();
    const books = await Book.find();
    res.json({ books });
  } catch (err) {
    console.error("❌ Error fetching books:", err);
    res.status(500).json({ message: 'Error fetching books' });
  }
});

// ✅ Reserve route
app.post('/reserve', async (req, res) => {
  const { userId, bookId } = req.body;

  console.log("📌 Reserve request received:");
  console.log("➡️  userId:", userId);
  console.log("➡️  bookId:", bookId);

  try {
    const book = await Book.findById(bookId);
    if (!book || book.copiesAvailable <= 0) {
      console.log("❌ Book not available");
      return res.status(400).json({ message: 'Book not available' });
    }

    const user = await User.findById(userId);
    if (!user) {
      console.log("❌ User not found");
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.borrowedBooks.length >= user.borrowLimit) {
      console.log("❌ Borrow limit reached");
      return res.status(400).json({ message: 'Borrow limit reached' });
    }

    const now = new Date();
    const validUntil = new Date(now.getTime() + 60 * 60 * 1000); // 1 hour

    const reservation = new Reservation({
      userId,
      bookId,
      reservedAt: now,
      validUntil
    });

    await reservation.save();

    book.copiesAvailable -= 1;
    await book.save();

    user.borrowedBooks.push(bookId);
    await user.save();

    console.log("✅ Book reserved successfully!");
    res.json({ message: 'Book reserved successfully', reservation });
  } catch (err) {
    console.error("❌ Reservation failed:", err);
    res.status(500).json({ message: 'Reservation failed' });
  }
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
