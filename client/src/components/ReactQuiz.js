import React, { useState } from 'react';

const questionsArray = [
  'Question 1: ...',
  'Question 2: ...',
  'Question 3: ...',
  'Question 4: ...',
  // Add more questions here
];

const ReactQuiz = () => {
  const [answers, setAnswers] = useState(Array(questionsArray.length).fill('')); // Initial state with empty string answers

  const handleInputChange = (index, event) => {
    const newAnswers = [...answers];
    newAnswers[index] = event.target.value;
    setAnswers(newAnswers);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the answers, e.g., send them to a server
    console.log('Answers:', answers);
  };

  return (
    <form onSubmit={handleSubmit}>
      {questionsArray.map((question, index) => (
        <div key={index}>
          <p>{question}</p>
          <label>
            <input
              type="radio"
              name={`question_${index}`}
              value="Option A"
              onChange={(event) => handleInputChange(index, event)}
              checked={answers[index] === 'Option A'}
            />
            Option A
          </label>
          <label>
            <input
              type="radio"
              name={`question_${index}`}
              value="Option B"
              onChange={(event) => handleInputChange(index, event)}
              checked={answers[index] === 'Option B'}
            />
            Option B
          </label>
          <label>
            <input
              type="radio"
              name={`question_${index}`}
              value="Option C"
              onChange={(event) => handleInputChange(index, event)}
              checked={answers[index] === 'Option C'}
            />
            Option C
          </label>
          {/* Add more options as needed */}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default ReactQuiz;
