const GeminiService = require('../ChatBot/services/geminiService');
const moderationService = require('../ChatBot/services/moderationService');

const gemini = new GeminiService();

// Store user profiles (in production, use a database)
const userProfiles = new Map();

exports.initializeUserProfile = async (req, res) => {
    try {
        const {
            userId,
            fullName,
            age,
            currentlyPursuing,
            careerInterest,
            strongSubjects,
            areasOfImprovement,
            learningPreferences,
            weeklyStudyTime
        } = req.body;

        // Create personalized context
        const userProfile = {
            fullName,
            age,
            currentlyPursuing,
            careerInterest,
            strongSubjects: Array.isArray(strongSubjects) ? strongSubjects : [strongSubjects],
            areasOfImprovement: Array.isArray(areasOfImprovement) ? areasOfImprovement : [areasOfImprovement],
            learningPreferences: Array.isArray(learningPreferences) ? learningPreferences : [learningPreferences],
            weeklyStudyTime,
            joinedAt: new Date()
        };

        // Store profile (in production, save to database)
        userProfiles.set(userId, userProfile);

        // Generate personalized welcome message
        const welcomePrompt = `
Create a warm, personalized welcome message for a new student starting their learning journey.

Student Information:
- Name: ${userProfile.fullName}
- Age: ${userProfile.age}
- Studying: ${userProfile.currentlyPursuing}
- Career Goal: ${userProfile.careerInterest}
- Strong in: ${userProfile.strongSubjects.join(', ')}
- Wants to improve: ${userProfile.areasOfImprovement.join(', ')}
- Learns best through: ${userProfile.learningPreferences.join(', ')}
- Available study time: ${userProfile.weeklyStudyTime}

Create a welcoming message that:
1. Greets them personally
2. Acknowledges their career goals
3. Mentions how you'll leverage their strengths
4. Shows understanding of areas they want to improve
5. Adapts to their learning preferences
6. Sets positive expectations

Keep it warm, encouraging, and 2-3 paragraphs maximum.
`;

        const welcomeMessage = await gemini.generateResponse(welcomePrompt, "");

        res.json({
            success: true,
            message: "Profile initialized successfully",
            welcomeMessage,
            profile: userProfile
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.chatWithAI = async (req, res) => {
    try {
        const { message, userId, context } = req.body;

        let personalizedContext = context || '';

        // Add personalization if userId is provided
        if (userId) {
            const userProfile = userProfiles.get(userId);
            if (userProfile) {
                personalizedContext = `
You are "EduMate", a personalized AI learning assistant for ${userProfile.fullName}.

STUDENT PROFILE:
- Age: ${userProfile.age}
- Currently pursuing: ${userProfile.currentlyPursuing}
- Career goal: ${userProfile.careerInterest}
- Strong subjects: ${userProfile.strongSubjects.join(', ')}
- Areas needing improvement: ${userProfile.areasOfImprovement.join(', ')}
- Learning preferences: ${userProfile.learningPreferences.join(', ')}
- Weekly study time: ${userProfile.weeklyStudyTime}

PERSONALIZATION GUIDELINES:
1. Connect concepts to ${userProfile.careerInterest} career path
2. Build on strong subjects (${userProfile.strongSubjects.join(', ')})
3. Provide extra support in weak areas (${userProfile.areasOfImprovement.join(', ')})
4. Use ${userProfile.learningPreferences.join(' and ')} approaches
5. Respect time constraints (${userProfile.weeklyStudyTime} weekly)
6. Be encouraging and adapt to ${userProfile.age}-year-old understanding

RESPONSE STYLE:
- Educational but conversational
- Personalized to ${userProfile.fullName}'s goals
- Practical and project-oriented
- Break down complex topics
- Suggest relevant learning resources
- Connect to real-world applications

Always maintain a supportive, mentor-like tone while being professional.

Current question: ${message}
`;
            }
        }

        const reply = await gemini.generateResponse(message, personalizedContext);

        res.json({
            success: true,
            reply,
            personalized: !!userId,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const profile = userProfiles.get(userId);

        if (!profile) {
            return res.status(404).json({
                success: false,
                error: "User profile not found"
            });
        }

        res.json({
            success: true,
            userId,
            profile
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.updateUserProfile = async (req, res) => {
    try {
        const { userId, updates } = req.body;
        const existingProfile = userProfiles.get(userId);

        if (!existingProfile) {
            return res.status(404).json({
                success: false,
                error: "User profile not found"
            });
        }

        // Merge updates
        const updatedProfile = { ...existingProfile, ...updates, updatedAt: new Date() };
        userProfiles.set(userId, updatedProfile);

        res.json({
            success: true,
            message: "Profile updated successfully",
            profile: updatedProfile
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.checkGrammar = async (req, res) => {
    try {
        const { text, userId } = req.body;

        let prompt = `Please check the grammar and provide corrections for this text: "${text}"\n\nProvide the response in this format:\nORIGINAL: [original text]\nCORRECTED: [corrected version]\nEXPLANATION: [brief explanation of corrections]`;

        // Add personalization if userId is provided
        if (userId) {
            const userProfile = userProfiles.get(userId);
            if (userProfile) {
                prompt += `\n\nNote: This user is studying ${userProfile.currentlyPursuing} and interested in ${userProfile.careerInterest}. Please provide examples relevant to their field.`;
            }
        }

        const feedback = await gemini.generateResponse(prompt, "");

        res.json({
            success: true,
            originalText: text,
            feedback: feedback,
            personalized: !!userId
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.pronunciationFeedback = async (req, res) => {
    try {
        const { audioText, userId } = req.body;

        let prompt = `Provide pronunciation feedback for this spoken text: "${audioText}"\n\nPlease analyze and provide feedback in this format:\nSPOKEN TEXT: [the text]\nPRONUNCIATION SCORE: [1-10 rating]\nCOMMON MISTAKES: [specific pronunciation issues]\nPRACTICE TIPS: [suggestions for improvement]`;

        // Add personalization if userId is provided
        if (userId) {
            const userProfile = userProfiles.get(userId);
            if (userProfile) {
                prompt += `\n\nNote: This user is a ${userProfile.age}-year-old ${userProfile.currentlyPursuing} student. Adjust the feedback complexity accordingly.`;
            }
        }

        const feedback = await gemini.generateResponse(prompt, "");

        res.json({
            success: true,
            originalAudioText: audioText,
            feedback: feedback,
            personalized: !!userId
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.moderateContent = async (req, res) => {
    try {
        const { text } = req.body;
        const result = await moderationService.moderateText(text);

        res.json({
            success: true,
            ...result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};