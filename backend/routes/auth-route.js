import express from "express";

import { loginUser, registerUser, getMe } from "../controller/auth-controller.js";
import { protect } from "../middlewares/auth-middleware.js";

const router = express.Router();

// Auth Routes
router.post("/signup", registerUser); // Register User

router.post("/login", loginUser); // Login User

router.get("/me", protect, getMe); // Get Current User

export default router;
