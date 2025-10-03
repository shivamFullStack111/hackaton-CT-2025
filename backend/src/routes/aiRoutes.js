const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');


router.post('/chat', aiController.chatWithAI);
router.post('/grammar-check', aiController.checkGrammar);
router.post('/pronunciation-feedback', aiController.pronunciationFeedback);
router.post('/moderate', aiController.moderateContent);

module.exports = router;