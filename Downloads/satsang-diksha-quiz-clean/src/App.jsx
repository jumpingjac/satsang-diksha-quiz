import React, { useState } from 'react';

import shlokas from './satsang_diksha_transliterated_shlokas.json';

function getRandomShloka() {
  const random = shlokas[Math.floor(Math.random() * shlokas.length)];
  return {
    question: `Shloka ${random.number}\n` + random.text,
    answer: random.answer
  };
}

function App() {
  const [questionObj, setQuestionObj] = useState(getRandomShloka());
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showHint, setShowHint] = useState(false);

  const checkAnswer = () => {
    const userAnswer = userInput.trim().toLowerCase();
    const correctAnswer = questionObj.answer.toLowerCase();
    if (userAnswer === correctAnswer) {
      setFeedback('✅ Correct!');
    } else {
      setFeedback(`❌ Incorrect. The correct answer was: ${questionObj.answer}`);
    }
  };

  const nextQuestion = () => {
    setQuestionObj(getRandomShloka());
    setUserInput('');
    setFeedback('');
    setShowHint(false);
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center', maxWidth: '600px', margin: 'auto' }}>
      <h1>Satsang Diksha Quiz</h1>
      <pre style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>{questionObj.question}</pre>
      <input
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Enter the missing word"
        style={{ padding: '0.5rem', fontSize: '1rem', width: '100%', marginBottom: '1rem' }}
      />
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={checkAnswer} style={{ marginRight: '1rem' }}>Submit</button>
        <button onClick={nextQuestion} style={{ marginRight: '1rem' }}>Next</button>
        <button onClick={() => setShowHint(true)}>Hint</button>
      </div>
      {feedback && <div style={{ fontWeight: 'bold', marginBottom: '1rem' }}>{feedback}</div>}
      {showHint && <div style={{ fontStyle: 'italic', color: '#666' }}>Hint: {questionObj.answer}</div>}
    </div>
  );
}

export default App;
