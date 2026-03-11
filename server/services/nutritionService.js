// ──────────────────────────────────────────────────────────────────────────────
// Nutrition database with USDA-verified values per 100g AND realistic
// typical serving sizes for each food item.
//
// Sources: USDA FoodData Central, IFCT (Indian Food Composition Tables),
//          MyFitnessPal verified entries.
//
// Each entry:
//   caloriesPer100g / protein / carbs / fat  — macros per 100 g
//   typicalServingG                          — realistic serving size in grams
// ──────────────────────────────────────────────────────────────────────────────
const calorieDatabase = {
  // ── Food-101 Categories ─────────────────────────────────────────
  //                                            cal  pro  carb fat   serving
  "apple pie":            { caloriesPer100g: 237, protein: 1.9, carbs: 34,  fat: 11,  typicalServingG: 125 },
  "baby back ribs":       { caloriesPer100g: 250, protein: 22,  carbs: 5,   fat: 16,  typicalServingG: 200 },
  "baklava":              { caloriesPer100g: 428, protein: 6,   carbs: 45,  fat: 26,  typicalServingG: 60  },
  "beef carpaccio":       { caloriesPer100g: 140, protein: 17,  carbs: 1,   fat: 7,   typicalServingG: 100 },
  "beef tartare":         { caloriesPer100g: 163, protein: 19,  carbs: 2,   fat: 9,   typicalServingG: 120 },
  "beet salad":           { caloriesPer100g: 70,  protein: 2,   carbs: 10,  fat: 2,   typicalServingG: 200 },
  "beignets":             { caloriesPer100g: 330, protein: 5,   carbs: 40,  fat: 17,  typicalServingG: 40  },
  "bibimbap":             { caloriesPer100g: 140, protein: 8,   carbs: 18,  fat: 4,   typicalServingG: 400 },
  "bread pudding":        { caloriesPer100g: 220, protein: 5,   carbs: 30,  fat: 9,   typicalServingG: 150 },
  "breakfast burrito":    { caloriesPer100g: 195, protein: 9,   carbs: 18,  fat: 10,  typicalServingG: 200 },
  "bruschetta":           { caloriesPer100g: 160, protein: 4,   carbs: 18,  fat: 8,   typicalServingG: 80  },
  "caesar salad":         { caloriesPer100g: 120, protein: 6,   carbs: 6,   fat: 8,   typicalServingG: 250 },
  "cannoli":              { caloriesPer100g: 320, protein: 6,   carbs: 30,  fat: 20,  typicalServingG: 80  },
  "caprese salad":        { caloriesPer100g: 115, protein: 6,   carbs: 3,   fat: 9,   typicalServingG: 200 },
  "carrot cake":          { caloriesPer100g: 340, protein: 4,   carbs: 45,  fat: 16,  typicalServingG: 110 },
  "ceviche":              { caloriesPer100g: 100, protein: 12,  carbs: 5,   fat: 3,   typicalServingG: 150 },
  "cheesecake":           { caloriesPer100g: 321, protein: 5.5, carbs: 25,  fat: 23,  typicalServingG: 125 },
  "cheese plate":         { caloriesPer100g: 350, protein: 22,  carbs: 2,   fat: 28,  typicalServingG: 100 },
  "chicken curry":        { caloriesPer100g: 150, protein: 14,  carbs: 7,   fat: 8,   typicalServingG: 250 },
  "chicken quesadilla":   { caloriesPer100g: 245, protein: 13,  carbs: 20,  fat: 13,  typicalServingG: 180 },
  "chicken wings":        { caloriesPer100g: 230, protein: 19,  carbs: 6,   fat: 15,  typicalServingG: 150 },
  "chocolate cake":       { caloriesPer100g: 370, protein: 5,   carbs: 50,  fat: 17,  typicalServingG: 100 },
  "chocolate mousse":     { caloriesPer100g: 210, protein: 4,   carbs: 20,  fat: 13,  typicalServingG: 100 },
  "churros":              { caloriesPer100g: 361, protein: 4,   carbs: 37,  fat: 22,  typicalServingG: 60  },
  "clam chowder":         { caloriesPer100g: 87,  protein: 3,   carbs: 8,   fat: 5,   typicalServingG: 300 },
  "club sandwich":        { caloriesPer100g: 220, protein: 13,  carbs: 18,  fat: 11,  typicalServingG: 250 },
  "crab cakes":           { caloriesPer100g: 175, protein: 14,  carbs: 10,  fat: 9,   typicalServingG: 120 },
  "creme brulee":         { caloriesPer100g: 260, protein: 4,   carbs: 25,  fat: 16,  typicalServingG: 120 },
  "croque madame":        { caloriesPer100g: 260, protein: 14,  carbs: 18,  fat: 15,  typicalServingG: 200 },
  "cup cakes":            { caloriesPer100g: 305, protein: 3,   carbs: 45,  fat: 12,  typicalServingG: 60  },
  "deviled eggs":         { caloriesPer100g: 200, protein: 11,  carbs: 1,   fat: 17,  typicalServingG: 60  },
  "donuts":               { caloriesPer100g: 421, protein: 5,   carbs: 49,  fat: 23,  typicalServingG: 60  },
  "dumplings":            { caloriesPer100g: 180, protein: 7,   carbs: 22,  fat: 7,   typicalServingG: 150 },
  "edamame":              { caloriesPer100g: 121, protein: 12,  carbs: 9,   fat: 5,   typicalServingG: 100 },
  "eggs benedict":        { caloriesPer100g: 200, protein: 10,  carbs: 12,  fat: 12,  typicalServingG: 250 },
  "escargots":            { caloriesPer100g: 90,  protein: 16,  carbs: 2,   fat: 2,   typicalServingG: 100 },
  "falafel":              { caloriesPer100g: 333, protein: 13,  carbs: 32,  fat: 18,  typicalServingG: 100 },
  "filet mignon":         { caloriesPer100g: 267, protein: 26,  carbs: 0,   fat: 18,  typicalServingG: 170 },
  "fish and chips":       { caloriesPer100g: 240, protein: 12,  carbs: 22,  fat: 13,  typicalServingG: 300 },
  "foie gras":            { caloriesPer100g: 462, protein: 11,  carbs: 4,   fat: 44,  typicalServingG: 50  },
  "french fries":         { caloriesPer100g: 312, protein: 3.4, carbs: 41,  fat: 15,  typicalServingG: 120 },
  "french onion soup":    { caloriesPer100g: 55,  protein: 2,   carbs: 5,   fat: 3,   typicalServingG: 350 },
  "french toast":         { caloriesPer100g: 229, protein: 8,   carbs: 24,  fat: 11,  typicalServingG: 150 },
  "fried calamari":       { caloriesPer100g: 175, protein: 13,  carbs: 11,  fat: 9,   typicalServingG: 120 },
  "fried rice":           { caloriesPer100g: 163, protein: 4.3, carbs: 24,  fat: 6,   typicalServingG: 250 },
  "frozen yogurt":        { caloriesPer100g: 127, protein: 3,   carbs: 22,  fat: 3,   typicalServingG: 150 },
  "garlic bread":         { caloriesPer100g: 350, protein: 8,   carbs: 40,  fat: 18,  typicalServingG: 50  },
  "gnocchi":              { caloriesPer100g: 133, protein: 3,   carbs: 28,  fat: 1,   typicalServingG: 250 },
  "greek salad":          { caloriesPer100g: 80,  protein: 3,   carbs: 5,   fat: 5,   typicalServingG: 250 },
  "grilled cheese sandwich": { caloriesPer100g: 290, protein: 12, carbs: 26, fat: 16, typicalServingG: 150 },
  "grilled salmon":       { caloriesPer100g: 208, protein: 20,  carbs: 0,   fat: 13,  typicalServingG: 170 },
  "guacamole":            { caloriesPer100g: 160, protein: 2,   carbs: 9,   fat: 15,  typicalServingG: 75  },
  "gyoza":                { caloriesPer100g: 190, protein: 7,   carbs: 20,  fat: 8,   typicalServingG: 140 },
  "hamburger":            { caloriesPer100g: 295, protein: 14,  carbs: 24,  fat: 14,  typicalServingG: 200 },
  "hot and sour soup":    { caloriesPer100g: 40,  protein: 2,   carbs: 4,   fat: 2,   typicalServingG: 350 },
  "hot dog":              { caloriesPer100g: 290, protein: 10,  carbs: 24,  fat: 18,  typicalServingG: 100 },
  "huevos rancheros":     { caloriesPer100g: 145, protein: 8,   carbs: 10,  fat: 8,   typicalServingG: 250 },
  "hummus":               { caloriesPer100g: 166, protein: 8,   carbs: 14,  fat: 10,  typicalServingG: 70  },
  "ice cream":            { caloriesPer100g: 207, protein: 3.5, carbs: 24,  fat: 11,  typicalServingG: 100 },
  "lasagna":              { caloriesPer100g: 163, protein: 9,   carbs: 16,  fat: 7,   typicalServingG: 300 },
  "lobster bisque":       { caloriesPer100g: 95,  protein: 5,   carbs: 6,   fat: 6,   typicalServingG: 300 },
  "lobster roll sandwich":{ caloriesPer100g: 220, protein: 14,  carbs: 20,  fat: 9,   typicalServingG: 200 },
  "macaroni and cheese":  { caloriesPer100g: 164, protein: 7,   carbs: 17,  fat: 7,   typicalServingG: 250 },
  "macarons":             { caloriesPer100g: 400, protein: 6,   carbs: 60,  fat: 15,  typicalServingG: 30  },
  "miso soup":            { caloriesPer100g: 25,  protein: 2,   carbs: 3,   fat: 0.5, typicalServingG: 300 },
  "mussels":              { caloriesPer100g: 86,  protein: 12,  carbs: 4,   fat: 2,   typicalServingG: 200 },
  "nachos":               { caloriesPer100g: 306, protein: 8,   carbs: 32,  fat: 16,  typicalServingG: 150 },
  "omelette":             { caloriesPer100g: 154, protein: 11,  carbs: 0.7, fat: 12,  typicalServingG: 180 },
  "onion rings":          { caloriesPer100g: 332, protein: 4,   carbs: 36,  fat: 19,  typicalServingG: 100 },
  "oysters":              { caloriesPer100g: 68,  protein: 7,   carbs: 4,   fat: 2,   typicalServingG: 150 },
  "pad thai":             { caloriesPer100g: 145, protein: 6,   carbs: 19,  fat: 5,   typicalServingG: 300 },
  "paella":               { caloriesPer100g: 150, protein: 8,   carbs: 18,  fat: 5,   typicalServingG: 350 },
  "pancakes":             { caloriesPer100g: 227, protein: 6,   carbs: 28,  fat: 10,  typicalServingG: 150 },
  "panna cotta":          { caloriesPer100g: 220, protein: 3,   carbs: 22,  fat: 14,  typicalServingG: 120 },
  "peking duck":          { caloriesPer100g: 225, protein: 15,  carbs: 5,   fat: 17,  typicalServingG: 150 },
  "pho":                  { caloriesPer100g: 45,  protein: 4,   carbs: 4,   fat: 1,   typicalServingG: 500 },
  "pizza":                { caloriesPer100g: 266, protein: 11,  carbs: 33,  fat: 10,  typicalServingG: 150 },
  "pork chop":            { caloriesPer100g: 231, protein: 25,  carbs: 0,   fat: 14,  typicalServingG: 200 },
  "poutine":              { caloriesPer100g: 210, protein: 6,   carbs: 25,  fat: 10,  typicalServingG: 300 },
  "prime rib":            { caloriesPer100g: 280, protein: 23,  carbs: 0,   fat: 20,  typicalServingG: 250 },
  "pulled pork sandwich": { caloriesPer100g: 210, protein: 14,  carbs: 22,  fat: 7,   typicalServingG: 250 },
  "ramen":                { caloriesPer100g: 100, protein: 5,   carbs: 13,  fat: 3.5, typicalServingG: 500 },
  "ravioli":              { caloriesPer100g: 190, protein: 8,   carbs: 24,  fat: 7,   typicalServingG: 250 },
  "red velvet cake":      { caloriesPer100g: 340, protein: 4,   carbs: 45,  fat: 16,  typicalServingG: 110 },
  "risotto":              { caloriesPer100g: 130, protein: 3,   carbs: 20,  fat: 4,   typicalServingG: 300 },
  "samosa":               { caloriesPer100g: 262, protein: 3.5, carbs: 25,  fat: 16,  typicalServingG: 50  },
  "sashimi":              { caloriesPer100g: 127, protein: 25,  carbs: 0,   fat: 2.5, typicalServingG: 120 },
  "scallops":             { caloriesPer100g: 111, protein: 21,  carbs: 5,   fat: 1,   typicalServingG: 150 },
  "seaweed salad":        { caloriesPer100g: 70,  protein: 2,   carbs: 9,   fat: 3,   typicalServingG: 120 },
  "shrimp and grits":     { caloriesPer100g: 140, protein: 10,  carbs: 14,  fat: 5,   typicalServingG: 300 },
  "spaghetti bolognese":  { caloriesPer100g: 130, protein: 6,   carbs: 16,  fat: 4,   typicalServingG: 350 },
  "spaghetti carbonara":  { caloriesPer100g: 190, protein: 8,   carbs: 22,  fat: 8,   typicalServingG: 300 },
  "spring rolls":         { caloriesPer100g: 220, protein: 5,   carbs: 25,  fat: 11,  typicalServingG: 80  },
  "steak":                { caloriesPer100g: 271, protein: 25,  carbs: 0,   fat: 19,  typicalServingG: 200 },
  "strawberry shortcake": { caloriesPer100g: 240, protein: 3,   carbs: 35,  fat: 10,  typicalServingG: 150 },
  "sushi":                { caloriesPer100g: 143, protein: 4.5, carbs: 32,  fat: 0.5, typicalServingG: 200 },
  "tacos":                { caloriesPer100g: 210, protein: 9,   carbs: 20,  fat: 11,  typicalServingG: 120 },
  "takoyaki":             { caloriesPer100g: 180, protein: 6,   carbs: 20,  fat: 8,   typicalServingG: 100 },
  "tiramisu":             { caloriesPer100g: 283, protein: 5,   carbs: 30,  fat: 16,  typicalServingG: 120 },
  "tuna tartare":         { caloriesPer100g: 140, protein: 20,  carbs: 2,   fat: 6,   typicalServingG: 120 },
  "waffles":              { caloriesPer100g: 291, protein: 8,   carbs: 33,  fat: 15,  typicalServingG: 120 },

  // ── Extra Indian Cuisine ────────────────────────────────────────
  "thali":              { caloriesPer100g: 180, protein: 7,   carbs: 25,  fat: 6,   typicalServingG: 400 },
  "dal":                { caloriesPer100g: 100, protein: 7,   carbs: 12,  fat: 2,   typicalServingG: 200 },
  "roti":               { caloriesPer100g: 300, protein: 9,   carbs: 50,  fat: 5,   typicalServingG: 40  },
  "naan":               { caloriesPer100g: 310, protein: 9,   carbs: 50,  fat: 8,   typicalServingG: 90  },
  "biryani":            { caloriesPer100g: 180, protein: 7,   carbs: 25,  fat: 6,   typicalServingG: 350 },
  "paneer":             { caloriesPer100g: 265, protein: 18,  carbs: 1.2, fat: 21,  typicalServingG: 100 },
  "dosa":               { caloriesPer100g: 168, protein: 4,   carbs: 28,  fat: 4,   typicalServingG: 120 },
  "idli":               { caloriesPer100g: 130, protein: 4,   carbs: 23,  fat: 1,   typicalServingG: 120 },
};

