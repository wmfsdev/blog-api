const mongoose = require('mongoose');

const { Schema } = mongoose;

const CommentsSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  body: { type: String, required: true },
  timestamp: { type: Date },
  canDelete: { type: Boolean, default: false },
});

// CommentsSchema.virtual("getUsername").get(() => {
//   return
// })

module.exports = mongoose.model('Comment', CommentsSchema);
