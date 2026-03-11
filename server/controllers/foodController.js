import fs from 'fs';
import path from 'path';
import { classifyFood } from '../services/huggingFaceService.js';
import { estimateNutrition } from '../services/nutritionService.js';

export const uploadFoodPhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image uploaded' });
    }

    const imagePath = req.file.path;
    
    // 1. Identify Food via Hugging Face model
    console.log(`Processing image: ${imagePath}`);
    const predictions = await classifyFood(imagePath);
    const topPrediction = predictions[0]; // { label: '...', score: ... }

    // 2. Estimate Calories via heuristics (mocked portion size of 200g for now)
    const nutrition = estimateNutrition(topPrediction.label, 200);

    // Clean up uploaded file synchronously for simplicity in this demo
    fs.unlinkSync(imagePath);

    res.status(200).json({
      success: true,
      data: {
        recognition: {
          label: topPrediction.label.replace(/_/g, ' '),
          confidence: Math.round(topPrediction.score * 100)
        },
        nutrition
      }
    });

  } catch (error) {
    console.error('Error processing food image:', error);
    res.status(500).json({ success: false, message: 'Server error processing image' });
  }
};
