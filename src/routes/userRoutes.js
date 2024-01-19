import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { signup, login } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/getuser',verifyToken);

export default router;