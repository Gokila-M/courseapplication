import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CommentSection from './Forum/CommentSection';
import LikeButton from './Forum/LikeButton';


const DiscussionDetail = () => {
  const { id } = useParams();  // Get discussion ID from URL params
  const [discussion, setDiscussion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the detailed discussion
//   useEffect(() => {
//     const fetchDiscussion = async () => {
//       try {
//         const response = await fetch(`http://192.168.190.148:5000/api/discussions/discussion/${id}`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,  // Add token for authorization
//           },
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setDiscussion(data);  // Store the discussion data
//           setLoading(false);
//         } else {
//           throw new Error('Failed to fetch discussion');
//         }
//       } catch (error) {
//         console.error('Error fetching discussion:', error);
//         setError(error.message);
//         setLoading(false);
//       }
//     };

//     fetchDiscussion();
//   }, [id]);

  if (loading) {
    return <p>Loading discussion...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      {discussion && (
        <>
          <h1>{discussion.title}</h1>
          <p>{discussion.content}</p>
          <p>
            <small>Posted by: {discussion.createdBy?.name || 'Anonymous'} on {new Date(discussion.createdAt).toLocaleString()}</small>
          </p>

          {/* Display the like/unlike button */}
          <LikeButton discussion={discussion} setDiscussion={setDiscussion} />

          {/* Display the comment section */}
          <CommentSection discussionId={discussion._id} />
        </>
      )}
    </div>
  );
};

export default DiscussionDetail;
