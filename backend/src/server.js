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
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true
  }));
  

app.use("/api/auth" , authRoutes);
app.use("/api/message", messageRoutes);

app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});


server.listen(PORT , ()=>{
    console.log("Server started at 5000")
    connectDb();

})