import React from 'react';

const ChatInput = ({ handleAnswerSubmit }) => {
  return (
    <input
      type="text"
      placeholder="Type your answer here..."
      className="w-full p-4 border border-gray-300 bg-white text-black rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleAnswerSubmit(e.target.value);
          e.target.value = '';
        }
      }}
    />
  );
};

export default ChatInput;
