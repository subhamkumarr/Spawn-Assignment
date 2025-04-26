const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');

// API routes
app.use('/tasks', taskRoutes);
app.use('/auth', authRoutes);

// Root route for API check
app.get('/api', (req, res) => {
  res.send('Task Manager API is running');
});

// Serve static assets in production
const BUILD_PATH = process.env.NODE_ENV === 'production' 
  ? path.join(__dirname, '../frontend/build')
  : path.join(__dirname, '../frontend/public');

// Serve static files
app.use(express.static(BUILD_PATH));

// Explicitly define routes to avoid path-to-regexp issues
app.get('/login', serveIndex);
app.get('/register', serveIndex);
app.get('/dashboard', serveIndex);
app.get('/', serveIndex);

// Function to serve the index.html file
function serveIndex(req, res) {
  res.sendFile(path.join(BUILD_PATH, 'index.html'));
}

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 