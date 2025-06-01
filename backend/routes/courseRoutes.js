const express = require('express');
const Course = require('../models/Course');
const router = express.Router();
const upload = require('../middleware/upload');
const path = require('path');
const fs = require('fs');


// GET /courses - all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /courses/:id - single course
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /courses - add a new course
router.post('/', upload.single('image'), async (req, res) => {
  try {
    // Validate required fields
    const { title, description, instructor, duration, category, modules } = req.body;

    // Check if required fields are provided
    const newCourse = new Course({
      title,
      description,
      instructor,
      duration,
      category,
      // If an image is uploaded, set the image URL; otherwise, set it to null
      image: req.file ? `http://localhost:5000/uploads/${req.file.filename}` : null,
      modules: modules ? modules.split(',') : []
    });

    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Invalid course data' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Delete associated image file
    if (course.image && course.image.startsWith('http://localhost:5000/uploads/')) {
      const imagePath = path.join(__dirname, '..', course.image.replace('http://localhost:5000', ''));
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error('Error deleting image file:', err.message);
        } else {
          console.log('Image file deleted:', imagePath);
        }
      });
    }

    await course.deleteOne();
    res.status(200).json({ message: 'Course deleted' });
  } catch (err) {
    console.error('Error deleting course:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});



module.exports = router;
