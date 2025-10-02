import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRoutes from  './routes/auth.route.js'
import { connectDb } from './lib/db.js'
import cookieParser from 'cookie-parser';
import messageRoutes from './routes/message.route.js'
import {app,server,io} from "./lib/socket.js"
import path from "path"


dotenv.config();

const PORT = process.env.PORT || 5001;
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

const __dirname = path.resolve();

app.use(cors({
    origin: "https://realtime-chat-application-delta.vercel.app",
    credentials: true
  }));



app.use("/api/auth" , authRoutes);
app.use("/api/message", messageRoutes);



server.listen(PORT , ()=>{
    console.log("Server started at 5000")
    connectDb();

})