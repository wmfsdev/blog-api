const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  articles: [{ type: Schema.Types.ObjectId, ref: 'Article' }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  status: { type: String, enum: ['admin', 'user'], default: 'user' },
});

module.exports = mongoose.model('User', UserSchema);
