const mongoose = require("mongoose");

const quizResultSchema = new mongoose.Schema(
  {
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    passed: {
      type: "boolean",
      required: true,
    },
    totalScore: {
      type: Number,
      required: true,
    },
    percentage: {
      type: Number,
      required: true,
    },
    totalQuestions: {
      type: Number,
      required: true,
    },
    correctAnswers: {
      type: Number,
      required: true,
    },
    time: {
      totalQuizTime: Number,
      timeLeft: Number,
    },

    // new add
    timeTaken: {
      type: Number,
      required: true,
    },

    questionAnswerExplanations: [
      {
        questionId: {
          type: Number,
          required: true,
        },
        explanation: {
          type: String,
          required: true,
        },
        isCorrect: {
          type: Boolean,
          required: true,
        },
        // new add-----
        question: {
          type: String,
          required: true,
        },
        marks: {
          type: Number,
          required: true,
        },
        userAnswer: {
          type: String,
          default:""
        },
        correctAnswer: {
          type: String,
          required: true,
        },
        //new add end-----
      },
    ],
  },
  { timestamps: true }
);

const QuizResult = mongoose.model("quiz-result", quizResultSchema);

module.exports = QuizResult;
