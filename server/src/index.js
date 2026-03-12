import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import foodRoutes from "./routes/foodRoutes.js";
import {connectDB} from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.FRONTEND_URL, credentials:true
}));
app.use(express.json()); // allows to parse json body
app.use(cookieParser); // allows to parse incoming cookies

app.use('/api/auth', authRoutes);

app.use('/api/food', foodRoutes);

// Basic test route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'FoodLens API is running' });
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on localhost:${PORT}`);
  })
})