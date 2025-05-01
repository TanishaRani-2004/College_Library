const mongoose = require('mongoose');
const Book = require('./models/Book');

mongoose.connect('mongodb://localhost:27017/library_portal', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB. Seeding books...');
  return Book.insertMany([
    {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      copiesAvailable: 2,
      softCopyLink: ''
    },
    {
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      copiesAvailable: 1,
      softCopyLink: ''
    },
    {
      title: '1984',
      author: 'George Orwell',
      copiesAvailable: 0,
      softCopyLink: 'http://example.com/1984.pdf'
    },
    {
      title: 'Introduction to Java',
      author: 'Sahani',
      copiesAvailable: 12,
      softCopyLink: 'http://example.com/sahani.pdf'
    },
    {
      title: 'Advanced Java',
      author: 'Trupthi',
      copiesAvailable: 3,
      softCopyLink: 'http://example.com/trupthi.pdf'
    }
  ]);
}).then(() => {
  console.log('Books added!');
  mongoose.connection.close();
}).catch(err => {
  console.error('Error seeding data:', err);
});
