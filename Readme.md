# Chatbot Project

## Overview
This is a simple chatbot application built with **Node.js**, **Express**, **MongoDB**, and **React.js**. The chatbot asks a series of pre-defined questions to the user, saves the responses, and provides the next question until all questions are answered. The frontend interface allows users to interact with the chatbot in a seamless and responsive environment.

## Key Features:
- **Backend**: Built with Express and MongoDB for handling routes, saving user responses, and fetching data.
- **Frontend**: Built with React for creating an interactive and user-friendly interface.
- **Database**: MongoDB is used to store user sessions and responses.
- **Pre-defined Questions**: A set of cat-related questions for interaction with the user.

## Technologies Used

### Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose

### Frontend:
- React.js
- Tailwind CSS for styling

## Installation and Setup

### Prerequisites
- Node.js (v12.x or higher)
- MongoDB
- A package manager such as npm or yarn

### Backend Setup
1. Clone the repository:
    ```bash
    git clone https://github.com/Nurullah-Gelgel/chat-bot.git
    ```

2. Navigate to the backend directory:
    ```bash
    cd chat-bot/chatbot-backend
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Ensure MongoDB is running locally. If not, you can start it using:
    ```bash
    mongod
    ```

5. Create a `.env` file in the root directory with the following content (optional if you're connecting to a different MongoDB instance):
    ```
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/chatbot
    ```

6. Start the backend server:
    ```bash
    npm start
    ```

7. You should see the following message:
    ```
    Server is running on port 5000
    Connected to MongoDB
    ```

### Frontend Setup
1. Navigate to the frontend directory (if using a separate folder for the frontend):
    ```bash
    cd chat-bot/chatbot-frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm start
    ```

4. You should see the following message:
    ```
    Compiled successfully!
    ```

5. Open your browser and navigate to `http://localhost:3000` to access the chatbot interface.

## API Endpoints

### `POST /save-answer`
- **Description**: Saves the user's answer to the current question and returns the next question if available.
- **Body Parameters**:
    - `userId`: A unique identifier for the user.
    - `answer`: The user's answer to the current question.
- **Response**:
    - `nextQuestion`: The next question in the sequence.
    - `message`: Confirmation that the answer was saved successfully.

### `GET /get-questions`
- **Description**: Fetches the list of predefined questions.
- **Response**:
    - `questions`: An array of pre-defined questions.

### `GET /session/:userId`
- **Description**: Fetches the session details for a given user ID.
- **Parameters**:
    - `userId`: The unique ID of the user.

## How It Works

1. **User Interaction**: The chatbot presents a question to the user and awaits their response.
2. **Saving Responses**: Once the user answers a question, the answer is sent to the backend, stored in MongoDB, and the next question is fetched.
3. **Session Management**: Each user session is stored and managed based on their `userId`. If a session already exists, it resumes from where the user left off.

### Sample Flow
- **Bot**: What is your favorite breed of cat, and why?
- **User**: I like Siamese cats because they are social.
- **Bot**: How do you think cats communicate with their owners?
- **User**: They use body language and vocalizations.

The bot continues asking questions until all are answered.

## Conclusion
This project serves as a foundational chatbot system where users can interact with predefined questions, and their answers are stored in a MongoDB database.
