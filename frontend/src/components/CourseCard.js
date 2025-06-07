import React from 'react';

function CourseCard({ course }) {
  return (
    <div className="course-card">
      <img src={course.image} alt={course.title} />
      <h3>{course.title}</h3>
      <p>{course.description}</p>
      <p><strong>Duration:</strong> {course.duration} hours</p>
      <a href={`/courses/${course._id}`}>View Details</a>
    </div>
  );
}

export default CourseCard;
