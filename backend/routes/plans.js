const express = require('express');
const router = express.Router();

// Simple in-memory exercise library
const EXERCISES = {
  strength: [
    'Squats',
    'Deadlifts',
    'Bench Press',
    'Overhead Press',
    'Rows',
  ],
  cardio: [
    'Running',
    'Cycling',
    'Rowing Machine',
    'Jump Rope',
    'Elliptical',
  ],
  hiit: [
    'Burpees',
    'Mountain Climbers',
    'Jump Squats',
    'High Knees',
    'Plank Jacks',
  ],
  flex: [
    'Hamstring Stretch',
    'Hip Flexor Stretch',
    'Cat-Cow',
    "Child's Pose",
    'Shoulder Mobility',
  ],
};

function generatePlan({ goal = 'balanced', daysPerWeek = 4, intensity = 'medium', duration = 45, types = [] }) {
  const allowedTypes = types.length ? types : ['strength', 'cardio'];
  const plan = [];

  for (let day = 1; day <= daysPerWeek; day++) {
    const type = allowedTypes[day % (allowedTypes.length || 1)];
    const pool = EXERCISES[type] || [];
    const perExerciseMinutes = pool.length ? Math.round(duration / pool.length) : Math.max(5, Math.round(duration / 3));
    const exercises = pool.slice(0, 3).map((name, idx) => ({
      name,
      sets: type === 'strength' ? 3 + (goal === 'strength' ? 1 : 0) : undefined,
      reps: type === 'strength' ? (intensity === 'high' ? 8 : 12) : undefined,
      minutes: type === 'cardio' || type === 'hiit' || type === 'flex' ? perExerciseMinutes : undefined,
      order: idx + 1,
    }));

    plan.push({
      day,
      type,
      goal,
      intensity,
      duration,
      exercises,
    });
  }

  return plan;
}

// POST /api/plans/generate
router.post('/generate', (req, res) => {
  try {
    const { goal, daysPerWeek, intensity, duration, types } = req.body || {};
    const plan = generatePlan({ goal, daysPerWeek, intensity, duration, types });
    res.json({ plan });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
