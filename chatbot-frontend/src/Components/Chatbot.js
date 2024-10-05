import React, { useState, useEffect } from 'react';
import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';
import Header from './Header';

const Chatbot = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [messageHistory, setMessageHistory] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [userId] = useState('user-' + Math.random().toString(36).substr(2, 9)); // Generate a random user ID

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = () => {
    fetch('http://localhost:5000/get-questions', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.questions) {
          setQuestions(data.questions);
        } else {
          console.log('No questions received');
        }
      })
      .catch(error => {
        console.error('Error fetching questions:', error);
      });
  };

  const handleAnswerSubmit = (answer) => {
    if (!answer.trim()) return;

    const currentQuestionText = questions[currentQuestion];
    const newMessage = { question: currentQuestionText, answer };
    setMessageHistory([...messageHistory, newMessage]);

    // Send the answer to the backend
    submitAnswer(answer);
  };

  const submitAnswer = (answer) => {
    fetch('http://localhost:5000/save-answer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userId,
        answer: answer,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Answer saved successfully:', data);
        if (data.nextQuestion) {
          setCurrentQuestion(prevQuestion => prevQuestion + 1);
        } else {
          console.log('All questions answered');
        }
      })
      .catch(error => {
        console.error('Error saving answer:', error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="w-full p-6 bg-white text-black shadow-lg rounded-lg h-screen flex flex-col">
        <Header />
        <div className="flex-grow">
          <ChatWindow 
            messageHistory={messageHistory} 
            currentQuestion={currentQuestion}
            questions={questions}
          />
        </div>
        <ChatInput handleAnswerSubmit={handleAnswerSubmit} />
      </div>
    </div>
  );
};

export default Chatbot;
