import fs from 'fs';
import { classifyFood } from '../services/huggingFaceService.js';
import { estimateNutrition } from '../services/nutritionService.js';

export const uploadFoodPhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image uploaded' });
    }

    const imagePath = req.file.path;

    // 1. Classify food via HuggingFace models (with retry + fallback)
    console.log(`\n🍽️  Processing image: ${imagePath}`);
    const predictions = await classifyFood(imagePath);
    const topPrediction = predictions[0];

    // 2. Estimate calories and macros (250g default portion)
    const nutrition = estimateNutrition(topPrediction.label, 250);

    // 3. Include top-3 alternative predictions for transparency
    const alternatives = predictions.slice(1, 4).map(p => ({
      label: p.label.replace(/_/g, ' '),
      confidence: Math.round(p.score * 100)
    }));

    // Clean up uploaded file
    try { fs.unlinkSync(imagePath); } catch (_) { /* ignore cleanup errors */ }

    res.status(200).json({
      success: true,
      data: {
        recognition: {
          label: topPrediction.label.replace(/_/g, ' '),
          confidence: Math.round(topPrediction.score * 100),
          alternatives
        },
        nutrition
      }
    });

  } catch (error) {
    console.error('❌ Error processing food image:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to classify food image. The ML model may still be loading — please try again in 15 seconds.' 
    });
  }
};
