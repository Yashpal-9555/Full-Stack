import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import http from 'http';

import { connectDB } from "./config/db.js";
import userRouter from './routes/userRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import { protectRoute } from './middleware/auth.js';
import { Server } from 'socket.io';


const PORT = process.env.PORT || 5000;

const app = express();
const httpServer = http.createServer(app);

// Socket.io setup
export const io = new Server(httpServer, {
    cors: { origin: '*' }
});

// Store online users

export const UserScoketMap = {};

//Socket.io connection handler

io.on("connection", (socket)=>{
    const userId = socket.handshake.query.userId;
    console.log(`User connected: ${userId}`);

    if(userId){
        UserScoketMap[userId] = socket.id;
    }

// Emit online users to all connected clients
    io.emit("getOnlineUsers", Object.keys(UserScoketMap));
    socket.on("disconnect", ()=>{
        console.log(`User disconnected: ${userId}`);
        delete UserScoketMap[userId];
        io.emit("getOnlineUsers", Object.keys(UserScoketMap));
    })

})


// Middleware Setup
app.use(express.json({limit: "4mb"}))
app.use(cors());


// Route setup
app.use('/api/status', (req, res)=>(
    res.send("Hello server")
));

app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

connectDB();

httpServer.listen(PORT, () => {
    console.log(`server live at ${PORT}`);
});
