import { calorieDatabase, estimateNutrition } from './nutritionService.js';

// ──────────────────────────────────────────────────────────────────────────────
// Diet Recommendation Engine
//
// Uses ML-based COSINE SIMILARITY matching on the macronutrient vector
// (protein, carbs, fat) to recommend meals that are nutritionally similar
// to the user's target profile — but that they haven't eaten yet.
//
// The algorithm:
//   1. Compute the user's average macro profile from their recent meals
//   2. Determine a "target" profile (what they SHOULD eat to balance the day)
//   3. Score every food in the database using cosine similarity to the target
//   4. Filter out already-eaten foods
//   5. Return the top-N most similar meals
// ──────────────────────────────────────────────────────────────────────────────

/**
 * Cosine similarity between two macronutrient vectors [protein, carbs, fat].
 * Returns a value between 0 (completely different) and 1 (identical profile).
 */
function cosineSimilarity(vecA, vecB) {
  const dotProduct = vecA[0] * vecB[0] + vecA[1] * vecB[1] + vecA[2] * vecB[2];
  const magA = Math.sqrt(vecA[0] ** 2 + vecA[1] ** 2 + vecA[2] ** 2);
  const magB = Math.sqrt(vecB[0] ** 2 + vecB[1] ** 2 + vecB[2] ** 2);
  if (magA === 0 || magB === 0) return 0;
  return dotProduct / (magA * magB);
}

/**
 * Classify a meal's dietary tag based on its macro ratio.
 */
function getDietTag(protein, carbs, fat) {
  const total = protein + carbs + fat;
  if (total === 0) return "Balanced";

  const proteinRatio = protein / total;
  const carbRatio = carbs / total;
  const fatRatio = fat / total;

  if (proteinRatio > 0.35) return "High Protein";
  if (carbRatio < 0.2 && fatRatio > 0.5) return "Keto";
  if (carbRatio < 0.25) return "Low Carb";
  if (fatRatio < 0.2) return "Low Fat";
  return "Balanced";
}

/**
 * Determine the user's dominant diet profile name based on average macros.
 */
function getDietProfile(avgProtein, avgCarbs, avgFat) {
  const total = avgProtein + avgCarbs + avgFat;
  if (total === 0) return "Balanced";

  const proteinRatio = avgProtein / total;
  const carbRatio = avgCarbs / total;
  const fatRatio = avgFat / total;

  if (proteinRatio > 0.35) return "High-Protein";
  if (carbRatio < 0.2 && fatRatio > 0.5) return "Keto-friendly";
  if (carbRatio > 0.5) return "Mediterranean";
  if (fatRatio < 0.2 && carbRatio > 0.4) return "Japanese-inspired";
  if (proteinRatio > 0.25 && carbRatio > 0.3) return "Balanced";
  return "Mixed";
}

/**
 * Generate personalized diet recommendations based on recent meals.
 *
 * @param {Array} recentMeals - array of recent meal data objects
 *   Each meal: { nutrition: { foodItem, macronutrients: { protein, carbs, fat } } }
 * @param {number} dailyCalorieTarget - user's daily calorie target (default: 2000)
 * @param {number} topN - number of recommendations to return (default: 4)
 * @returns {Object} - recommendations with health insights
 */
export function generateRecommendations(recentMeals = [], dailyCalorieTarget = 2000, topN = 4) {
  // ── Step 1: Compute user's average macro profile ────────────────
  let avgProtein = 20, avgCarbs = 50, avgFat = 15; // defaults for no history
  const eatenFoods = new Set();

  if (recentMeals.length > 0) {
    let totalP = 0, totalC = 0, totalF = 0;
    for (const meal of recentMeals) {
      const m = meal.nutrition?.macronutrients;
      if (m) {
        totalP += m.protein || 0;
        totalC += m.carbs || 0;
        totalF += m.fat || 0;
      }
      if (meal.nutrition?.foodItem) {
        eatenFoods.add(meal.nutrition.foodItem.toLowerCase());
      }
    }
    avgProtein = totalP / recentMeals.length;
    avgCarbs = totalC / recentMeals.length;
    avgFat = totalF / recentMeals.length;
  }

  // ── Step 2: Compute a "target" macro vector ─────────────────────
  // Ideal macro split for balanced diet: 30% protein, 40% carbs, 30% fat
  const idealProtein = 30;
  const idealCarbs = 50;
  const idealFat = 20;

  // Blend: 60% ideal + 40% user preference (so we gently steer them)
  const targetVec = [
    idealProtein * 0.6 + avgProtein * 0.4,
    idealCarbs * 0.6 + avgCarbs * 0.4,
    idealFat * 0.6 + avgFat * 0.4,
  ];

  // ── Step 3: Score every food using cosine similarity ─────────────
  const scored = [];

  for (const [foodName, info] of Object.entries(calorieDatabase)) {
    // Skip foods the user already ate recently
    if (eatenFoods.has(foodName)) continue;

    const serving = info.typicalServingG || 200;
    const mult = serving / 100;
    const foodVec = [
      info.protein * mult,
      info.carbs * mult,
      info.fat * mult,
    ];

    const similarity = cosineSimilarity(targetVec, foodVec);
    const calories = Math.round(info.caloriesPer100g * mult);

    scored.push({
      title: foodName.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      match: `${Math.round(similarity * 100)}%`,
      cal: calories,
      tag: getDietTag(info.protein * mult, info.carbs * mult, info.fat * mult),
      similarity,
      macronutrients: {
        protein: parseFloat((info.protein * mult).toFixed(1)),
        carbs: parseFloat((info.carbs * mult).toFixed(1)),
        fat: parseFloat((info.fat * mult).toFixed(1)),
      }
    });
  }

  // Sort by similarity (descending) and return topN
  scored.sort((a, b) => b.similarity - a.similarity);
  const recommendations = scored.slice(0, topN);

  // ── Step 4: Generate health insights ────────────────────────────
  const dietProfile = getDietProfile(avgProtein, avgCarbs, avgFat);

  const totalWeeklyCalories = recentMeals.reduce(
    (acc, meal) => acc + (meal.nutrition?.calories || 0), 0
  );
  const weeklyTarget = dailyCalorieTarget * 7;
  const dailyAverage = recentMeals.length > 0
    ? Math.round(totalWeeklyCalories / Math.min(recentMeals.length, 7))
    : dailyCalorieTarget;

  // Generate insight text
  let insightText = `Based on your recent meals, your diet aligns closely with a ${dietProfile} profile. `;
  if (avgProtein > 25) {
    insightText += "You're hitting great protein levels! ";
  } else if (avgProtein < 12) {
    insightText += "Consider adding more protein-rich foods to your diet. ";
  }
  if (avgFat > 25) {
    insightText += "Your fat intake is on the higher side — try swapping in some grilled or steamed options.";
  } else if (avgCarbs > 60) {
    insightText += "Carbs are running high — try balancing with more protein and healthy fats.";
  } else {
    insightText += "Keep up the balanced eating!";
  }

  return {
    recommendations,
    insights: {
      dietProfile,
      insightText,
      totalWeeklyCalories,
      weeklyTarget,
      dailyAverage,
      avgMacros: {
        protein: Math.round(avgProtein),
        carbs: Math.round(avgCarbs),
        fat: Math.round(avgFat),
      }
    }
  };
}
