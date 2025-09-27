const mongoose = require('mongoose');

const ElementSchema = new mongoose.Schema({
  type: { type: String },
  data: { type: mongoose.Schema.Types.Mixed },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
}, { _id: false });

const WhiteboardSessionSchema = new mongoose.Schema({
  title: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  elements: [ElementSchema],
  isPublic: { type: Boolean, default: false },
  metadata: { type: Object }
}, { timestamps: true });

module.exports = mongoose.model('WhiteboardSession', WhiteboardSessionSchema);
