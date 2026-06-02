



const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on("user-message", (message) => {
    io.emit("message", {
      text: message,
      senderId: socket.id,
    });
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);
  });
});

app.use(express.static(path.join(__dirname, "public")));

server.listen(5000, () => {
  console.log("Server Started at PORT: 5000");
});