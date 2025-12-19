const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout');

// POST /api/workouts - create a workout (requires login)
router.post('/', async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) return res.status(401).json({ error: 'Not logged in' });
    const data = { ...req.body, user: userId };
    const workout = await Workout.create(data);
    res.status(201).json(workout);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/workouts - list workouts with optional filters (requires login)
router.get('/', async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) return res.status(401).json({ error: 'Not logged in' });
    const { type, intensity, minDuration, maxDuration } = req.query;

    const query = { user: userId };
    if (type) query.type = type;
    if (intensity) query.intensity = intensity;
    if (minDuration || maxDuration) {
      query.duration = {};
      if (minDuration) query.duration.$gte = Number(minDuration);
      if (maxDuration) query.duration.$lte = Number(maxDuration);
    }

    const workouts = await Workout.find(query).sort({ date: -1 });
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
