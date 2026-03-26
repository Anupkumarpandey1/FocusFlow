const mongoose = require('mongoose');

const focusSessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' }, // Optional, can do unbound focus
  duration: { type: Number, required: true }, // In minutes (e.g., 25)
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  status: { type: String, enum: ['COMPLETED', 'INTERRUPTED'], default: 'COMPLETED' }
}, { timestamps: true });

module.exports = mongoose.model('FocusSession', focusSessionSchema);
