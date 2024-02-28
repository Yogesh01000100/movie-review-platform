import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { signup, login } from "../controllers/authController.js";
import { getMe } from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/getme", verifyToken, getMe);

export default router;