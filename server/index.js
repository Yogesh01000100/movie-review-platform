import express from 'express';
import cors from "cors";
import cookieParser from 'cookie-parser';
import userRoutes from './src/routes/userRoutes.js';
import authRoutes from './src/routes/authRoutes.js';


const app = express();

app.use(cors({
  origin: 'https://reelchain.vercel.app',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use('/user', userRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('# movie-review-platform');
});

app.listen(3000, () => {
  console.log('Server is running !');
});