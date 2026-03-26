const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  color: { type: String, default: '#3B82F6' } // For UI customization
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
