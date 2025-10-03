const geminiService = require('./geminiService');
const moderationService = require('./moderationService');

class SocketAIService {
    constructor(io) {
        this.io = io;
    }

    initializeAIHandlers(socket) {
        socket.on('sendMessage', async (data) => {
            const moderation = await moderationService.moderateText(data.message);

            if (!moderation.allowed) {
                socket.emit('messageBlocked', {
                    reason: 'Content violates community guidelines'
                });
                return;
            }

            if (data.aiCorrectionEnabled) {
                const corrected = await this.correctText(data.message);
                data.correctedMessage = corrected;
            }

            socket.to(data.roomId).emit('newMessage', data);
        });

        socket.on('requestAIHelp', async (data) => {
            const helpResponse = await geminiService.generateResponse(
                data.question,
                'Provide brief, helpful educational assistance'
            );

            socket.emit('aiHelpResponse', {
                question: data.question,
                response: helpResponse
            });
        });
    }

    async correctText(text) {
        try {
            const prompt = `Correct any spelling or grammar errors in this text and return only the corrected version: "${text}"`;
            const corrected = await geminiService.generateResponse(prompt);
            return corrected;
        } catch (error) {
            return text;
        }
    }
}

module.exports = SocketAIService;