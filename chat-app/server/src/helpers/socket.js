let io;
const socket = {
  init: (httpServer) => {
    const initSocket = require("socket.io");
    // console.log(initSocket);
    io = initSocket(httpServer, {
      cors: {
        origin: "*",
      },
    });
    // console.log(io);
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error("Socket.io not initialized!");
    }
    return io;
  },
};
module.exports = { socket };
