const express = require('express');
const router = express.Router();
const taskDb = require('../models/inMemoryDb');
const { auth } = require('../middleware/auth');

// All routes require authentication
router.use(auth);

// GET all tasks
router.get('/', async (req, res) => {
  try {
    // Get all tasks or filter by user ID if implemented
    const tasks = taskDb.getAll();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET task by ID
router.get('/:id', async (req, res) => {
  try {
    const task = taskDb.getById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// CREATE a new task
router.post('/', async (req, res) => {
  try {
    // Validation
    if (!req.body.title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const newTask = taskDb.create({
      title: req.body.title,
      description: req.body.description || '',
      status: req.body.status || 'pending',
      userId: req.user.id // Associate task with authenticated user
    });

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// UPDATE a task
router.put('/:id', async (req, res) => {
  try {
    const { title, description, status } = req.body;
    
    // Find task first to check if it exists
    const task = taskDb.getById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    // Update the task
    const updatedTask = taskDb.update(req.params.id, { title, description, status });
    
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// DELETE a task
router.delete('/:id', async (req, res) => {
  try {
    const task = taskDb.getById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    taskDb.remove(req.params.id);
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router; 