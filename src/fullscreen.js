import React, { useState } from 'react';
import "./fullscreen.css"
const CreateCourse = () => {
  // State for form fields
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Data Management');
  const [level, setLevel] = useState('Basic');
  const [description, setDescription] = useState('');
  const [faq, setFaq] = useState([{ question: '', answer: '' }]);
  const [coverImage, setCoverImage] = useState(null);
  const [salesVideo, setSalesVideo] = useState(null);

  // Handle file input
  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (type === 'coverImage') {
      setCoverImage(file);
    } else {
      setSalesVideo(file);
    }
  };

  // Add a new FAQ row
  const addFaq = () => {
    setFaq([...faq, { question: '', answer: '' }]);
  };

  // Update FAQ fields
  const handleFaqChange = (index, field, value) => {
    const updatedFaq = faq.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setFaq(updatedFaq);
  };

  // UI Design
  return (
    <div className="create-course">
      <h2>Create New Course</h2>

      <div className="form-section">
        <h3>Course Information</h3>
        <label>Title</label>
        <input
          type="text"
          placeholder="e.g. Introduction to Data Analysis"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Data Management">Data Management</option>
          <option value="Programming">Programming</option>
          <option value="Marketing">Marketing</option>
        </select>

        <label>Level</label>
        <select value={level} onChange={(e) => setLevel(e.target.value)}>
          <option value="Basic">Basic</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Course description"
        ></textarea>
      </div>

      <div className="form-section">
        <h3>Cover Image</h3>
        <input type="file" onChange={(e) => handleFileChange(e, 'coverImage')} />
        {coverImage && <p>Uploaded: {coverImage.name}</p>}
      </div>

      <div className="form-section">
        <h3>Sales Video</h3>
        <input type="file" onChange={(e) => handleFileChange(e, 'salesVideo')} />
        {salesVideo && <p>Uploaded: {salesVideo.name}</p>}
      </div>

      <div className="form-section">
        <h3>Frequently Asked Questions</h3>
        {faq.map((item, index) => (
          <div key={index} className="faq-item">
            <input
              type="text"
              placeholder="e.g. Do you offer 1 on 1 calls?"
              value={item.question}
              onChange={(e) =>
                handleFaqChange(index, 'question', e.target.value)
              }
            />
            <input
              type="text"
              placeholder="e.g. Yes at a fixed cost per call"
              value={item.answer}
              onChange={(e) => handleFaqChange(index, 'answer', e.target.value)}
            />
          </div>
        ))}
        <button onClick={addFaq}>Add FAQ</button>
      </div>

      <button className="save-btn">Save As Draft</button>
      <button className="continue-btn">Save & Continue</button>
    </div>
  );
};

export default CreateCourse;
