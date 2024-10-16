import React, { useState, useEffect } from 'react';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the list of courses from the backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://192.168.190.148:5000/api/courses', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Add token for authorization
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCourses(data);
          setLoading(false);
        } else {
          throw new Error('Failed to fetch courses');
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Function to handle course deletion
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this course?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://192.168.190.148:5000/api/courses/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        setCourses(courses.filter(course => course._id !== id));
        alert('Course deleted successfully!');
      } else {
        throw new Error('Failed to delete course');
      }
    } catch (error) {
      console.error('Error deleting course:', error);
      alert('Error deleting course');
    }
  };

  if (loading) {
    return <p>Loading courses...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Course List</h2>
      {courses.length === 0 ? (
        <p>No courses available</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course._id}>
                <td>{course.title}</td>
                <td>{course.description}</td>
                <td>{course.duration}</td>
                <td>{course.category}</td>
                <td>
                  <button onClick={() => alert('Edit feature coming soon!')}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(course._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CourseList;
