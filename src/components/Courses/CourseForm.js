import React, { useState } from 'react';

const CourseForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('');
  const [chapters, setChapters] = useState([{ name: '', topics: [''] }]);

  // Function to add a new chapter
  const handleAddChapter = () => {
    setChapters([...chapters, { name: '', topics: [''] }]);
  };

  // Function to add a new topic to a chapter
  const handleAddTopic = (chapterIndex) => {
    const newChapters = [...chapters];
    newChapters[chapterIndex].topics.push('');
    setChapters(newChapters);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct the course data
    const courseData = {
      title,
      description,
      duration,
      category,
      chapters,
    };

    try {
      // Send course data to the backend API using fetch
      const response = await fetch('http://192.168.190.148:5000/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(courseData),
      });

      if (response.ok) {
        alert('Course created successfully!');
        // Clear form fields after successful submission
        setTitle('');
        setDescription('');
        setDuration('');
        setCategory('');
        setChapters([{ name: '', topics: [''] }]);
      } else {
        throw new Error('Failed to create course');
      }
    } catch (error) {
      console.error('Error creating course:', error);
      alert('An error occurred while creating the course.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a New Course</h2>

      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Course Title"
          required
        />
      </div>

      <div>
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Course Description"
          required
        />
      </div>

      <div>
        <label>Duration</label>
        <input
          type="text"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="Course Duration (e.g., '10 hours')"
          required
        />
      </div>

      <div>
        <label>Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Course Category"
          required
        />
      </div>

      <h3>Chapters and Topics</h3>
      {chapters.map((chapter, chapterIndex) => (
        <div key={chapterIndex}>
          <label>Chapter Name</label>
          <input
            type="text"
            value={chapter.name}
            onChange={(e) => {
              const newChapters = [...chapters];
              newChapters[chapterIndex].name = e.target.value;
              setChapters(newChapters);
            }}
            placeholder="Chapter Name"
            required
          />

          {chapter.topics.map((topic, topicIndex) => (
            <div key={topicIndex}>
              <label>Topic Name</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => {
                  const newChapters = [...chapters];
                  newChapters[chapterIndex].topics[topicIndex] = e.target.value;
                  setChapters(newChapters);
                }}
                placeholder="Topic Name"
                required
              />
            </div>
          ))}

          <button type="button" onClick={() => handleAddTopic(chapterIndex)}>
            + Add Topic
          </button>
        </div>
      ))}

      <button type="button" onClick={handleAddChapter}>
        + Add Chapter
      </button>

      <button type="submit">Create Course</button>
    </form>
  );
};

export default CourseForm;
