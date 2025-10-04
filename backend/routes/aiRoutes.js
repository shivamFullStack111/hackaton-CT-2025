const express = require('express');
const router = express.Router();
const aiController = require('../controller/aiController');

// New routes for personalized AI
router.post('/initialize-profile', aiController.initializeUserProfile);
router.post('/personalized-chat', aiController.chatWithAI);
router.get('/profile/:userId', aiController.getUserProfile);
router.put('/update-profile', aiController.updateUserProfile);

// Existing routes (updated to support personalization)
router.post('/chat', aiController.chatWithAI);
router.post('/grammar-check', aiController.checkGrammar);
router.post('/pronunciation-feedback', aiController.pronunciationFeedback);
router.post('/moderate', aiController.moderateContent);

module.exports = router;