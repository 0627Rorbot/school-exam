import React from 'react';

const Question = ({ question, index }) => {
    return (
        <div className="question">
            <h2>Question {index + 1}</h2>
            <p>{question.question}</p>
            <ul className="options">
                {question.options.map((option, idx) => (
                    <li key={idx}>
                        <label>
                            <input type="checkbox" name={`question${index}`} value={option} /> {option}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Question;
