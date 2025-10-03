const { GoogleGenerativeAI } = require('@google/generative-ai');

const aiConfig = {
    gemini: {
        apiKey: process.env.GEMINI_API_KEY,
        genAI: new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    },
    moderation: {
        apiKey: process.env.PERSPECTIVE_API_KEY,
        apiUrl: 'https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze'
    }
};

module.exports = aiConfig;