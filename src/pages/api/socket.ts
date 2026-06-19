import { Server } from "socket.io";

export default function handler(req: any, res: any) {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server, {
      path: "/api/socket",
    });

    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("connected:", socket.id);

      socket.on("join-room", (roomId) => {
        socket.join(roomId);
      });

      socket.on("send-message", (data) => {
        io.to(data.roomId).emit("new-message", data);
      });
    });
  }

  res.end();
}