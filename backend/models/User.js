const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  passwordHash: { type: String, default: '' },
  age: { type: String, default: '' },
  gender: { type: String, default: '' },
  weight: { type: String, default: '' },
  height: { type: String, default: '' },
  experience: { type: String, default: '' },
  fitnessGoal: { type: String, default: '' },
  goals: { type: [String], default: [] },
  preferences: { type: Object, default: {} }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