/**
 * Estimate nutrition using the food's realistic typical serving size.
 * Falls back to 200g if the food isn't in the database.
 *
 * The calculation:
 *   macroValue = (macroPer100g / 100) × typicalServingG
 *
 * Example: Samosa → per 100g = 262 kcal, typical serving = 50g (1 piece)
 *   → 262 × (50/100) = 131 kcal per samosa
 */
export const estimateNutrition = (foodLabel, overrideGrams = null) => {
  const normalizedLabel = foodLabel.toLowerCase().replace(/_/g, ' ').trim();

  // 1. Try exact match
  let nutritionInfo = calorieDatabase[normalizedLabel];
  let matchedKey = normalizedLabel;

  // 2. Try partial / fuzzy match
  if (!nutritionInfo) {
    for (const [key, val] of Object.entries(calorieDatabase)) {
      if (normalizedLabel.includes(key) || key.includes(normalizedLabel)) {
        nutritionInfo = val;
        matchedKey = key;
        break;
      }
    }
  }

  // 3. Fallback to generic meal estimate
  if (!nutritionInfo) {
    nutritionInfo = { caloriesPer100g: 150, protein: 5, carbs: 20, fat: 5, typicalServingG: 200 };
  }

  // Use the food's typical serving size, or override if provided
  const servingGrams = overrideGrams || nutritionInfo.typicalServingG || 200;
  const multiplier = servingGrams / 100;

  return {
    foodItem: matchedKey,
    portionGrams: servingGrams,
    calories: Math.round(nutritionInfo.caloriesPer100g * multiplier),
    macronutrients: {
      protein: parseFloat((nutritionInfo.protein * multiplier).toFixed(1)),
      carbs: parseFloat((nutritionInfo.carbs * multiplier).toFixed(1)),
      fat: parseFloat((nutritionInfo.fat * multiplier).toFixed(1)),
    }
  };
};

/**
 * Export the database for the diet recommendation service.
 */
export { calorieDatabase };
