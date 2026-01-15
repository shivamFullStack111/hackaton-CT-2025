const Quiz = require("../schemas/quizSchema");

const createQuiz = async (req, res) => {
  try {
    const {
      sessionId,
      title,
      description,
      timeLimit,
      totalMarks,
      difficulty,
      topic,
      questions,
    } = req.body;

    const newQuiz = await new Quiz({
      sessionId,
      title,
      description,
      timeLimit,
      totalMarks,
      difficulty,
      topic,
      questions,
    }).save();

    return res.send({
      success: true,
      message: "Quiz Created Successfully!",
      quiz: newQuiz,
    });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
};

const getQuizOfRoom = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const quizes = await Quiz.find({ sessionId: sessionId });

    return res.send({ success: true, message: "Quizes get", quizes });
  } catch (error) {
    return res.send({ success: false, message: error?.message });
  }
};

module.exports = { createQuiz,getQuizOfRoom };
