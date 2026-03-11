// ──────────────────────────────────────────────────────────────────────────────
// Comprehensive calorie & macro database (per 100 g).
// Covers all 101 Food-101 categories + common Indian foods.
// Sources: USDA, IFCT (Indian Food Composition Tables).
// ──────────────────────────────────────────────────────────────────────────────
const calorieDatabase = {
  // ── Food-101 Categories (alphabetical) ──────────────────────────
  "apple pie":            { caloriesPer100g: 237, protein: 2,   carbs: 34,  fat: 11  },
  "baby back ribs":       { caloriesPer100g: 250, protein: 22,  carbs: 5,   fat: 16  },
  "baklava":              { caloriesPer100g: 430, protein: 6,   carbs: 45,  fat: 26  },
  "beef carpaccio":       { caloriesPer100g: 140, protein: 17,  carbs: 1,   fat: 7   },
  "beef tartare":         { caloriesPer100g: 163, protein: 19,  carbs: 2,   fat: 9   },
  "beet salad":           { caloriesPer100g: 70,  protein: 2,   carbs: 10,  fat: 2   },
  "beignets":             { caloriesPer100g: 330, protein: 5,   carbs: 40,  fat: 17  },
  "bibimbap":             { caloriesPer100g: 140, protein: 8,   carbs: 18,  fat: 4   },
  "bread pudding":        { caloriesPer100g: 220, protein: 5,   carbs: 30,  fat: 9   },
  "breakfast burrito":    { caloriesPer100g: 195, protein: 9,   carbs: 18,  fat: 10  },
  "bruschetta":           { caloriesPer100g: 160, protein: 4,   carbs: 18,  fat: 8   },
  "caesar salad":         { caloriesPer100g: 120, protein: 6,   carbs: 6,   fat: 8   },
  "cannoli":              { caloriesPer100g: 320, protein: 6,   carbs: 30,  fat: 20  },
  "caprese salad":        { caloriesPer100g: 115, protein: 6,   carbs: 3,   fat: 9   },
  "carrot cake":          { caloriesPer100g: 340, protein: 4,   carbs: 45,  fat: 16  },
  "ceviche":              { caloriesPer100g: 100, protein: 12,  carbs: 5,   fat: 3   },
  "cheesecake":           { caloriesPer100g: 321, protein: 6,   carbs: 26,  fat: 22  },
  "cheese plate":         { caloriesPer100g: 350, protein: 22,  carbs: 2,   fat: 28  },
  "chicken curry":        { caloriesPer100g: 150, protein: 14,  carbs: 7,   fat: 8   },
  "chicken quesadilla":   { caloriesPer100g: 245, protein: 13,  carbs: 20,  fat: 13  },
  "chicken wings":        { caloriesPer100g: 230, protein: 19,  carbs: 6,   fat: 15  },
  "chocolate cake":       { caloriesPer100g: 370, protein: 5,   carbs: 50,  fat: 17  },
  "chocolate mousse":     { caloriesPer100g: 210, protein: 4,   carbs: 20,  fat: 13  },
  "churros":              { caloriesPer100g: 361, protein: 4,   carbs: 37,  fat: 22  },
  "clam chowder":         { caloriesPer100g: 87,  protein: 3,   carbs: 8,   fat: 5   },
  "club sandwich":        { caloriesPer100g: 220, protein: 13,  carbs: 18,  fat: 11  },
  "crab cakes":           { caloriesPer100g: 175, protein: 14,  carbs: 10,  fat: 9   },
  "creme brulee":         { caloriesPer100g: 260, protein: 4,   carbs: 25,  fat: 16  },
  "croque madame":        { caloriesPer100g: 260, protein: 14,  carbs: 18,  fat: 15  },
  "cup cakes":            { caloriesPer100g: 305, protein: 3,   carbs: 45,  fat: 12  },
  "deviled eggs":         { caloriesPer100g: 200, protein: 11,  carbs: 1,   fat: 17  },
  "donuts":               { caloriesPer100g: 421, protein: 5,   carbs: 49,  fat: 23  },
  "dumplings":            { caloriesPer100g: 180, protein: 7,   carbs: 22,  fat: 7   },
  "edamame":              { caloriesPer100g: 121, protein: 12,  carbs: 9,   fat: 5   },
  "eggs benedict":        { caloriesPer100g: 200, protein: 10,  carbs: 12,  fat: 12  },
  "escargots":            { caloriesPer100g: 90,  protein: 16,  carbs: 2,   fat: 2   },
  "falafel":              { caloriesPer100g: 333, protein: 13,  carbs: 32,  fat: 18  },
  "filet mignon":         { caloriesPer100g: 267, protein: 26,  carbs: 0,   fat: 18  },
  "fish and chips":       { caloriesPer100g: 240, protein: 12,  carbs: 22,  fat: 13  },
  "foie gras":            { caloriesPer100g: 462, protein: 11,  carbs: 4,   fat: 44  },
  "french fries":         { caloriesPer100g: 312, protein: 3.4, carbs: 41,  fat: 15  },
  "french onion soup":    { caloriesPer100g: 55,  protein: 2,   carbs: 5,   fat: 3   },
  "french toast":         { caloriesPer100g: 229, protein: 8,   carbs: 24,  fat: 11  },
  "fried calamari":       { caloriesPer100g: 175, protein: 13,  carbs: 11,  fat: 9   },
  "fried rice":           { caloriesPer100g: 163, protein: 4,   carbs: 24,  fat: 6   },
  "frozen yogurt":        { caloriesPer100g: 127, protein: 3,   carbs: 22,  fat: 3   },
  "garlic bread":         { caloriesPer100g: 350, protein: 8,   carbs: 40,  fat: 18  },
  "gnocchi":              { caloriesPer100g: 133, protein: 3,   carbs: 28,  fat: 1   },
  "greek salad":          { caloriesPer100g: 80,  protein: 3,   carbs: 5,   fat: 5   },
  "grilled cheese sandwich": { caloriesPer100g: 290, protein: 12, carbs: 26, fat: 16 },
  "grilled salmon":       { caloriesPer100g: 208, protein: 20,  carbs: 0,   fat: 13  },
  "guacamole":            { caloriesPer100g: 160, protein: 2,   carbs: 9,   fat: 15  },
  "gyoza":                { caloriesPer100g: 190, protein: 7,   carbs: 20,  fat: 8   },
  "hamburger":            { caloriesPer100g: 295, protein: 14,  carbs: 24,  fat: 14  },
  "hot and sour soup":    { caloriesPer100g: 40,  protein: 2,   carbs: 4,   fat: 2   },
  "hot dog":              { caloriesPer100g: 290, protein: 10,  carbs: 24,  fat: 18  },
  "huevos rancheros":     { caloriesPer100g: 145, protein: 8,   carbs: 10,  fat: 8   },
  "hummus":               { caloriesPer100g: 166, protein: 8,   carbs: 14,  fat: 10  },
  "ice cream":            { caloriesPer100g: 207, protein: 3.5, carbs: 24,  fat: 11  },
  "lasagna":              { caloriesPer100g: 163, protein: 9,   carbs: 16,  fat: 7   },
  "lobster bisque":       { caloriesPer100g: 95,  protein: 5,   carbs: 6,   fat: 6   },
  "lobster roll sandwich":{ caloriesPer100g: 220, protein: 14,  carbs: 20,  fat: 9   },
  "macaroni and cheese":  { caloriesPer100g: 164, protein: 7,   carbs: 17,  fat: 7   },
  "macarons":             { caloriesPer100g: 400, protein: 6,   carbs: 60,  fat: 15  },
  "miso soup":            { caloriesPer100g: 25,  protein: 2,   carbs: 3,   fat: 0.5 },
  "mussels":              { caloriesPer100g: 86,  protein: 12,  carbs: 4,   fat: 2   },
  "nachos":               { caloriesPer100g: 306, protein: 8,   carbs: 32,  fat: 16  },
  "omelette":             { caloriesPer100g: 154, protein: 11,  carbs: 1,   fat: 12  },
  "onion rings":          { caloriesPer100g: 332, protein: 4,   carbs: 36,  fat: 19  },
  "oysters":              { caloriesPer100g: 68,  protein: 7,   carbs: 4,   fat: 2   },
  "pad thai":             { caloriesPer100g: 145, protein: 6,   carbs: 19,  fat: 5   },
  "paella":               { caloriesPer100g: 150, protein: 8,   carbs: 18,  fat: 5   },
  "pancakes":             { caloriesPer100g: 227, protein: 6,   carbs: 28,  fat: 10  },
  "panna cotta":          { caloriesPer100g: 220, protein: 3,   carbs: 22,  fat: 14  },
  "peking duck":          { caloriesPer100g: 225, protein: 15,  carbs: 5,   fat: 17  },
  "pho":                  { caloriesPer100g: 45,  protein: 4,   carbs: 4,   fat: 1   },
  "pizza":                { caloriesPer100g: 266, protein: 11,  carbs: 33,  fat: 10  },
  "pork chop":            { caloriesPer100g: 231, protein: 25,  carbs: 0,   fat: 14  },
  "poutine":              { caloriesPer100g: 210, protein: 6,   carbs: 25,  fat: 10  },
  "prime rib":            { caloriesPer100g: 280, protein: 23,  carbs: 0,   fat: 20  },
  "pulled pork sandwich": { caloriesPer100g: 210, protein: 14,  carbs: 22,  fat: 7   },
  "ramen":                { caloriesPer100g: 100, protein: 5,   carbs: 13,  fat: 3.5 },
  "ravioli":              { caloriesPer100g: 190, protein: 8,   carbs: 24,  fat: 7   },
  "red velvet cake":      { caloriesPer100g: 340, protein: 4,   carbs: 45,  fat: 16  },
  "risotto":              { caloriesPer100g: 130, protein: 3,   carbs: 20,  fat: 4   },
  "samosa":               { caloriesPer100g: 262, protein: 4,   carbs: 25,  fat: 16  },
  "sashimi":              { caloriesPer100g: 127, protein: 25,  carbs: 0,   fat: 2.5 },
  "scallops":             { caloriesPer100g: 111, protein: 21,  carbs: 5,   fat: 1   },
  "seaweed salad":        { caloriesPer100g: 70,  protein: 2,   carbs: 9,   fat: 3   },
  "shrimp and grits":     { caloriesPer100g: 140, protein: 10,  carbs: 14,  fat: 5   },
  "spaghetti bolognese":  { caloriesPer100g: 130, protein: 6,   carbs: 16,  fat: 4   },
  "spaghetti carbonara":  { caloriesPer100g: 190, protein: 8,   carbs: 22,  fat: 8   },
  "spring rolls":         { caloriesPer100g: 220, protein: 5,   carbs: 25,  fat: 11  },
  "steak":                { caloriesPer100g: 271, protein: 25,  carbs: 0,   fat: 19  },
  "strawberry shortcake": { caloriesPer100g: 240, protein: 3,   carbs: 35,  fat: 10  },
  "sushi":                { caloriesPer100g: 143, protein: 4.5, carbs: 32,  fat: 0.5 },
  "tacos":                { caloriesPer100g: 210, protein: 9,   carbs: 20,  fat: 11  },
  "takoyaki":             { caloriesPer100g: 180, protein: 6,   carbs: 20,  fat: 8   },
  "tiramisu":             { caloriesPer100g: 283, protein: 5,   carbs: 30,  fat: 16  },
  "tuna tartare":         { caloriesPer100g: 140, protein: 20,  carbs: 2,   fat: 6   },
  "waffles":              { caloriesPer100g: 291, protein: 8,   carbs: 33,  fat: 15  },

  // ── Extra Indian Cuisine (beyond Food-101) ──────────────────────
  "thali":              { caloriesPer100g: 180, protein: 7,   carbs: 25,  fat: 6   },
  "dal":                { caloriesPer100g: 100, protein: 7,   carbs: 12,  fat: 2   },
  "roti":               { caloriesPer100g: 300, protein: 9,   carbs: 50,  fat: 5   },
  "naan":               { caloriesPer100g: 310, protein: 9,   carbs: 50,  fat: 8   },
  "biryani":            { caloriesPer100g: 180, protein: 7,   carbs: 25,  fat: 6   },
  "paneer":             { caloriesPer100g: 265, protein: 18,  carbs: 1,   fat: 21  },
  "dosa":               { caloriesPer100g: 168, protein: 4,   carbs: 28,  fat: 4   },
  "idli":               { caloriesPer100g: 130, protein: 4,   carbs: 23,  fat: 1   },
};

/**
 * Estimate nutrition given a food label and assumed portion size.
 */
export const estimateNutrition = (foodLabel, estimatedGrams = 250) => {
  const normalizedLabel = foodLabel.toLowerCase().replace(/_/g, ' ').trim();

  // 1. Try exact match
  let nutritionInfo = calorieDatabase[normalizedLabel];

  // 2. Try partial / fuzzy match
  if (!nutritionInfo) {
    for (const [key, val] of Object.entries(calorieDatabase)) {
      if (normalizedLabel.includes(key) || key.includes(normalizedLabel)) {
        nutritionInfo = val;
        break;
      }
    }
  }

  // 3. Fallback to generic meal estimate
  if (!nutritionInfo) {
    nutritionInfo = { caloriesPer100g: 150, protein: 5, carbs: 20, fat: 5 };
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
