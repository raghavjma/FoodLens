import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import foodRoutes from './routes/foodRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/food', foodRoutes);

// Basic test route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'FoodLens API is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});