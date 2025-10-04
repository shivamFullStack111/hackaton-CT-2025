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
}

module.exports = GeminiService;