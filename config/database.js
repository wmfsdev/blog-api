const mongoose = require('mongoose');

require('dotenv').config();

mongoose.set('strictQuery', false);

const mongoDB = process.env.MONGODB_URI;

async function connection() {
  await mongoose.connect(mongoDB);
}

connection().catch((err) => console.log(err));

module.exports = connection;
