const mongoose = require('mongoose');

const EditorHistorySchema = new mongoose.Schema({
  version: Number,
  code: String,
  editedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
}, { _id: false });

const CodeEditorSessionSchema = new mongoose.Schema({
  title: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  language: { type: String, default: 'javascript' },
  codeContent: { type: String, default: '' },
  cursorPositions: { type: mongoose.Schema.Types.Mixed },
  history: [EditorHistorySchema],
  isPublic: { type: Boolean, default: false },
  runOutput: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('CodeEditorSession', CodeEditorSessionSchema);
