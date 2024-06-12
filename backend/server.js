"use strict";

const http = require("http");
const socketIo = require("socket.io");
const app = require("./app");
const { PORT } = require("./config");
const Message = require("./models/message"); // Ensure Message model is imported

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});


io.on("connection", (socket) => {
  console.log("A user connected");

  // Join the user to a room
  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  // Listen for sendMessage event
  socket.on("sendMessage", async (msgData) => {
    try {
      const message = await Message.create(msgData);
      io.to(msgData.roomId).emit("receiveMessage", message);
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(PORT, function () {
  console.log(`Started on http://localhost:${PORT}`);
});
