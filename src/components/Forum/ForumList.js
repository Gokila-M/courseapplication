import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router

const ForumList = ({ courseId }) => {
  const [discussions, setDiscussions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch the list of discussions for the given course
  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const response = await fetch(`http://192.168.190.148:5000/api/discussions/${courseId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,  // Add token for authorization
          },
        });

        if (response.ok) {
          const data = await response.json();
          setDiscussions(data);
          setLoading(false);
        } else {
          throw new Error('Failed to fetch discussions');
        }
      } catch (error) {
        console.error('Error fetching discussions:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchDiscussions();
  }, [courseId]);

  // Handle when a discussion is clicked
  const handleDiscussionClick = (id) => {
    navigate(`/discussions/${id}`); // Navigate to the detailed discussion page
  };

  if (loading) {
    return <p>Loading discussions...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Forum Discussions</h2>

      {/* Display list of discussions */}
      {discussions.length === 0 ? (
        <p>No discussions available for this course.</p>
      ) : (
        <ul>
          {discussions.map((discussion) => (
            <li key={discussion._id} onClick={() => handleDiscussionClick(discussion._id)}>
              <h3>{discussion.title}</h3>
              <p>{discussion.content.substring(0, 100)}...</p> {/* Show the first 100 characters */}
              <small>Posted by: {discussion.createdBy?.name || 'Anonymous'} on {new Date(discussion.createdAt).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ForumList;
