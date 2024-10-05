const express = require('express');
const { saveAnswer, getSession, getQuestions } = require('../controllers/sessionController');

const router = express.Router();

router.post('/save-answer', saveAnswer);
router.get('/session/:userId', getSession);
router.get('/get-questions', getQuestions);

module.exports = router;
