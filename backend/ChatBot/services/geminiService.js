const { GoogleGenerativeAI } = require('@google/generative-ai');

class GeminiService {
    constructor() {
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            throw new Error('GEMINI_API_KEY is not set in environment variables');
        }

        try {
            this.genAI = new GoogleGenerativeAI(apiKey);
            this.model = this.genAI.getGenerativeModel({
                model: "gemini-2.5-flash"
            });
            console.log('✅ Personalized Gemini AI service initialized');
        } catch (error) {
            console.error('❌ Failed to initialize Gemini AI:', error.message);
            throw error;
        }
    }

    async generateResponse(prompt, context = '') {
        try {
            const fullPrompt = context ? `${context}\n\n${prompt}` : prompt;

            const result = await this.model.generateContent(fullPrompt);
            const response = await result.response;
            const text = response.text();

            return text;
        } catch (error) {
            console.error('❌ Gemini API Error:', error.message);
            throw error;
        }
    }

    // Add method for chat with history
    async generateResponseWithHistory(prompt, context = '', history = []) {
        try {
            let fullPrompt = context;

            // Add conversation history if provided
            if (history.length > 0) {
                fullPrompt += '\n\nPrevious conversation:\n';
                history.forEach(entry => {
                    fullPrompt += `${entry.role}: ${entry.content}\n`;
                });
            }

            fullPrompt += `\n\nCurrent message: ${prompt}`;

            const result = await this.model.generateContent(fullPrompt);
            const response = await result.response;
            const text = response.text();

            return text;
        } catch (error) {
            console.error('❌ Gemini API Error:', error.message);
            throw error;
        }
    }

    // ... rest of your existing methods
}

module.exports = GeminiService;