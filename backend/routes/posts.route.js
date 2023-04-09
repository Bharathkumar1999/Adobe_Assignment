const express = require('express');
const postsRouter = express.Router();
const bodyParser = require('body-parser');

const Post = require('../models/Post.model');
const User = require('../models/User.model');

postsRouter.use(bodyParser.json());

// To Create a new post
postsRouter.post('/', async (req, res) => {
  try {
    const { user_id, content } = req.body;
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const post = new Post({ user_id, content });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});


postsRouter.get('/', async (req, res) => {
    try {
      const users = await Post.find();
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: err.message });
    }
  });
  

// To Get a specific post by ID
postsRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id).populate('user_id');
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// To Update an existing post
postsRouter.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndUpdate(
      id,
      { content: req.body.content, updated_at: Date.now() },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// To Delete an existing post
postsRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

postsRouter.post('/:id/like', async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      post.likes++;
      await post.save();
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  
  postsRouter.post('/:id/unlike', async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      if (post.likes > 0) {
        post.likes--;
      }
      await post.save();
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  

  
  module.exports = postsRouter;
  


