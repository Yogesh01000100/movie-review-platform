import express from "express";
import { verifySession } from "../middlewares/authMiddleware.js";
import {
  getReview,
  getAllReviews,
  createReview,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/getreview/:movieId", verifySession, getReview);
router.get("/getallreviews", verifySession, getAllReviews);
router.post("/createreview", verifySession, createReview);

export default router;
