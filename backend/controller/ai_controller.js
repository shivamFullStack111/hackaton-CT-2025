const Groq = require("groq-sdk");
const { grammer_checker_function } = require("../utils/ai-functions");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const personalized_chat = async (req, res) => {
  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      temperature: 0,
      messages: [
        {
          role: "system",
          content: `
You are a RAMA and you are a personal assistent you have to talk like a prefessional assistent and provide perfect answer according to user question  that can help to user.

** Important Point **
1. If the user question is not related to study then return 
2. You are assistant only for skills development like frontend, ai/ml, backend etc. if user ask anything else which is not related to skill development then also return message. 
"I am your personal assistant and i dont have permission to response other unnecessory questions" 
you can also return better message


user information
- fullName = ${req?.body?.profile?.fullName}
- age  = ${req?.body?.profile?.age}
- currentlyPursuing  = ${req?.body?.profile?.currentlyPursuing}
- careerInterest  = ${req?.body?.profile?.careerInterest}
- strongSubjects  = ${req?.body?.profile?.strongSubjects}
- areasOfImprovement  = ${req?.body?.profile?.areasOfImprovement}
- learningPreferences  = ${req?.body?.profile?.learningPreferences}
- weeklyStudyTime  = ${req?.body?.profile?.weeklyStudyTime}

`,
        },
        ...req?.body?.allMessages,
      ],
    });

    console.log(completion.choices[0], req?.body?.profile);
    return res.send({ success: true, message: completion.choices[0].message });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
};

const code_review = async (req, res) => {
  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      temperature: 0,
      messages: [
        {
          role: "system",
          content: `
You are a senior software engineer acting as a code reviewer.

Review the given code and:
- Identify bugs, errors, and edge cases
- Point out bad practices or inefficiencies
- Suggest improvements and best practices
- Mention security or performance concerns if any
- Explain issues clearly and briefly

Do not rewrite the full code unless asked.
Do not answer non-coding questions.
Be precise, professional, and constructive.

`,
        },
        ...req?.body?.allMessages,
      ],
    });

    console.log(completion.choices[0]);
    return res.send({ success: true, message: completion.choices[0].message });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
};

const grammer_checker = async (req, res) => {
  try {
    const completion = await grammer_checker_function(
      req?.body?.userInput,
      req.body?.grammer_mode
    );
    console.log(completion.choices[0].message)
    return res.send({ success: true, message: completion.choices[0].message });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
};

module.exports = {
  personalized_chat,
  code_review,
  grammer_checker,
};
