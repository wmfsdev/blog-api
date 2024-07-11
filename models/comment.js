const mongoose = require('mongoose');

const { Schema } = mongoose;

const CommentsSchema = new Schema({
  username: { type: String, required: true },
  body: { type: String, required: true },
  timestamp: { type: Date },
});

module.exports = mongoose.model('Posts', CommentsSchema);
