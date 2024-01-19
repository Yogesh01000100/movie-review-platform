import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { signup, login } from "../controllers/authController.js";
import { getMe, getReview, createReview } from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/getme", verifyToken, getMe);
router.get("/getreview/:movieId", verifyToken, getReview);
router.post("/createreview", verifyToken, createReview);

export default router;