const { createQuiz, getQuizOfRoom } = require("../controller/quizController");

const quizRoutes = require("express").Router();

quizRoutes.post("/create", createQuiz);
quizRoutes.post("/:sessionId/get-all", getQuizOfRoom);



module.exports = {quizRoutes};
