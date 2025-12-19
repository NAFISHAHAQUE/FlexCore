const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();

const profileRoutes = require('./routes/profile');
const dashboardRoutes = require('./routes/dashboard');
const planRoutes = require('./routes/plans');
const workoutRoutes = require('./routes/workouts');

const app = express();

// Allow any dev origin (5173/5174/5175 etc.) and credentials
const CORS_ORIGIN = process.env.CORS_ORIGIN || true;
app.use(cors({ origin: CORS_ORIGIN, credentials: true }));
app.use(express.json());

// Simple cookie-based session for per-user isolation
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'flexcore_dev_secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: false, // set true behind HTTPS in production
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    },
  })
);

app.use('/api/profile', profileRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/workouts', workoutRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/workout_app';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
  })
  .catch(err => {
    console.error('Mongo connection error', err.message);
    process.exit(1);
  });
