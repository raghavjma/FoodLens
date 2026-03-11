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
  // ── Step 1: Compute TOTAL consumed macros ───────────────────────
  let totalP = 0, totalC = 0, totalF = 0;
  const eatenFoods = new Set();

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

  // Daily recommended targets (based on a 2000 kcal balanced diet)
  //   Protein: 10-35% of calories → ~50g   (200 kcal / 4 cal/g)
  //   Carbs:   45-65% of calories → ~300g   (1200 kcal / 4 cal/g)
  //   Fat:     20-35% of calories → ~65g    (585 kcal / 9 cal/g)
  const scaleFactor = dailyCalorieTarget / 2000;
  const dailyTargets = {
    protein: Math.round(50 * scaleFactor),
    carbs: Math.round(300 * scaleFactor),
    fat: Math.round(65 * scaleFactor),
  };

  // Use totals for similarity matching (what the user ate today)
  const userVec = recentMeals.length > 0
    ? [totalP, totalC, totalF]
    : [dailyTargets.protein, dailyTargets.carbs, dailyTargets.fat];

  // ── Step 2: Compute what they STILL NEED to hit daily targets ───
  const remainingP = Math.max(0, dailyTargets.protein - totalP);
  const remainingC = Math.max(0, dailyTargets.carbs - totalC);
  const remainingF = Math.max(0, dailyTargets.fat - totalF);
  const targetVec = [remainingP || 1, remainingC || 1, remainingF || 1];

  // ── Step 3: Score every food using cosine similarity ─────────────
  const scored = [];

  for (const [foodName, info] of Object.entries(calorieDatabase)) {
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

  scored.sort((a, b) => b.similarity - a.similarity);
  const recommendations = scored.slice(0, topN);

  // ── Step 4: Generate health insights ────────────────────────────
  const dietProfile = getDietProfile(totalP, totalC, totalF);

  const totalCalories = recentMeals.reduce(
    (acc, meal) => acc + (meal.nutrition?.calories || 0), 0
  );
  const weeklyTarget = dailyCalorieTarget * 7;

  // Generate insight text based on totals vs targets
  let insightText = '';
  if (recentMeals.length === 0) {
    insightText = 'Upload meals to get personalized health insights based on your actual intake.';
  } else {
    insightText = `Based on ${recentMeals.length} meal(s) logged, your diet aligns with a ${dietProfile} profile. `;
    const proteinPct = Math.round((totalP / dailyTargets.protein) * 100);
    const carbsPct = Math.round((totalC / dailyTargets.carbs) * 100);
    const fatPct = Math.round((totalF / dailyTargets.fat) * 100);

    if (proteinPct > 100) {
      insightText += "You've exceeded your protein target — great for muscle recovery! ";
    } else if (proteinPct < 40) {
      insightText += `You've only hit ${proteinPct}% of your protein goal — add protein-rich foods. `;
    }

    if (fatPct > 120) {
      insightText += "Fat intake is above target — consider lighter options for your next meal.";
    } else if (carbsPct > 120) {
      insightText += "Carb intake is high — balance your next meal with more protein and healthy fats.";
    } else {
      insightText += "Keep up the balanced eating!";
    }
  }

  return {
    recommendations,
    insights: {
      dietProfile,
      insightText,
      totalCalories,
      weeklyTarget,
      dailyCalorieTarget,
      mealsLogged: recentMeals.length,
      // TOTAL consumed macros (not averages)
      totalMacros: {
        protein: parseFloat(totalP.toFixed(1)),
        carbs: parseFloat(totalC.toFixed(1)),
        fat: parseFloat(totalF.toFixed(1)),
      },
      // Daily targets for comparison
      dailyTargets,
    }
  };
}
