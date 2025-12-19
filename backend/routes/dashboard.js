const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout');

// GET dashboard summary for current user
router.get('/', async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) return res.status(401).json({ error: 'Not logged in' });

    const workouts = await Workout.find({ user: userId });
    const totalWorkouts = workouts.length;
    const totalDuration = workouts.reduce((s, w) => s + (w.duration || 0), 0);
    const byType = workouts.reduce((acc, w) => {
      acc[w.type] = (acc[w.type] || 0) + 1;
      return acc;
    }, {});

    res.json({ totalWorkouts, totalDuration, byType, recent: workouts.slice(-10) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
