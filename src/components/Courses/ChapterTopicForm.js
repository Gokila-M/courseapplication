import React, { useState } from 'react';

const ChapterTopicForm = () => {
  const [chapters, setChapters] = useState([{ name: '', topics: [''] }]);

  const handleAddChapter = () => {
    setChapters([...chapters, { name: '', topics: [''] }]);
  };

  const handleAddTopic = (index) => {
    const newChapters = [...chapters];
    newChapters[index].topics.push('');
    setChapters(newChapters);
  };

  return (
    <div>
      {chapters.map((chapter, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Chapter Name"
            value={chapter.name}
            onChange={(e) => {
              const newChapters = [...chapters];
              newChapters[index].name = e.target.value;
              setChapters(newChapters);
            }}
          />
          {chapter.topics.map((topic, tIndex) => (
            <input
              key={tIndex}
              type="text"
              placeholder="Topic Name"
              value={topic}
              onChange={(e) => {
                const newChapters = [...chapters];
                newChapters[index].topics[tIndex] = e.target.value;
                setChapters(newChapters);
              }}
            />
          ))}
          <button onClick={() => handleAddTopic(index)}>+ Add Topic</button>
        </div>
      ))}
      <button onClick={handleAddChapter}>+ Add Chapter</button>
    </div>
  );
};

export default ChapterTopicForm;
