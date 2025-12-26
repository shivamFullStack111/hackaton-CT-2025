const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: "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",
});



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
         Difficulty Levels are:
         1. Beginner
         2. Intermediate
         3. Advanced
         4. Expert

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
          name: "Quiz_questions", 
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
              Topic: {
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
                  },
                  required: ["id", "type", "question", "marks"],
                },
              },
            },
            required: [
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

    console.log(completion.choices[0].message.content)
  } catch (error) {
    console.log(error.message);
  }
};


quiz_generator(
  "Intermediate",
  "Create a quiz on JavaScript closures and lexical scope. Include output-based questions and real-world examples. Keep the difficulty level medium.",
  30
)