const express = require("express");
const {
  createSession,
  getAllSessions,
  joinSession,
  endSession,
  getSessionById,
  addFeedback
} = require("../controller/SessionController");

const sessionRoutes = express.Router();

sessionRoutes.post("/create", createSession);
sessionRoutes.get("/get-all", getAllSessions);
sessionRoutes.get("/:roomId", getSessionById);
sessionRoutes.post("/:roomId/join", joinSession);
sessionRoutes.post("/:roomId/end", endSession);
sessionRoutes.post("/:roomId/add-feedback",addFeedback)

module.exports = { sessionRoutes };
