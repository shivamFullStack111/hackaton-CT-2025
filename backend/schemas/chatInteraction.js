const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  role: { type: String, enum: ['user', 'ai', 'system'], default: 'user' },
  text: { type: String, required: true }
}, { _id: false });

const ChatInteractionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sessionId: { type: String },
  messages: [MessageSchema],
  summary: { type: String },
  metadata: { type: Object }
}, { timestamps: true });

module.exports = mongoose.model('ChatInteraction', ChatInteractionSchema);
