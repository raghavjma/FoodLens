import express from 'express';
import multer from 'multer';
import { uploadFoodPhoto, getDietRecommendations } from '../controllers/foodController.js';

const router = express.Router();

// Multer setup for temporary image storage
const upload = multer({ dest: 'uploads/' });

// POST /api/food/analyze — Classify food image + estimate calories
router.post('/analyze', upload.single('photo'), uploadFoodPhoto);

// POST /api/food/recommendations — Get diet recommendations based on meal history
router.post('/recommendations', getDietRecommendations);

export default router;
