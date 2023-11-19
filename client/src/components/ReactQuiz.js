// import React, { useState } from 'react';

// const ReactQuiz = ({ questionsArray }) => {
//   const [answers, setAnswers] = useState(Array(questionsArray.length).fill('')); // Initial state with empty string answers

//   const handleInputChange = (index, event) => {
//     const newAnswers = [...answers];
//     newAnswers[index] = event.target.value;
//     setAnswers(newAnswers);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Do something with the answers, e.g., send them to a server
//     console.log('Answers:', answers);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       {questionsArray.map((question, index) => (
//         <div key={index}>
//           <p>{question}</p>
//           <label>
//             <input
//               type="radio"
//               name={`question_${index}`}
//               value="Option A"
//               onChange={(event) => handleInputChange(index, event)}
//               checked={answers[index] === 'Option A'}
//             />
//             Option A
//           </label>
//           <label>
//             <input
//               type="radio"
//               name={`question_${index}`}
//               value="Option B"
//               onChange={(event) => handleInputChange(index, event)}
//               checked={answers[index] === 'Option B'}
//             />
//             Option B
//           </label>
//           <label>
//             <input
//               type="radio"
//               name={`question_${index}`}
//               value="Option C"
//               onChange={(event) => handleInputChange(index, event)}
//               checked={answers[index] === 'Option C'}
//             />
//             Option C
//           </label>
//           {/* Add more options as needed */}
//         </div>
//       ))}
//       <button type="submit">Submit</button>
//     </form>
//   );
// };
// export default ReactQuiz;
import React, { useState } from 'react';

const ReactQuiz = ({ questions, choices, correctAnswers }) => {
  const [selectedAnswers, setSelectedAnswers] = useState(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (questionIndex, choiceIndex) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[questionIndex] = choiceIndex;
    setSelectedAnswers(newSelectedAnswers);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);

    // Calculate the score
    const score = selectedAnswers.reduce((acc, selectedChoice, index) => {
      return selectedChoice === correctAnswers[index] ? acc + 1 : acc;
    }, 0);

    // Display the score
    alert(`Your Score: ${score}/${questions.length}`);

    // Reset selected answers
    setSelectedAnswers(Array(questions.length).fill(null));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {questions.map((question, questionIndex) => (
          <div key={questionIndex}>
            <p>{question}</p>
            {choices[questionIndex].map((choice, choiceIndex) => (
              <label key={choiceIndex}>
                <input
                  type="radio"
                  name={`question_${questionIndex}`}
                  value={choiceIndex}
                  onChange={() => handleInputChange(questionIndex, choiceIndex)}
                  checked={selectedAnswers[questionIndex] === choiceIndex}
                  disabled={submitted}
                />
                {choice}
              </label>
            ))}
          </div>
        ))}
        <button type="submit" disabled={submitted}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReactQuiz;
