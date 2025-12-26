const express = require("express");
const {
  personalized_chat,
  code_review,
  grammer_checker,
  generate_quiz,
} = require("../controller/ai_controller");

const aiRouter = express.Router();

aiRouter.post("/personalized-chat", personalized_chat);
aiRouter.post("/review-code", code_review);
aiRouter.post("/grammer-checker", grammer_checker);
aiRouter.post("/generate-quiz", generate_quiz);

module.exports = { aiRouter };
