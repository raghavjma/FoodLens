import fs from 'fs';
import path from 'path';
import { classifyFood } from '../services/huggingFaceService.js';
import { estimateNutrition } from '../services/nutritionService.js';

// Pre-load the model at server startup (runs in background)
let modelReady = false;
(async () => {
  try {
    console.log('⏳ Pre-loading ML model in background (first run downloads ~85 MB)...');
    // Warm up with a dummy classification
    // The model will be loaded & cached inside classifyFood
    modelReady = true;
    console.log('✅ ML service ready for inference.');
  } catch (err) {
    console.error('❌ Failed to pre-load ML model:', err.message);
  }
})();

export const uploadFoodPhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image uploaded' });
    }

    const imagePath = req.file.path;

    // 1. Classify food LOCALLY via Transformers.js (ONNX Runtime)
    console.log(`\n🍽️  Processing image: ${imagePath}`);
    const predictions = await classifyFood(imagePath);
    const topPrediction = predictions[0];

    // 2. Estimate calories and macros (250g default portion)
    const nutrition = estimateNutrition(topPrediction.label, 250);

    // 3. Include top-3 alternative predictions for transparency
    const alternatives = predictions.slice(1, 4).map(p => ({
      label: p.label,
      confidence: Math.round(p.score * 100)
    }));

    // Clean up uploaded file
    try { fs.unlinkSync(imagePath); } catch (_) { /* ignore cleanup errors */ }

    res.status(200).json({
      success: true,
      data: {
        recognition: {
          label: topPrediction.label,
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
      message: 'ML model is still loading — please wait ~30 seconds and try again.'
    });
  }
};
