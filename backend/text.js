const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: "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",
});

const grammer_checker = async (userInput, grammer_mode) => {
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
            },
            required: [
              "original_text",
              "corrected_text",
              "mistakes",
              "accuracy_score",
              "grammer_mode",
              "error_fixed",
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

    console.log(completion.choices[0].message.content);
  } catch (error) {
    console.log(error.message);
    // return res.send({ success: false, message: error.message });
  }
};

grammer_checker(
  `In todays fast moving digital world many student and profesionals are trying to learn new skill but they dont always follow the correct way of learning. Some people think that watching random videos on youtube are enough for becoming expert but this approach is not very effective it creates confusion and lack of direction. When a person start learning without proper roadmap he often feels lost, demotivated and sometime even quit in middle. This problem is very common specially among beginners who are entering fields like programming, artificial inteligence or data science.

Another big issue is time management. Many learners says that they dont have enough time to study however when we analyze their daily routine we can clearly see that lot of time is wasted on social media, unnecessary scrolling and multitasking. Instead of focusing on one task they try to do many thing at same time which reduces productivity and increase mental stress. Learning require consistency but people expect instant results, they want to master complex topic in few days which is not realistic expectation.

Grammar and communication skills are also ignored by technical students. They believe that only coding skills matter but in real world communication play very important role. Poor grammar, unclear sentence and wrong punctuations can create misunderstanding during interviews, emails and team discussions. For example writing “I did completed the task yesterday.” shows lack of language clarity even if the work was actually done perfectly. Such mistake gives negative impression.

Moreover style of writing is equally important. Using very informal language in professional environment looks unprofessional, while overly complex words can make message hard to understand. A good writing style should be simple, clear and direct but many people write long sentences without proper commas or full stop which makes reading difficult and boring. Readers loose interest quickly if content is not structured properly.

Spelling mistake is another common problem. Words like definately, enviroment, seperately are often written incorrect. These small errors may look minor but they reduce the overall quality of content. In exams, reports or official document such spelling errors can cost marks or credibility. Still many people rely only on auto correct which is not always accurate.

In conclusion learning is not only about gaining technical knowledge but also about improving communication, discipline and mindset. Without proper guidance and attention to details like grammar, spelling and writing style progress become slow and ineffective. To grow professionally one must focus on structured learning, regular practice and clear expression of ideas, otherwise opportunities may be missed even after having good skills.`,
  "creative"
);
