const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  lectureTitle: { type: String },
  rawTranscript: { type: String, required: true },
  cleanedTranscript: { type: String },
  language: { type: String, default: 'en' },
  tags: [String],
  sharedWith: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  visibility: { type: String, enum: ['private', 'public', 'class'], default: 'private' }
}, { timestamps: true });

module.exports = mongoose.model('Note', NoteSchema);
