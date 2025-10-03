const axios = require('axios');

class ContentModerationService {
    constructor() {
        this.apiKey = process.env.PERSPECTIVE_API_KEY;
        this.apiUrl = 'https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze';
    }

    async moderateText(text) {
        try {
            const requestBody = {
                comment: { text: text },
                requestedAttributes: {
                    TOXICITY: {},
                    SEVERE_TOXICITY: {},
                    IDENTITY_ATTACK: {},
                    INSULT: {},
                    PROFANITY: {},
                    THREAT: {}
                },
                languages: ['en']
            };

            const response = await axios.post(
                `${this.apiUrl}?key=${this.apiKey}`,
                requestBody
            );

            const scores = response.data.attributeScores;
            const isToxic = this.isContentToxic(scores);

            return {
                isToxic,
                scores: this.formatScores(scores),
                allowed: !isToxic,
                message: isToxic ? 'Content blocked for violating community guidelines' : 'Content approved'
            };
        } catch (error) {
            console.error('Moderation API Error:', error.message);
            // Fallback: allow content if moderation fails
            return {
                isToxic: false,
                allowed: true,
                error: true,
                message: 'Moderation service unavailable - content allowed'
            };
        }
    }

    isContentToxic(scores) {
        const thresholds = {
            TOXICITY: 0.7,
            SEVERE_TOXICITY: 0.8,
            IDENTITY_ATTACK: 0.7,
            INSULT: 0.7,
            PROFANITY: 0.8,
            THREAT: 0.8
        };

        for (const [attribute, score] of Object.entries(scores)) {
            if (score.summaryScore.value > thresholds[attribute]) {
                return true;
            }
        }
        return false;
    }

    formatScores(scores) {
        const formatted = {};
        for (const [attribute, data] of Object.entries(scores)) {
            formatted[attribute] = Math.round(data.summaryScore.value * 100) + '%';
        }
        return formatted;
    }

    // For file content moderation (basic implementation)
    async moderateFileContent(fileData, fileType) {
        // This is a basic implementation
        // For production, you might want to use additional services
        return {
            allowed: true,
            needsReview: false,
            message: 'File content approved'
        };
    }
}

module.exports = new ContentModerationService();