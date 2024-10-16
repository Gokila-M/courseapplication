// // Profile.js
// import React, { useState } from 'react';

// const Profile = () => {
//   const [username, setUsername] = useState('JohnDoe');
//   const [bio, setBio] = useState('Software Developer at XYZ Company');

//   const handleUpdate = (e) => {
//     e.preventDefault();
//     // Logic to update profile (e.g., API call)
//     // console.log("Profile updated:", { username, bio });
//   };

//   return (
//     <div>
//       <h1>User Profile</h1>
//       <form onSubmit={handleUpdate}>
//         <label>Username:</label>
//         <input
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           placeholder="Enter your username"
//         />
//         <label>Bio:</label>
//         <textarea
//           value={bio}
//           onChange={(e) => setBio(e.target.value)}
//           placeholder="Tell us about yourself"
//         />
//         <button type="submit">Update Profile</button>
//       </form>
//     </div>
//   );
// };

// export default Profile;


import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

      try {
        const response = await fetch('http://192.168.190.148:5000/api/user/profile', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, // Add token to the Authorization header
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfile(data); // Set the profile data to state
        } else {
          const errorData = await response.json();
          setError(errorData.message);
        }
      } catch (error) {
        setError('Failed to fetch profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      {profile && (
        <div>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Joined At:</strong> {new Date(profile.createdAt).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
