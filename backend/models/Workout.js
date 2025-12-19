const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  type: { type: String, enum: ['strength', 'cardio', 'mixed'], default: 'mixed' },
  duration: { type: Number, default: 30 }, // minutes
  intensity: { type: String, enum: ['low','medium','high'], default: 'medium' },
  notes: { type: String },
  exercises: { type: Array, default: [] }
}, { timestamps: true });

module.exports = mongoose.model('Workout', WorkoutSchema);
