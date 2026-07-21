// const express = require("express"); // CommonJS
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();
console.log("CLIENT_URL =", process.env.CLIENT_URL);
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json({ limit: "5mb" }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Start Server
server.listen(PORT, () => {
  connectDB();
  console.log(`App is listening on port ${PORT}`);
});