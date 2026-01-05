const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const User = require("./schemas/userSchema");

let io;

const socketIdToUserId = new Map();
const userIdToSocketId = new Map();

let joindedUsers = [];

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`user joined with: ${socket.id} socket id`);

    socket.on("join-room", ({ roomId, userId }) => {
      socket.join(roomId);
      socket.data.roomId = roomId;
      if (!userIdToSocketId.has(userId) || !socketIdToUserId.has(socket.id)) {
        userIdToSocketId.set(userId, socket.id);
        socketIdToUserId.set(socket.id, userId);

        if (!joindedUsers.find((usr) => usr.userId == userId)) {
          joindedUsers = [
            ...joindedUsers,
            { socketId: socket.id, userId: userId },
          ];
        }
      }
      io.to(roomId).emit("joinded-users", joindedUsers);

      // this is only for admin of session
      // admin of session listen this and send code editor value and all messages
      io.to(roomId).emit("single-user-added", {
        userId,
        roomId,
        userSocketId: socket.id,
      });
    });

    socket.on(
      "all-chat-message-and-code",
      ({ codeEditorCurrentValue, allLiveChatMessages, roomId }) => {
        console.log("all-chat-message-and-code", roomId);
        socket.broadcast.to(roomId).emit("all-chat-message-and-code", {
          codeEditorCurrentValue: codeEditorCurrentValue || "",
          allLiveChatMessages: allLiveChatMessages || "",
          roomId,
        });
      }
    );

    // when change in code editor
    socket.on("editor-code-change", ({ newVal, roomId }) => {
      console.log(newVal, roomId);
      socket.broadcast.to(roomId).emit("editor-code-change", newVal);
    });

    // when change in exceildraw
    socket.on("update-exceil-change", ({ roomId, elements }) => {
      console.log(elements, roomId);
      socket.broadcast.to(roomId).emit("update-exceil-change", elements);
    });

    // emit to all users of session to notify that session is ended | this emit only come from host of the session
    socket.on("session-ended", ({ roomId, session_id }) => {
      socket.broadcast.to(roomId).emit("session-ended", { roomId, session_id });
    });

    // handle kick users
    socket.on("kick-user", (userId) => {
      console.log(userId, "kick");
      const socketId = userIdToSocketId.get(userId);

      let newJoindedUsers = joindedUsers.filter(
        (usr) => usr.socketId != socket.id
      );
      joindedUsers = [...newJoindedUsers];

      socketIdToUserId.delete(socketId);
      userIdToSocketId.delete(userId);

      socket
        .to(socketId)
        .emit("kick-user", { message: "you are kicked by host" });
      io.to(socket.data.roomId).emit("joinded-users", joindedUsers);
    });

    // handle live chat messages
    socket.on("live-chat-message", async ({ senderId, message }) => {
      const userData = await User.findById(senderId).select("-password");
      socket.broadcast
        .to(socket.data.roomId)
        .emit("live-chat-message", { senderData: userData, message: message });
    });

    socket.on("disconnect", () => {
      console.log(`user disconnected: ${socket.id}`);
      const userId = socketIdToUserId.get(socket.id);
      socketIdToUserId.delete(socket.id);
      userIdToSocketId.delete(userId);
      let newJoindedUsers = joindedUsers.filter(
        (usr) => usr.socketId != socket.id
      );
      joindedUsers = [...newJoindedUsers];

      io.to(socket.data.roomId).emit("joinded-users", joindedUsers);
    });
  });

  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};
module.exports = { initializeSocket, getIO };
