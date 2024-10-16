import React from 'react';

const LikeButton = ({ discussion, setDiscussion }) => {
  const handleLikeToggle = async () => {
    try {
      const response = await fetch(`http://192.168.190.148:5000/api/discussions/discussion/${discussion._id}/like`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const updatedDiscussion = await response.json();
        setDiscussion(updatedDiscussion);  // Update the discussion with the new like status
      } else {
        throw new Error('Failed to like/unlike discussion');
      }
    } catch (error) {
      console.error('Error liking/unliking discussion:', error);
    }
  };

  const userHasLiked = discussion.likes.includes(localStorage.getItem('userId')); // Check if the user has liked the discussion

  return (
    <button onClick={handleLikeToggle}>
      {userHasLiked ? 'Unlike' : 'Like'} ({discussion.likes.length})
    </button>
  );
};

export default LikeButton;
