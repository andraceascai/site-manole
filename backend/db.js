// const { MongoClient } = require('mongodb');
// const uri = `mongodb+srv://andraceascai:dlinkandra2012@mariusmanolesite.cmpc1sl.mongodb.net/?appName=MariusManoleSite`;
// const client = new MongoClient(uri)

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect().then(() => console.log('connected to db'))
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }

// module.exports = run;
const mongoose = require('mongoose');
 
// const uri = process.env.MONGODB_URI || 'mongodb+srv://andraceascai:dlinkandra2012@mariusmanolesite.cmpc1sl.mongodb.net/mariusdb?retryWrites=true&w=majority';
const uri = 'mongodb+srv://andraceascai:dlinkandra2012@mariusmanolesite.cmpc1sl.mongodb.net/mariusdb?retryWrites=true&w=majority';
const dbName = 'site'
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
