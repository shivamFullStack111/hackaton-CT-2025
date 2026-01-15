const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const grammer_checker_function = async (userInput, grammer_mode) => {
  try {
    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      temperature: 0,
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "grammar_checker_response",
          strict: true,
          schema: {
            type: "object",
            additionalProperties: false,
            properties: {
              grammer_mode: {
                type: "string",
                description: "Mode which is provided my user",
              },
              original_text: {
                type: "string",
                description: "User input text before correction",
              },
              corrected_text: {
                type: "string",
                description: "Final corrected version of the text",
              },
              mistakes: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: false,
                  properties: {
                    type: {
                      type: "string",
                      enum: ["grammar", "spelling", "punctuation", "style"],
                    },
                    original: {
                      type: "string",
                    },
                    corrected: {
                      type: "string",
                    },
                    reason: {
                      type: "string",
                    },
                  },
                  required: ["type", "original", "corrected", "reason"],
                },
              },
              accuracy_score: {
                type: "number",
                minimum: 0,
                maximum: 1,
                description:
                  "User overall accuracy 0 means user are very baad in english and 1 for user is very good in english",
              },
              error_fixed: {
                type: "number",
                description: "Total error fixed",
              },
              words_checked: {
                type: "number",
                description: "Total words checked",
              },
            },
            required: [
              "original_text",
              "corrected_text",
              "mistakes",
              "accuracy_score",
              "grammer_mode",
              "error_fixed",
              "words_checked",
            ],
          },
        },
      },

      messages: [
        {
          role: "system",
          content: `
You are a grammer checker specialist you must have to return valid json 
`,
        },
        {
          role: "system",
          content: `
          user will provide you text and
          grammer mode you have to return response according to user grammer mode 
          there are 4 modes:
          1. Standard
          2. Creative
          3. Acadamic
          4. Concise
`,
        },
        {
          role: "user",
          content: `GRAMMER MODE: ${grammer_mode} TEXT: ${userInput}`,
        },
      ],
    });

    // console.log(completion.choices[0].message.content)
    return completion;
  } catch (error) {
    console.log(error.message);
  }
};

const AiCode_review = async (allMessages, reviewMode) => {
  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      temperature: 0,
      messages: [
        {
          role: "system",
          content: `
You are a senior software engineer acting as a code reviewer.

You have to review the code according to given reviewMode 

types of review modes:
1. comprehensive
2. security
3. performance
4. best-practices
5. debug

Right now user use ${reviewMode} Mode. 
`,
        },
        ...allMessages,
      ],
    });

    return completion;
  } catch (error) {
    console.log(error.message);
  }
};

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
                  // new add-----
                  question: {
                    type: "string",
                    description: "actual question",
                  },
                  marks: {
                    type: "number",
                    description: "Question marks",
                  },
                  userAnswer: {
                    type: "string",
                    description: "user answer if the question type true-false or mcq user provided option number but you have to return actual answer not option number",
                  },
                  correctAnswer: {
                    type: "string",
                    description: "correct answer",
                  },
                  //new add end-----

                  explanation: {
                    type: "string",
                    description: "Give explanation of quetion and answer",
                  },
                  isCorrect: {
                    type: "boolean",
                    description: "is correct answered by user",
                  },
                },
                required: [
                  "questionId",
                  "question",
                  "marks",
                  "userAnswer",
                  "correctAnswer",
                  "explanation",
                  "isCorrect",
                ],
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
console.log(completion.choices[0].message.content)
    return completion;
  } catch (error) {
    console.log(error.message);
  }
};

const quiz_generator = async (
  difficulty,
  quizRequirements,
  total_questions
) => {
  try {
    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      temperature: 0,

      messages: [
        {
          role: "system",
          content: `
         You are a quiz generator you have to generate questions 
         User will provide you difficulty level and total numbers of quiz questions
         User will also provide you quiz requirements or topics for quiz 
         Marks of question must between 1 to 10 according to question type and difficulty
        (Important)
          It is not compulsary to create question of all types only that question which can be create accordig to given topic and requirements by user example some of the topic doesn't have code implementation like (history,economics,GK,science) etc.

         You have to generate different types of questions:
         1. MCQ
         2. True/False
         3. Code Implementation
         4. Short Answer
         5. Fill in Blanks
`,
        },
        {
          role: "user",
          content: `
          Difficulty Level: ${difficulty}
          Quiz Requirements/Topics: ${quizRequirements}
          Total Number of Questions: ${total_questions}
          `,
        },
      ],

      response_format: {
        type: "json_schema",
        strict: true,
        json_schema: {
          name: "quiz_generator",

          schema: {
            type: "object",
            additionalProperties: false,
            properties: {
              title: {
                type: "string",
                description: "Title of Quiz",
              },
              description: {
                type: "string",
                description: "Description of Quiz",
              },
              timeLimit: {
                type: "number",
                description: "Total Time Limit in (seconds)",
              },
              totalMarks: {
                type: "number",
                description: "Total Marks of Quiz",
              },
              difficulty: {
                type: "string",
                description: "Difficulty Level That Provided By User",
              },
              topic: {
                type: "string",
                description: "Topic Name of Quiz",
              },
              questions: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: false,
                  properties: {
                    id: {
                      type: "number",
                    },
                    type: {
                      type: "string",
                      description: "Quiz Type",
                      enum: [
                        "mcq",
                        "code",
                        "short-answer",
                        "fill-blanks",
                        "true-false",
                      ],
                    },
                    question: {
                      type: "string",
                    },
                    marks: {
                      type: "number",
                      description: "Marks of this question",
                    },
                    options: {
                      type: "array",
                      description:
                        "Options of Quiestions only for (True/False and MCQ) ",
                      items: {
                        type: "object",
                        additionalProperties: false,
                        properties: {
                          id: {
                            type: "string",
                            enum: ["a", "b", "c", "d"],
                          },
                          text: {
                            type: "string",
                            description:
                              "Option but if question type is true-false then write True or False ",
                          },
                          isCorrect: {
                            type: "boolean",
                            description: "True if this option is correct",
                          },
                        },
                      },
                    },
                    explanation: {
                      type: "string",
                      description: "Question and answer explanation (optional)",
                    },
                    testCases: {
                      type: "object",
                      additionalProperties: false,
                      description: "Test cases for code type question",
                      properties: {
                        input: {
                          type: "string",
                        },
                        output: {
                          type: "string",
                        },
                      },
                    },
                    codeTemplate: {
                      type: "string",
                    },
                  },
                  required: ["id", "type", "question", "marks"],
                },
              },
            },
            required: [
              "id",
              "title",
              "description",
              "timeLimit",
              "totalMarks",
              "difficulty",
              "topic",
              "questions",
            ],
          },
        },
      },
    });

    return completion;
  } catch (error) {
    console.log(error.message);
    // return res.send({ success: false, message: error.message });
  }
};

module.exports = {
  grammer_checker_function,
  quiz_generator,
  AiCode_review,
  quiz_checker,
};
