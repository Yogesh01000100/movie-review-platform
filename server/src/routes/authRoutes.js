import express from "express";
import {
  createSessionCookie,
  checkSession,
  sessionLogout,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/createsessioncookie", createSessionCookie);
router.get("/sessionexists", checkSession);
router.post("/signout", sessionLogout);

export default router;