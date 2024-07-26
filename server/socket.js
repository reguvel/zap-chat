import { Server as SocketIoServer } from "socket.io";
import Message from "./models/MessagesModel.js";

const setupSocket=(server)=>{
    const io = new SocketIoServer(server, {
        cors: {
          origin: process.env.ORIGIN,
          methods: ["GET", "POST"],
          credentials: true,
        },
      });
      const userSocketMap = new Map();

      const disconnect = (socket) => {
        console.log(`Client Disconnected: ${socket.id}`);
        for (const [userId, socketId] of userSocketMap.entries()) {
          if (socketId === socket.id) {
            userSocketMap.delete(userId);
            break;
          }
        }
      };
    
      const sendMessage = async (message) => {
        const senderSocketId = userSocketMap.get(message.sender);
        const recipientSocketId = userSocketMap.get(message.recipient);
    
        const createdMessage = await Message.create(message);
    
        const messageData = await Message.findById(createdMessage._id)
          .populate("sender", "id email firstName lastName image color")
          .populate("recipient", "id email firstName lastName image color");
    
        if (recipientSocketId) {
          io.to(recipientSocketId).emit("receiveMessage", messageData);
        }
    
        if (senderSocketId) {
          io.to(senderSocketId).emit("receiveMessage", messageData);
        }
      };
    
      io.on("connection", (socket) => {
        console.log("New client connected");
    
        const userId = socket.handshake.query.userId;
    
        if (userId) {
          userSocketMap.set(userId, socket.id);
          console.log(`User connected: ${userId} with socket ID: ${socket.id}`);
        } else {
          console.log("User Id is not provided during connection.");
        }
    
        socket.on("sendMessage", sendMessage);
        socket.on("disconnect", () => disconnect(socket));
    
        // socket.on("error", (error) => {
        //   console.error("Socket Error:", error);
        // });
    
        // socket.on("connect_error", (error) => {
        //   console.error("Connect Error:", error);
        // });
    
        // socket.on("reconnect_attempt", (attemptNumber) => {
        //   console.log("Reconnect Attempt:", attemptNumber);
        // });
    
        // socket.on("reconnect", (attemptNumber) => {
        //   console.log("Reconnected:", attemptNumber);
        // });
      });
    };
    
    export default setupSocket;