import express from 'express';
import cors from "cors";
import cookieParser from 'cookie-parser';
import userRoutes from './src/routes/userRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import 'dotenv/config';

const app = express();
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/user', userRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('# movie-review-platform');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});