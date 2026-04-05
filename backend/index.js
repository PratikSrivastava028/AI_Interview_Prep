//! create an express server and check if it's working

import "dotenv/config";
import express from "express";
import cors from "cors"; // cross origin resource sharing (browser blocks the request which comes from anywhere but localhost:8000)
// 1) we are importing express module which we installed using npm i

import userRoutes from "./routes/auth-route.js";
import sessionRoutes from "./routes/session-route.js";
import aiRoutes from "./routes/ai-route.js";
import { connectDB } from "./config/database-config.js";

// Connect to MongoDB
connectDB();

// 2) call/invoke the function
let app = express(); // object = {listen}

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.urlencoded({ extended: true }));// this 
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/ai", aiRoutes);

app.listen(3000, () => {
  console.log("Server Started.....");
});

