const Session = require('../models/session');

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

const saveAnswer = async (req, res) => {
  const { userId, answer } = req.body;

  try {
    let session = await Session.findOne({ userId });
    if (!session) {
      session = new Session({ userId });
    }

    if (session.currentQuestionIndex < questions.length) {
      const currentQuestion = questions[session.currentQuestionIndex];
      session.answers.push({ question: currentQuestion, answer });
      session.currentQuestionIndex += 1;

      if (session.currentQuestionIndex >= questions.length) {
        session.endedAt = Date.now();
      }

      await session.save();

      const nextQuestion = session.currentQuestionIndex < questions.length
        ? questions[session.currentQuestionIndex]
        : null;

      res.status(200).json({
        message: "Answer saved successfully",
        nextQuestion,
      });
    } else {
      res.status(400).json({ message: "All questions have already been answered" });
    }
  } catch (error) {
    console.error("Error saving session:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getSession = async (req, res) => {
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
    res.status(500).json({ message: "Internal server error" });
  }
};

const getQuestions = (req, res) => {
  res.status(200).json({ questions });
};

module.exports = {
  saveAnswer,
  getSession,
  getQuestions,
};
