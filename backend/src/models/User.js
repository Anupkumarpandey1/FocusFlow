const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Hashed
  stats: {
    totalFocusMinutes: { type: Number, default: 0 },
    completedTasksCount: { type: Number, default: 0 },
    currentStreak: { type: Number, default: 0 },
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
