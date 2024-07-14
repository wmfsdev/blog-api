const mongoose = require('mongoose');

const { Schema } = mongoose;

const ArticleSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  publish: { type: Boolean, default: false },
  category: { type: String },
  timestamp: { type: Date },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
});

module.exports = mongoose.model('Article', ArticleSchema);
