const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  sessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Session",
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  timeLimit: { type: Number, required: true }, // In seconds
  totalMarks: { type: Number, required: true },
  difficulty: { type: String, required: true },
  topic: { type: String, required: true },
  testCases: {
    input: { type: String },
    output: { type: String },
  },
  //   status: "draft",
  questions: [
    {
      id: {
        type: Number,
      },
      type: {
        type: String,
        required: true,
        enum: ["mcq", "code", "true-false", "short-answer", "fill-blanks"],
      },

      question: {
        type: String,
        required: true,
      },
      marks: {
        type: Number,
        required: true,
      },
      options: [
        {
          id: {
            type: String,
            enum: ["a", "b", "c", "d"],
          },
          text: {
            type: String,
          },
          isCorrect: {
            type: Boolean,
          },
        },
      ],
      correctAnswer: {
        type: String,
      },
      codeTemplate: {
        type: String,
      },
      testCases: [
        {
          input: {
            type: String,
          },
          output: {
            type: String,
          },
        },
      ],
      explanation: {
        type: String,
      },
      blanks: [
        {
          id: { type: String },
          correct: { type: String },
          studentAnswer: { type: String },
        },
      ],
    },
  ],
});

const Quiz = mongoose.model("Quiz", quizSchema);
module.exports = Quiz;