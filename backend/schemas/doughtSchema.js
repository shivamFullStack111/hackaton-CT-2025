const mongoose = require('mongoose');

const DoubtSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: [String],
  attachments: [{ url: String, type: String }],
  upvotes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  status: { type: String, enum: ['open', 'resolved', 'closed'], default: 'open' }
}, { timestamps: true });

DoubtSchema.index({ title: 'text', description: 'text', tags: 1 });

module.exports = mongoose.model('Doubt', DoubtSchema);
