import React, { useState, useEffect } from 'react';

const CommentSection = ({ discussionId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch comments for the discussion
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://192.168.190.148:5000/api/discussions/discussion/${discussionId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,  // Add token for authorization
          },
        });

        if (response.ok) {
          const data = await response.json();
          setComments(data.comments); // Assuming comments are returned as part of the discussion object
          setLoading(false);
        } else {
          throw new Error('Failed to fetch comments');
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchComments();
  }, [discussionId]);

  // Handle adding a new comment
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://192.168.190.148:5000/api/discussions/discussion/${discussionId}/comment`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newComment }),
      });

      if (response.ok) {
        const updatedDiscussion = await response.json();
        setComments(updatedDiscussion.comments);  // Update the comments with the new list
        setNewComment('');  // Clear the input field
      } else {
        throw new Error('Failed to post comment');
      }
    } catch (error) {
      console.error('Error posting comment:', error);
      setError('Failed to post comment');
    }
  };

  if (loading) {
    return <p>Loading comments...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h3>Comments</h3>

      {/* Display comments */}
      {comments.length === 0 ? (
        <p>No comments yet. Be the first to comment!</p>
      ) : (
        <ul>
          {comments.map((comment) => (
            <li key={comment._id}>
              <p>{comment.content}</p>
              <small>By: {comment.createdBy?.name || 'Anonymous'} on {new Date(comment.createdAt).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}

      {/* Form to add a new comment */}
      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          required
        />
        <button type="submit">Post Comment</button>
      </form>
    </div>
  );
};

export default CommentSection;
