
const Groq = require("groq-sdk")

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });



const personalized_chat = async (req, res) => {

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

`
            },
            ...req?.body?.allMessages
        ],

    });

    console.log(completion.choices[0], req?.body?.profile)
    return res.send({ success: true, message: completion.choices[0].message })
}

module.exports = {
    personalized_chat
}