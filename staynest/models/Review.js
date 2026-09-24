const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  pgId: { type: String, required: true },
  authorName: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  collegeName: { type: String, default: 'Student' }
}, { timestamps: true });

module.exports = mongoose.model('Review', ReviewSchema);
