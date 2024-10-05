const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/chatbot', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Define the session schema
const sessionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  currentQuestionIndex: { type: Number, default: 0 }, // Track the current question index
  answers: [{ question: String, answer: String }],    // Store question-answer pairs
  startedAt: { type: Date, default: Date.now },       // When the session started
  endedAt: { type: Date },                            // When the session ended
});

// Create the Session model
const Session = mongoose.model('Session', sessionSchema);

// Predefined list of questions
const questions = [
  "What is your favorite breed of cat, and why?",
  "How do you think cats communicate with their owners?",
  "Have you ever owned a cat? If so, what was their name and personality like?",
  "Why do you think cats love to sleep in small, cozy places?",
  "What’s the funniest or strangest behavior you’ve ever seen a cat do?",
  "Do you prefer cats or kittens, and what’s the reason for your preference?",
  "Why do you think cats are known for being independent animals?",
  "How do you think cats manage to land on their feet when they fall?",
  "What’s your favorite fact or myth about cats?",
  "How would you describe the relationship between humans and cats in three words?"
];

// API route to save answer and return the next question
app.post('/save-answer', async (req, res) => {
  const { userId, answer } = req.body;

  try {
    // Find or create a session for the user
    let session = await Session.findOne({ userId });
    if (!session) {
      session = new Session({ userId });
    }

    // Check if all questions are answered
    if (session.currentQuestionIndex < questions.length) {
      const currentQuestion = questions[session.currentQuestionIndex];

      // Add question and answer to session
      session.answers.push({ question: currentQuestion, answer });

      // Increment the current question index
      session.currentQuestionIndex += 1;

      // Mark session as complete if all questions are answered
      if (session.currentQuestionIndex >= questions.length) {
        session.endedAt = Date.now(); // Set the session end time
      }

      // Save session in the database
      await session.save();

      // Respond with the next question or completion message
      if (session.currentQuestionIndex < questions.length) {
        res.status(200).json({
          message: "Answer saved successfully",
          nextQuestion: questions[session.currentQuestionIndex],
        });
      } else {
        res.status(200).json({ message: "All questions completed" });
      }
    } else {
      // If all questions have been answered, notify the user
      res.status(400).json({ message: "All questions have already been answered" });
    }
  } catch (error) {
    console.error("Error saving session:", error);
    res.status(500).send("Internal server error");
  }
});

// API route to fetch session data (e.g., for review)
app.get('/session/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const session = await Session.findOne({ userId });
    if (session) {
      res.status(200).json(session);
    } else {
      res.status(404).json({ message: "No session found for this user" });
    }
  } catch (error) {
    console.error("Error fetching session:", error);
    res.status(500).send("Internal server error");
  }
});
app.get('/get-questions', (req, res) => {
  res.status(200).json({ questions });
});
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
