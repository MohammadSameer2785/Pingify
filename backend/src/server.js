//const express=require('express'); common js
import express from 'express' //ES module
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js"
const app=express();
dotenv.config();
const PORT=process.env.PORT||3000;
app.use("/api/auth",authRoutes)
app.listen(PORT,()=>{console.log(`app is listening on the port ${PORT}`)})