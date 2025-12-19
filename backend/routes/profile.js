const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET profile for logged-in user
router.get('/', async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ error: 'Not logged in' });
    }
    const user = await User.findById(req.session.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST login/new user (sets the current session user)
router.post('/login', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email required' });
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email });
    }
    req.session.userId = user._id.toString();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST logout (destroys session)
router.post('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(() => {
      res.json({ message: 'Logged out' });
    });
  } else {
    res.json({ message: 'Logged out' });
  }
});

// PUT update profile for logged-in user
router.put('/', async (req, res) => {
  try {
    if (!req.session.userId) return res.status(401).json({ error: 'Not logged in' });
    const user = await User.findById(req.session.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    Object.assign(user, req.body);
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
