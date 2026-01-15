const Groq = require("groq-sdk");
const {
  grammer_checker_function,
  quiz_generator,
  AiCode_review,
  quiz_checker,
} = require("../utils/ai-functions");
const QuizResult = require("../schemas/quizResultSchema");
const Quiz = require("../schemas/quizSchema");

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
    // reviewMode
    const completion = await AiCode_review(
      req?.body?.allMessages,
      req?.body?.reviewMode
    );

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
    console.log(completion.choices[0].message);
    return res.send({ success: true, message: completion.choices[0].message });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
};

const generate_quiz = async (req, res) => {
  try {
    const completion = await quiz_generator(
      req?.body?.difficulty,
      req?.body?.quizRequirements,
      req?.body?.total_questions
    );

    return res.send({
      success: true,
      message: JSON.parse(completion.choices[0].message.content),
    });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
};

const check_quiz = async (req, res) => {
  try {
    const { studentAnswers, quiz, quizId, userId, time } = req.body;
    const completion = await quiz_checker(quiz, studentAnswers);
    const {
      passed,
      totalScore,
      percentage,
      totalQuestions,
      correctAnswers,
      questionAnswerExplanations,
    } = JSON.parse(completion.choices[0].message.content);

    const quizResult = new QuizResult({
      quizId,
      userId,
      passed,
      totalScore,
      percentage,
      totalQuestions,
      correctAnswers,
      questionAnswerExplanations,
      time: {
        timeLeft: time?.timeLeft,
        totalQuizTime: time?.totalQuizTime,
      },
      timeTaken: time?.totalQuizTime - time?.timeLeft,
    });

    await quizResult.save();

    const quizDetails = await Quiz.findOne({ _id: quizId });

    const result = quizResult;

    return res.send({
      success: true,
      message: "Quiz check and saved!",
      result: {
        ...result.toObject(),
        quizDetails: quizDetails,
      },
    });

    // const
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
};

module.exports = {
  personalized_chat,
  code_review,
  grammer_checker,
  generate_quiz,
  check_quiz,
};
