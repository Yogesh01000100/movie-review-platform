import express from 'express';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

app.use(express.json());

app.use('/user', userRoutes);
app.use('/auth', authRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
