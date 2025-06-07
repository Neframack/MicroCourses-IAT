import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './CourseDetail.css';

function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/courses/${id}`)
      .then(res => res.json())
      .then(data => setCourse(data))
      .catch(err => console.error('Error fetching course:', err));
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this course?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/courses/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        alert('Course deleted successfully.');
        navigate('/');
      } else {
        alert('Failed to delete course.');
      }
    } catch (error) {
      console.error('Error deleting course:', error);
      alert('An error occurred while deleting.');
    }
  };

  if (!course) return <p>Loading...</p>;

  return (
    <div className="course-detail-container">
      <div className="course-box">
        {/* Left side: text info */}
        <div className="course-info">
          <h2>{course.title}</h2>
          <p><strong>Description:</strong> {course.description}</p>
          <p><strong>Instructor:</strong> {course.instructor}</p>
          <p><strong>Duration:</strong> {course.duration} hours</p>
          <p><strong>Category:</strong> {course.category}</p>

          <h3>Modules:</h3>
          <ul>
            {course.modules && course.modules.map((mod, idx) => (
              <li key={idx}>{mod}</li>
            ))}
          </ul>

          <Link to="/" className="home-link">← Back to Home</Link>
        </div>

        {/* Right side: image + delete button */}
        <div className="course-img-actions">
          <img
            src={course.image}
            alt={course.title}
            className="course-image"
          />
          <button className="delete-btn" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
