const mongoose = require('mongoose');

const uri = "mongodb+srv://tonysameh123_db_user:3seUHCE5RbayLMkQ@cluster0.4q2ysug.mongodb.net/foodhub?retryWrites=true&w=majority";

console.log('Trying to connect...');

mongoose.connect(uri)
  .then(() => {
    console.log('✅ SUCCESS! Connected to MongoDB Atlas!');
    process.exit(0);
  })
  .catch((err) => {
    console.log('❌ FAILED:', err.message);
    console.log('\nFull error:', err);
    process.exit(1);
  });