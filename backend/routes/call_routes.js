const { createMeeting } = require("../controller/call_controller");

const callRouter = require("express").Router();

callRouter.post("create-meeting", createMeeting);

module.exports = callRouter;
