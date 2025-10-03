const GeminiService = require('../ChatBot/services/geminiService');
const moderationService = require('../ChatBot/services/moderationService');

const aiController = {
    async chatWithAI(req, res) {
        try {
            const { message, sessionType = 'general', userId } = req.body;

            const moderation = await moderationService.moderateText(message);
            if (!moderation.allowed) {
                return res.status(400).json({
                    success: false,
                    error: 'Message blocked by content moderation',
                    details: moderation
                });
            }

            const gemini = new GeminiService();
            const context = `You are a helpful AI tutor in a ${sessionType} session on SkillSync. 
      Be educational, supportive, and constructive. Keep responses concise.`;

            const response = await gemini.generateResponse(message, context);

            res.json({
                success: true,
                response: response,
                moderation: moderation,
                timestamp: new Date().toISOString()
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'AI service unavailable: ' + error.message
            });
        }
    },

    async checkGrammar(req, res) {
        try {
            const { text } = req.body;

            const moderation = await moderationService.moderateText(text);
            if (!moderation.allowed) {
                return res.status(400).json({
                    success: false,
                    error: 'Text blocked by content moderation'
                });
            }

            const gemini = new GeminiService();
            const feedback = await gemini.provideGrammarFeedback(text);

            res.json({
                success: true,
                originalText: text,
                feedback: feedback,
                moderation: moderation
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Grammar check failed: ' + error.message
            });
        }
    },

    async pronunciationFeedback(req, res) {
        try {
            const { audioText } = req.body;

            const gemini = new GeminiService();
            const feedback = await gemini.providePronunciationFeedback(audioText);

            res.json({
                success: true,
                originalAudioText: audioText,
                feedback: feedback
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Pronunciation analysis failed: ' + error.message
            });
        }
    },

    async moderateContent(req, res) {
        try {
            const { text, fileData, fileType } = req.body;
            let moderationResult;

            if (text) {
                moderationResult = await moderationService.moderateText(text);
            } else if (fileData) {
                moderationResult = await moderationService.moderateFileContent(fileData, fileType);
            } else {
                return res.status(400).json({
                    success: false,
                    error: 'No content provided for moderation'
                });
            }

            res.json({
                success: true,
                ...moderationResult
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Content moderation failed: ' + error.message
            });
        }
    }
};

module.exports = aiController;