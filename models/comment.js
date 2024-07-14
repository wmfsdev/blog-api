const mongoose = require('mongoose');

const { Schema } = mongoose;

const CommentsSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  body: { type: String, required: true },
  timestamp: { type: Date },
});

module.exports = mongoose.model('Comment', CommentsSchema);
