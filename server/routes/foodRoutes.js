import express from 'express';
import multer from 'multer';
import { uploadFoodPhoto } from '../controllers/foodController.js';

const router = express.Router();

// Multer setup for temporary image storage
const upload = multer({ dest: 'uploads/' });

// POST /api/food/analyze
// Receives an image file in the 'photo' field
router.post('/analyze', upload.single('photo'), uploadFoodPhoto);

export default router;
