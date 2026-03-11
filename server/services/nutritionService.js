// Simple calorie heuristic database. 
// In a production app, this would be replaced with the Edamam Nutrition API.
const calorieDatabase = {
  "pizza": { caloriesPer100g: 266, protein: 11, carbs: 33, fat: 10 },
  "salad": { caloriesPer100g: 20, protein: 1, carbs: 4, fat: 0.2 },
  "burger": { caloriesPer100g: 295, protein: 14, carbs: 24, fat: 14 },
  "sushi": { caloriesPer100g: 143, protein: 4.5, carbs: 32, fat: 0.5 },
  "apple pie": { caloriesPer100g: 237, protein: 2, carbs: 34, fat: 11 },
  "steak": { caloriesPer100g: 271, protein: 25, carbs: 0, fat: 19 },
  "ice cream": { caloriesPer100g: 207, protein: 3.5, carbs: 24, fat: 11 }
};

export const estimateNutrition = (foodLabel, estimatedGrams = 200) => {
  // Normalize label (e.g., "apple_pie" -> "apple pie")
  const normalizedLabel = foodLabel.toLowerCase().replace(/_/g, " ");
  
  // Find a match or default to a generic meal
  let nutritionInfo = calorieDatabase[normalizedLabel];
  
  // If not found, use a generic heuristic
  if (!nutritionInfo) {
    nutritionInfo = { caloriesPer100g: 150, protein: 5, carbs: 15, fat: 5 };
  }

  const multiplier = estimatedGrams / 100;
  
  return {
    foodItem: normalizedLabel,
    portionGrams: estimatedGrams,
    calories: Math.round(nutritionInfo.caloriesPer100g * multiplier),
    macronutrients: {
      protein: Math.round(nutritionInfo.protein * multiplier),
      carbs: Math.round(nutritionInfo.carbs * multiplier),
      fat: Math.round(nutritionInfo.fat * multiplier)
    }
  };
};
