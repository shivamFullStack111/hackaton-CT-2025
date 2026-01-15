const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: "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",
});

const quiz_checker = async (quiz, studentAnswers) => {
  try {
    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      temperature: 0,

      messages: [
        {
          role: "system",
          content: `
         You are a quiz checker.
         You will get different types of questions with different marks.
         You will also get student answers you have to check all answers and calculate the result.
         The questions that have not been answered should be given 0 marks. 
         Passing Percentage is 60
         Option number is provide for Questions like true-false, mcq 
          example: Question 1st has 4 option in user answer object {1:"a",1:"d"} means these are option number from question Object
`,
        },
        {
          role: "user",
          content: `
          Quiz Data: ${JSON.stringify(quiz, null, 2)}
          Student Answer: ${JSON.stringify(studentAnswers, null, 2)}
          `,
        },
      ],

      response_format: {
        type: "json_schema",
        strict: true,
        json_schema: {
          name: "quiz_checker",

          schema: {
            type: "object",
            additionalProperties: false,
            properties: {
              passed: {
                type: "boolean",
                description: "User result",
              },
              questionAnswerExplanations: {
                type: "array",
                properties: {
                  questionId: {
                    type: "number",
                  },
                  explanation: {
                    type: "string",
                    description:
                      "Give full correct answer and detail about question and answer",
                  },
                  isCorrect: {
                    type: "boolean",
                    description: "is correct answered by user",
                  },
                },
              },
              totalScore: {
                type: "number",
                description: "Total score according to user answers",
              },
              percentage: {
                type: "number",
                description: "Result percentage",
              },
              totalQuestions: {
                type: "number",
                description: "Total number of Questions",
              },
              correctAnswers: {
                type: "number",
                description: "Total correct",
              },
            },
            required: [
              "passed",
              "totalScore",
              "percentage",
              "totalQuestions",
              "correctAnswers",
            ],
          },
        },
      },
    });

    console.log(completion.choices[0].message.content);
  } catch (error) {
    console.log(error.message);
    // return res.send({ success: false, message: error.message });
  }
};

const questions = [
  {
    id: 1,
    type: "mcq",
    question: "What is the output of console.log(typeof NaN);",
    marks: 2,
    options: [
      {
        id: "a",
        text: "number",
        isCorrect: true,
        _id: "6961e63bca016351c2a3a379",
      },
      {
        id: "b",
        text: "NaN",
        isCorrect: false,
        _id: "6961e63bca016351c2a3a37a",
      },
      {
        id: "c",
        text: "undefined",
        isCorrect: false,
        _id: "6961e63bca016351c2a3a37b",
      },
      {
        id: "d",
        text: "object",
        isCorrect: false,
        _id: "6961e63bca016351c2a3a37c",
      },
    ],
    _id: "6961e63bca016351c2a3a378",
    testCases: [],
    blanks: [],
  },
  {
    id: 2,
    type: "true-false",
    question: "In JavaScript, variables declared with const can be reassigned.",
    marks: 2,
    options: [
      {
        id: "a",
        text: "True",
        isCorrect: false,
        _id: "6961e63bca016351c2a3a37e",
      },
      {
        id: "b",
        text: "False",
        isCorrect: true,
        _id: "6961e63bca016351c2a3a37f",
      },
    ],
    _id: "6961e63bca016351c2a3a37d",
    testCases: [],
    blanks: [],
  },
  {
    id: 3,
    type: "code",
    question: "Write a function that returns the sum of two numbers.",
    marks: 2,
    codeTemplate: "function sum(a, b) {\n  // your code here\n}",
    testCases: [
      {
        input: "2,3",
        output: "5",
        _id: "6961e63bca016351c2a3a381",
      },
    ],
    _id: "6961e63bca016351c2a3a380",
    options: [],
    blanks: [],
  },
  {
    id: 4,
    type: "short-answer",
    question: "What keyword is used to declare a block-scoped variable in ES6?",
    marks: 2,
    _id: "6961e63bca016351c2a3a382",
    options: [],
    testCases: [],
    blanks: [],
  },
  {
    id: 5,
    type: "fill-blanks",
    question:
      "The ____ operator is used to spread elements of an array into another array.",
    marks: 2,
    _id: "6961e63bca016351c2a3a383",
    options: [],
    testCases: [],
    blanks: [],
  },
  {
    id: 6,
    type: "mcq",
    question: "Which method converts a JSON string into a JavaScript object?",
    marks: 2,
    options: [
      {
        id: "a",
        text: "JSON.parse",
        isCorrect: true,
        _id: "6961e63bca016351c2a3a385",
      },
      {
        id: "b",
        text: "JSON.stringify",
        isCorrect: false,
        _id: "6961e63bca016351c2a3a386",
      },
      {
        id: "c",
        text: "Object.fromJSON",
        isCorrect: false,
        _id: "6961e63bca016351c2a3a387",
      },
      {
        id: "d",
        text: "JSON.toObject",
        isCorrect: false,
        _id: "6961e63bca016351c2a3a388",
      },
    ],
    _id: "6961e63bca016351c2a3a384",
    testCases: [],
    blanks: [],
  },
  {
    id: 7,
    type: "true-false",
    question: "The == operator checks both value and type equality.",
    marks: 2,
    options: [
      {
        id: "a",
        text: "True",
        isCorrect: false,
        _id: "6961e63bca016351c2a3a38a",
      },
      {
        id: "b",
        text: "False",
        isCorrect: true,
        _id: "6961e63bca016351c2a3a38b",
      },
    ],
    _id: "6961e63bca016351c2a3a389",
    testCases: [],
    blanks: [],
  },
  {
    id: 8,
    type: "code",
    question: "Write a function that checks if a number is even.",
    marks: 2,
    codeTemplate: "function isEven(n) {\n  // your code here\n}",
    testCases: [
      {
        input: "4",
        output: "true",
        _id: "6961e63bca016351c2a3a38d",
      },
    ],
    _id: "6961e63bca016351c2a3a38c",
    options: [],
    blanks: [],
  },
  {
    id: 9,
    type: "short-answer",
    question: "What does the acronym DOM stand for?",
    marks: 2,
    _id: "6961e63bca016351c2a3a38e",
    options: [],
    testCases: [],
    blanks: [],
  },
  {
    id: 10,
    type: "fill-blanks",
    question:
      "In JavaScript, the function that is called when an error occurs in a Promise is .____.",
    marks: 2,
    _id: "6961e63bca016351c2a3a38f",
    options: [],
    testCases: [],
    blanks: [],
  },
];

quiz_checker(questions, {
  8: "function isEven(n) {\n  return n%2==0\n}",
  5: "...",
});
