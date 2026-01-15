const QuizResult = require("../schemas/quizResultSchema");
const Quiz = require("../schemas/quizSchema");

const getResult = async (req, res) => {
  try {
    const { resultId } = req.params;

    console.log(resultId)

    const result = await QuizResult.findOne({ _id: resultId });

    const quizDetails = await Quiz.findOne({ _id: result.quizId });

    return res.send({
      success: true,
      message: "Result Get",
      result: { ...result.toObject(), quizDetails },
    });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
};

module.exports = { getResult };
