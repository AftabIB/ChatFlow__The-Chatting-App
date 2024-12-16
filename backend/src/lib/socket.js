import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

// socket.io server
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"], // Replace with your client origin
  },
});

//helper function to get the receriver id
export function getreceiverSocketId(userId) {
  return userSocketMap[userId]
}


//see that which user is currently online or offline
//used to store the online users
const userSocketMap = {}; //{ (key) => userId: (value) => sockeId};

// Listen for incoming connections
io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  //ppdate in userSocketMap that user is online
  const userId = socket.handshake.query.userId;

  //we have got the userid which is currently connected and got the id from useAuthStore
  if (userId) userSocketMap[userId] = socket.id; //update or add the user which is online

  //broadcast the rest all users about currrent state(online or offline)
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Listen for disconnect event
  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    //delete the user from map which is not online
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
