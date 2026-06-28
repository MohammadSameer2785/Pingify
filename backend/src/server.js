//const express=require('express'); common js
import express from 'express' //ES module
import dotenv from "dotenv"
import path from "path"
import {connectDB}  from './lib/db.js'

import authRoutes from "./routes/auth.route.js"
const app=express();
const __dirname=path.resolve();
dotenv.config();
const PORT=process.env.PORT||3000;

app.use(express.json());//It is used get the fiedl that are entered in the fronend (body)

app.use("/api/auth",authRoutes)
app.use("/auth/messages",messsageRoutes)
//make ready to deployment 
if(process.env.NODE_ENV=="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))
    
    app.get("*",(_,res)=>{
        res.sendFile(path.join(__dirname,"../frontend/dist/index.html"))
    })
}

app.listen(PORT,()=>{
    connectDB();
    console.log(`app is listening on the port ${PORT}`)})