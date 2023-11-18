import React from 'react';
import './QuizCard.css';

function QuizCard({field1, field2, field3}) {
    return (
        <div className='QuizCard'>
            <h1>{field1}</h1>
            <h1>Score: {field2}</h1>
            <h1>{field3}</h1>
        </div>
    );
}
export default QuizCard;