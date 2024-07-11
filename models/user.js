const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  posts: [{ type: String }],
  comments: [{ type: String }],
  status: { type: String, enum: ['admin', 'user'] },
});

module.exports = mongoose.model('Users', UserSchema);
