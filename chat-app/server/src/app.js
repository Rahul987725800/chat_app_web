require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { socket } = require("./helpers/socket");

const app = express();
app.use(cors());
app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});
const PORT = process.env.PORT || 4000;
mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
    const server = app.listen(PORT);
    const io = socket.init(server);
    io.on("connection", (socket) => {
      // console.log('Client connected with id ' + socket.id);
      socket.on("send-message", (message, roomId, sender) => {
        // console.log(message, room);
        if (roomId && sender) {
          socket.broadcast.to(roomId).emit("receive-message", message, sender);
          createMessage(roomId, sender.id, message);
        }
      });
      socket.on("join-room", (roomId, joinerId) => {
        socket.join(roomId);

        if (joinerId) {
          socket.broadcast.to(roomId).emit("member-joined-chat", joinerId);
        }
      });
    });
  })
  .then(() => {
    console.log(`Server running at PORT: ${PORT}`);
  })
  .catch((err) => {
    console.log(err);
  });
