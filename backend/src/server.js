//const express=require('express'); common js
import express from 'express' //ES module
import dotenv from "dotenv"
import path from "path"
import cookieParser from "cookie-parser";
import cors from "cors"
import {connectDB}  from './lib/db.js'
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import { app, server } from "./lib/socket.js";
const __dirname=path.resolve();
dotenv.config();
const PORT=process.env.PORT||3000;
app.use(cookieParser()); 
app.use(cors({
  origin: process.env.CLIENT_URL || "*",
  credentials: true
}));
app.use(express.json({limit:"5mb"}));//It is used get the fields that are entered in the frontend (body)

app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)
//make ready to deployment 
if(process.env.NODE_ENV=="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))
    
    app.get("*",(_,res)=>{
        res.sendFile(path.join(__dirname,"../frontend/dist/index.html"))
    })
}

server.listen(PORT,()=>{
    connectDB();
    console.log(`app is listening on the port ${PORT}`)})