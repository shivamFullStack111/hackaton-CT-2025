const { GoogleGenerativeAI } = require('@google/generative-ai');

class GeminiService {
    constructor() {
        const apiKey = process.env.GEMINI_API_KEY;

        console.log('🔑 Initializing Gemini with key:', apiKey ? apiKey.substring(0, 10) + '...' : 'MISSING');

        if (!apiKey) {
            throw new Error('GEMINI_API_KEY is not set in environment variables');
        }

        try {
            this.genAI = new GoogleGenerativeAI(apiKey);
            this.model = this.genAI.getGenerativeModel({
                model: "gemini-2.5-flash"
            });
            console.log('✅ Gemini AI service initialized with model: gemini-2.5-flash');
        } catch (error) {
            console.error('❌ Failed to initialize Gemini AI:', error.message);
            throw error;
        }
    }

    async generateResponse(prompt, context = '') {
        try {
            const fullPrompt = context ? `${context}\n\n${prompt}` : prompt;

            console.log('🤖 Sending to Gemini...');
            const result = await this.model.generateContent(fullPrompt);
            const response = await result.response;
            const text = response.text();

            console.log('✅ Gemini response received');
            return text;
        } catch (error) {
            console.error('❌ Gemini API Error:', error.message);
            throw error;
        }
    }

    async provideGrammarFeedback(text) {
        const prompt = `You are an English tutor. Analyze this text for grammatical errors and provide corrections in this format:

ORIGINAL: [user's text]
CORRECTED: [corrected version]
ERRORS: [list of specific errors found]
SUGGESTIONS: [tips for improvement]

Text to analyze: "${text}"`;

        return await this.generateResponse(prompt);
    }

    async providePronunciationFeedback(spokenText) {
        const prompt = `You are a pronunciation coach. Analyze this spoken text for pronunciation issues and provide feedback in this format:

SPOKEN TEXT: [user's text]
PRONUNCIATION SCORE: [1-10 rating]
COMMON MISTAKES: [specific pronunciation issues]
PRACTICE TIPS: [suggestions for improvement]

Text to analyze: "${spokenText}"`;

        return await this.generateResponse(prompt);
    }

    async correctText(text) {
        const prompt = `Correct any spelling or grammar errors in this text and return ONLY the corrected version without any explanations: "${text}"`;
        return await this.generateResponse(prompt);
    }

    async provideTutoringHelp(question, subject = 'general') {
        const context = `You are a ${subject} tutor in the SkillSync platform. Provide helpful, educational, and encouraging responses to help students learn. Keep explanations clear and concise.`;

        return await this.generateResponse(question, context);
    }

    async explainConcept(concept, level = 'beginner') {
        const prompt = `Explain this concept to a ${level} learner in simple terms: "${concept}"`;
        return await this.generateResponse(prompt);
    }
}

module.exports = GeminiService;