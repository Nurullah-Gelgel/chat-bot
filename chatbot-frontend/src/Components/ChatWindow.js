import React, { useEffect, useRef } from 'react';

const ChatWindow = ({ messageHistory = [], currentQuestion = '', questions = [] }) => {
  const messageEndRef = useRef(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messageHistory]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg h-[75vh] overflow-y-auto mb-6 border border-gray-300">
      {messageHistory.map((message, index) => (
        <div key={index} className="mb-6 transition-transform duration-300">
          <div className="flex justify-start">
            <p className="bg-blue-200 p-4 rounded-lg max-w-xl text-blue-900 border border-blue-300">
              <strong>Bot:</strong> {message.question}
            </p>
          </div>
          <div className="flex justify-end">
            <p className="bg-green-200 p-4 rounded-lg max-w-xl text-green-900 border border-green-300">
              <strong>You:</strong> {message.answer}
            </p>
          </div>
        </div>
      ))}
      {questions.length > 0 && currentQuestion < questions.length && (
        <div className="flex justify-start">
          <p className="bg-blue-200 p-4 rounded-lg max-w-xl text-blue-900 border border-blue-300">
            <strong>Bot:</strong> {questions[currentQuestion]}
          </p>
        </div>
      )}
      <div ref={messageEndRef} />
    </div>
  );
};

export default ChatWindow;
