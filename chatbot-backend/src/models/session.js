const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  currentQuestionIndex: { type: Number, default: 0 },
  answers: [{ question: String, answer: String }],
  startedAt: { type: Date, default: Date.now },
  endedAt: { type: Date },
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
