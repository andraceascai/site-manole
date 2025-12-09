const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI
const dbName = process.env.DB_NAME
async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }
  try {
    await mongoose.connect(uri, {dbName});
    console.log('Mongoose connected');
    return mongoose.connection;
  } catch (err) {
    console.error('Mongoose connection error:', err);
    throw err;
  }
}
 
module.exports = connectDB;
