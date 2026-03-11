// Comprehensive calorie & macro database covering Food-101 labels and common global cuisines.
// Values are approximate per 100g. Sources: USDA, IFCT (Indian Food Composition Tables).

const calorieDatabase = {
  // ── Indian Cuisine ──────────────────────────────────────────────
  "thali":              { caloriesPer100g: 180, protein: 7,   carbs: 25,  fat: 6   },
  "dal":                { caloriesPer100g: 100, protein: 7,   carbs: 12,  fat: 2   },
  "dal makhani":        { caloriesPer100g: 130, protein: 6,   carbs: 14,  fat: 5   },
  "roti":               { caloriesPer100g: 300, protein: 9,   carbs: 50,  fat: 5   },
  "chapati":            { caloriesPer100g: 300, protein: 9,   carbs: 50,  fat: 5   },
  "naan":               { caloriesPer100g: 310, protein: 9,   carbs: 50,  fat: 8   },
  "paratha":            { caloriesPer100g: 326, protein: 8,   carbs: 45,  fat: 13  },
  "rice":               { caloriesPer100g: 130, protein: 2.7, carbs: 28,  fat: 0.3 },
  "biryani":            { caloriesPer100g: 180, protein: 7,   carbs: 25,  fat: 6   },
  "paneer":             { caloriesPer100g: 265, protein: 18,  carbs: 1,   fat: 21  },
  "palak paneer":       { caloriesPer100g: 150, protein: 8,   carbs: 5,   fat: 11  },
  "butter chicken":     { caloriesPer100g: 175, protein: 12,  carbs: 8,   fat: 11  },
  "chicken curry":      { caloriesPer100g: 150, protein: 14,  carbs: 7,   fat: 8   },
  "chicken tikka":      { caloriesPer100g: 160, protein: 20,  carbs: 5,   fat: 7   },
  "tandoori chicken":   { caloriesPer100g: 165, protein: 22,  carbs: 3,   fat: 7   },
  "samosa":             { caloriesPer100g: 262, protein: 4,   carbs: 25,  fat: 16  },
  "pakora":             { caloriesPer100g: 245, protein: 5,   carbs: 22,  fat: 15  },
  "chutney":            { caloriesPer100g: 80,  protein: 1,   carbs: 18,  fat: 0.5 },
  "raita":              { caloriesPer100g: 70,  protein: 3,   carbs: 5,   fat: 4   },
  "curd":               { caloriesPer100g: 60,  protein: 3,   carbs: 5,   fat: 3   },
  "dosa":               { caloriesPer100g: 168, protein: 4,   carbs: 28,  fat: 4   },
  "idli":               { caloriesPer100g: 130, protein: 4,   carbs: 23,  fat: 1   },
  "upma":               { caloriesPer100g: 150, protein: 4,   carbs: 22,  fat: 5   },
  "puri":               { caloriesPer100g: 350, protein: 6,   carbs: 42,  fat: 17  },
  "poha":               { caloriesPer100g: 130, protein: 3,   carbs: 22,  fat: 3   },
  "gulab jamun":        { caloriesPer100g: 325, protein: 4,   carbs: 45,  fat: 15  },
  "jalebi":             { caloriesPer100g: 380, protein: 2,   carbs: 60,  fat: 14  },
  "rasam":              { caloriesPer100g: 35,  protein: 1,   carbs: 5,   fat: 1   },
  "sambhar":            { caloriesPer100g: 60,  protein: 3,   carbs: 8,   fat: 1.5 },
  "papad":              { caloriesPer100g: 330, protein: 18,  carbs: 42,  fat: 9   },
  "pickle":             { caloriesPer100g: 100, protein: 1,   carbs: 8,   fat: 7   },
  "halwa":              { caloriesPer100g: 290, protein: 3,   carbs: 40,  fat: 14  },

  // ── Food-101 Labels (Western / Global) ──────────────────────────
  "pizza":              { caloriesPer100g: 266, protein: 11,  carbs: 33,  fat: 10  },
  "hamburger":          { caloriesPer100g: 295, protein: 14,  carbs: 24,  fat: 14  },
  "burger":             { caloriesPer100g: 295, protein: 14,  carbs: 24,  fat: 14  },
  "hot dog":            { caloriesPer100g: 290, protein: 10,  carbs: 24,  fat: 18  },
  "french fries":       { caloriesPer100g: 312, protein: 3.4, carbs: 41,  fat: 15  },
  "steak":              { caloriesPer100g: 271, protein: 25,  carbs: 0,   fat: 19  },
  "filet mignon":       { caloriesPer100g: 267, protein: 26,  carbs: 0,   fat: 18  },
  "grilled salmon":     { caloriesPer100g: 208, protein: 20,  carbs: 0,   fat: 13  },
  "fish and chips":     { caloriesPer100g: 240, protein: 12,  carbs: 22,  fat: 13  },
  "caesar salad":       { caloriesPer100g: 120, protein: 6,   carbs: 6,   fat: 8   },
  "salad":              { caloriesPer100g: 20,  protein: 1,   carbs: 4,   fat: 0.2 },
  "greek salad":        { caloriesPer100g: 80,  protein: 3,   carbs: 5,   fat: 5   },
  "sushi":              { caloriesPer100g: 143, protein: 4.5, carbs: 32,  fat: 0.5 },
  "sashimi":            { caloriesPer100g: 127, protein: 25,  carbs: 0,   fat: 2.5 },
  "ramen":              { caloriesPer100g: 100, protein: 5,   carbs: 13,  fat: 3.5 },
  "fried rice":         { caloriesPer100g: 163, protein: 4,   carbs: 24,  fat: 6   },
  "pad thai":           { caloriesPer100g: 145, protein: 6,   carbs: 19,  fat: 5   },
  "spring rolls":       { caloriesPer100g: 220, protein: 5,   carbs: 25,  fat: 11  },
  "tacos":              { caloriesPer100g: 210, protein: 9,   carbs: 20,  fat: 11  },
  "burrito":            { caloriesPer100g: 200, protein: 8,   carbs: 24,  fat: 8   },
  "nachos":             { caloriesPer100g: 306, protein: 8,   carbs: 32,  fat: 16  },
  "pancakes":           { caloriesPer100g: 227, protein: 6,   carbs: 28,  fat: 10  },
  "waffles":            { caloriesPer100g: 291, protein: 8,   carbs: 33,  fat: 15  },
  "omelette":           { caloriesPer100g: 154, protein: 11,  carbs: 1,   fat: 12  },
  "eggs benedict":      { caloriesPer100g: 200, protein: 10,  carbs: 12,  fat: 12  },
  "fried egg":          { caloriesPer100g: 196, protein: 14,  carbs: 1,   fat: 15  },
  "pasta":              { caloriesPer100g: 131, protein: 5,   carbs: 25,  fat: 1.1 },
  "spaghetti carbonara":{ caloriesPer100g: 190, protein: 8,   carbs: 22,  fat: 8   },
  "lasagna":            { caloriesPer100g: 163, protein: 9,   carbs: 16,  fat: 7   },
  "macaroni and cheese": { caloriesPer100g: 164, protein: 7,  carbs: 17,  fat: 7   },
  "soup":               { caloriesPer100g: 45,  protein: 2,   carbs: 6,   fat: 1   },
  "clam chowder":       { caloriesPer100g: 87,  protein: 3,   carbs: 8,   fat: 5   },
  "bread":              { caloriesPer100g: 265, protein: 9,   carbs: 49,  fat: 3   },
  "garlic bread":       { caloriesPer100g: 350, protein: 8,   carbs: 40,  fat: 18  },
  "bruschetta":         { caloriesPer100g: 160, protein: 4,   carbs: 18,  fat: 8   },
  "apple pie":          { caloriesPer100g: 237, protein: 2,   carbs: 34,  fat: 11  },
  "cheesecake":         { caloriesPer100g: 321, protein: 6,   carbs: 26,  fat: 22  },
  "chocolate cake":     { caloriesPer100g: 370, protein: 5,   carbs: 50,  fat: 17  },
  "tiramisu":           { caloriesPer100g: 283, protein: 5,   carbs: 30,  fat: 16  },
  "ice cream":          { caloriesPer100g: 207, protein: 3.5, carbs: 24,  fat: 11  },
  "donuts":             { caloriesPer100g: 421, protein: 5,   carbs: 49,  fat: 23  },
  "churros":            { caloriesPer100g: 361, protein: 4,   carbs: 37,  fat: 22  },
  "cup cakes":          { caloriesPer100g: 305, protein: 3,   carbs: 45,  fat: 12  },
  "macarons":           { caloriesPer100g: 400, protein: 6,   carbs: 60,  fat: 15  },
  "chocolate mousse":   { caloriesPer100g: 210, protein: 4,   carbs: 20,  fat: 13  },
  "creme brulee":       { caloriesPer100g: 260, protein: 4,   carbs: 25,  fat: 16  },
  "frozen yogurt":      { caloriesPer100g: 127, protein: 3,   carbs: 22,  fat: 3   },
  "panna cotta":        { caloriesPer100g: 220, protein: 3,   carbs: 22,  fat: 14  },
  "grilled cheese sandwich": { caloriesPer100g: 290, protein: 12, carbs: 26, fat: 16 },
  "club sandwich":      { caloriesPer100g: 220, protein: 13,  carbs: 18,  fat: 11  },
  "pulled pork sandwich": { caloriesPer100g: 210, protein: 14, carbs: 22, fat: 7   },
  "lobster roll sandwich": { caloriesPer100g: 220, protein: 14, carbs: 20, fat: 9  },

  // ── Chinese / East Asian ────────────────────────────────────────
  "dumplings":          { caloriesPer100g: 180, protein: 7,   carbs: 22,  fat: 7   },
  "gyoza":              { caloriesPer100g: 190, protein: 7,   carbs: 20,  fat: 8   },
  "dim sum":            { caloriesPer100g: 170, protein: 7,   carbs: 18,  fat: 7   },
  "kung pao chicken":   { caloriesPer100g: 170, protein: 14,  carbs: 10,  fat: 9   },
  "sweet and sour chicken": { caloriesPer100g: 180, protein: 12, carbs: 20, fat: 6 },
  "chow mein":          { caloriesPer100g: 121, protein: 5,   carbs: 16,  fat: 4   },
  "peking duck":        { caloriesPer100g: 225, protein: 15,  carbs: 5,   fat: 17  },

  // ── Mediterranean ───────────────────────────────────────────────
  "hummus":             { caloriesPer100g: 166, protein: 8,   carbs: 14,  fat: 10  },
  "falafel":            { caloriesPer100g: 333, protein: 13,  carbs: 32,  fat: 18  },
  "shawarma":           { caloriesPer100g: 180, protein: 14,  carbs: 12,  fat: 8   },
  "pho":                { caloriesPer100g: 45,  protein: 4,   carbs: 4,   fat: 1   },
  "baklava":            { caloriesPer100g: 430, protein: 6,   carbs: 45,  fat: 26  },

  // ── Breakfast ───────────────────────────────────────────────────
  "cereal":             { caloriesPer100g: 379, protein: 7,   carbs: 80,  fat: 3   },
  "granola":            { caloriesPer100g: 471, protein: 10,  carbs: 64,  fat: 20  },
  "yogurt":             { caloriesPer100g: 59,  protein: 10,  carbs: 4,   fat: 1   },
  "smoothie":           { caloriesPer100g: 55,  protein: 1,   carbs: 12,  fat: 0.3 },

  // ── Fruits & Simple ─────────────────────────────────────────────
  "fruit":              { caloriesPer100g: 50,  protein: 0.5, carbs: 12,  fat: 0.2 },
  "banana":             { caloriesPer100g: 89,  protein: 1.1, carbs: 23,  fat: 0.3 },
  "apple":              { caloriesPer100g: 52,  protein: 0.3, carbs: 14,  fat: 0.2 },
};

/**
 * Estimate nutrition given a food label and assumed portion size.
 * Attempts partial matching if exact label isn't found.
 */
export const estimateNutrition = (foodLabel, estimatedGrams = 250) => {
  const normalizedLabel = foodLabel.toLowerCase().replace(/_/g, " ").trim();

  // 1. Try exact match
  let nutritionInfo = calorieDatabase[normalizedLabel];

  // 2. Try partial / fuzzy match — e.g., "chicken_curry" matches "chicken curry"
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
