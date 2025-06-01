const mongoose = require('mongoose');


// COURSE MODEL
// This model defines the structure of a course document in MongoDB.
const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  instructor: String,
  duration: Number, // in hours
  category: String,
  image: String, // image path
  modules: [String], // list of lessons/modules
});

module.exports = mongoose.model('Course', CourseSchema);
