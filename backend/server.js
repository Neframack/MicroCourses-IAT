const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const Course = require('./models/Course');

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Middleware to handle CORS and JSON requests
app.use(cors());
app.use(express.json());

// Middleware to handle file uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Test if the server is running
app.get('/', (req, res) => {
  res.send('API is running');
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});


// Import course routes and use them
const courseRoutes = require('./routes/courseRoutes');
app.use('/courses', courseRoutes);

