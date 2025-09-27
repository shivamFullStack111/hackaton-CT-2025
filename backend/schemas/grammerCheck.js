const mongoose = require('mongoose');

const SuggestionSchema = new mongoose.Schema({
  offset: Number,
  length: Number,
  message: String,
  replacements: [String]
}, { _id: false });

const GrammarCheckSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  originalText: { type: String, required: true },
  correctedText: { type: String },
  suggestions: [SuggestionSchema],
  language: { type: String, default: 'en' }
}, { timestamps: true });

module.exports = mongoose.model('GrammarCheck', GrammarCheckSchema);
