import React, { useEffect, useState } from 'react';
import './HomePage.css';
import CourseCard from '../components/CourseCard';

function HomePage() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5001/courses')
      .then(res => res.json())
      .then(data => {
        const sorted = [...data].sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        setCourses(sorted);
      })
      .catch(err => console.error('Error fetching courses:', err));
  }, []);

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-page">
      <h1>Available Courses</h1>
      <div className="top-bar">
        <input
          type="text"
          placeholder="Search for a course..."
          className="search-bar"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button className="add-course-btn" onClick={() => setShowModal(true)}>
          Add New Course
        </button>
      </div>

      <div className="course-grid">
        {filteredCourses.map(course => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add New Course</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const data = new FormData(e.target);

                try {
                  const res = await fetch('http://localhost:5001/courses', {
                    method: 'POST',
                    body: data
                  });
                  if (res.ok) {
                    const updatedCourses = await fetch('http://localhost:5001/courses')
                      .then(res => res.json());
                    const sorted = [...updatedCourses].sort((a, b) =>
                      a.title.localeCompare(b.title)
                    );
                    setCourses(sorted);
                    setShowModal(false);
                  } else {
                    alert('Failed to add course.');
                  }
                } catch (err) {
                  console.error(err);
                }
              }}
              encType="multipart/form-data"
            >
              <input name="title" placeholder="Title" required /><br />
              <input name="description" placeholder="Description" required /><br />
              <input name="instructor" placeholder="Instructor" /><br />
              <input name="duration" type="number" placeholder="Duration (hours)" /><br />
              <input name="category" placeholder="Category" /><br />
              <input name="modules" placeholder="Modules (comma separated)" /><br />
              <input type="file" name="image" /><br /><br />
              <button type="submit">Create Course</button>
              <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
