


const Session = require("../schemas/sessionSchema")
const bcrypt = require("bcrypt")

const createSession = async (req, res) => {
    try {
        const session = await Session.create({
            ...req.body,
            createdBy: req.body?.userId,    // this will change after with req.user.id which is come from middleware
        });
        res.status(201).json({ success: true, session });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getAllSessions = async (req, res) => {
    try {
        const filter = {};
        if (req.query.gradeLevel) filter["sessionInfo.gradeLevel"] = req.query.gradeLevel;
        if (req.query.subject) filter["sessionInfo.subject"] = req.query.subject;
        if (req.body?.ended == true || req.body?.ended == false) filter["ended"] = req.body?.ended;

        const sessions = await Session.find(filter).sort({ createdAt: -1 });
        res.json(sessions);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getSessionById = async (req, res) => {
    try {
        const session = await Session.findOne({ roomId: req.params.roomId });
        if (!session) return res.status(404).json({ success: false, message: "Session not found" });
        res.json(session);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const joinSession = async (req, res) => {
    try {
        const { userId, password } = req.body;
        const session = await Session.findOne({ roomId: req.params.roomId });
        if (!session) return res.status(404).json({ success: false, message: "Session not found" });

        if (session.privacySetting?.isPrivate) {
            const isMatch = await bcrypt.compare(password, session.privacySetting.password);
            if (!isMatch) {
                return res.status(403).json({ success: false, message: "Invalid password" });
            }
        }

        // add participant if not already present
        if (!session.participants.some((p) => p.userId.toString() === userId)) {
            session.participants.push({ userId });
            await session.save();
        }

        res.json({ success: true, message: "Joined session successfully", session });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const endSession = async (req, res) => {
    try {
        const session = await Session.findOneAndUpdate(
            { roomId: req.params.roomId },
            { $set: { ended: true } },
            { new: true }
        );
        if (!session) return res.status(404).json({ success: false, message: "Session not found" });
        res.json({ success: true, message: "Session ended successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


module.exports = {
    createSession,
    getAllSessions,
    getSessionById,
    endSession,
    joinSession
}