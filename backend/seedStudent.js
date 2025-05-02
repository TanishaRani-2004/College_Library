const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect('mongodb+srv://tanisha:tanisharani@librarycluster.mdrindt.mongodb.net/?retryWrites=true&w=majority&appName=LibraryCluster', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log('Connected to MongoDB');

  const students = [
    { usn: '1BG22CS168', dob: '2004-06-29' },
    { usn: '1BG22CS171', dob: '2004-08-22' },
    { usn: '1BG22CS130', dob: '2004-01-25' },   
    { usn: '1BG22CS176', dob: '2004-01-28' },
    { usn: '1BG22CS174', dob: '2004-07-15' },
    { usn: '1BG22CS139', dob: '2004-02-18' },
  ];

  await User.insertMany(students);
  console.log('Sample students added!');
  mongoose.connection.close();
}).catch(err => {
  console.error('Error:', err);
});
