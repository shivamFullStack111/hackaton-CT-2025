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

    return completion;
  } catch (error) {
    console.log(error.message);
    // return res.send({ success: false, message: error.message });
  }
};

module.exports = {
  grammer_checker_function,
};
