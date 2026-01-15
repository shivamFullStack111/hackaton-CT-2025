const {  getResult } = require("../controller/quizResultController");

const quizResultRoutes = require("express").Router();

quizResultRoutes.get('/:resultId/get',getResult)

module.exports={quizResultRoutes}