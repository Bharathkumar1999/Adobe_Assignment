const express = require('express');
const usersRouter = express.Router();
const bodyParser = require('body-parser');

const User = require('../models/User.model');
const Post = require('../models/Post.model');

usersRouter.use(bodyParser.json());

// To Create a new user
usersRouter.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// To Update an existing user
usersRouter.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(
      id,
      { ...req.body, updated_at: Date.now() },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// To Delete an existing user
usersRouter.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByIdAndDelete(
        id
      );
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: err.message });
    }
  });

// To Get a specific user by ID
usersRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// To Get a list of all users
usersRouter.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});




module.exports = usersRouter;

