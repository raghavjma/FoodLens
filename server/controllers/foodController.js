import fs from 'fs';
import { classifyFood } from '../services/huggingFaceService.js';
import { estimateNutrition } from '../services/nutritionService.js';
import { generateRecommendations } from '../services/dietRecommendationService.js';

export const uploadFoodPhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image uploaded' });
    }

    const imagePath = req.file.path;

    // 1. Classify food LOCALLY via Food-101 Swin Transformer (ONNX)
    console.log(`\n🍽️  Processing image: ${imagePath}`);
    const predictions = await classifyFood(imagePath);
    const topPrediction = predictions[0];

    // 2. Estimate calories using the food's REALISTIC serving size
    //    (e.g., samosa=50g, ramen=500g — not a flat 250g for everything)
    const nutrition = estimateNutrition(topPrediction.label);

    // 3. Include top-3 alternative predictions for transparency
    const alternatives = predictions.slice(1, 4).map(p => ({
      label: p.label,
      confidence: Math.round(p.score * 100)
    }));

    // Clean up uploaded file
    try { fs.unlinkSync(imagePath); } catch (_) { /* ignore */ }

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

/**
 * POST /api/food/recommendations
 * Body: { recentMeals: [...], dailyCalorieTarget: 2000 }
 *
 * Uses cosine similarity on macro vectors to recommend meals.
 */
export const getDietRecommendations = (req, res) => {
  try {
    const { recentMeals = [], dailyCalorieTarget = 2000 } = req.body;
    const result = generateRecommendations(recentMeals, dailyCalorieTarget);

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('❌ Error generating recommendations:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate diet recommendations.'
    });
  }
};
