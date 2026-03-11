// ──────────────────────────────────────────────────────────────────────────────
// ImageNet label → friendly food name mapping.
// The ViT-base-patch16-224 model uses ImageNet-1K labels. Many are food items
// but with odd names like "carbonara" or "consomme". This map normalizes them.
// ──────────────────────────────────────────────────────────────────────────────
const imagenetToFood = {
  "pizza": "pizza",
  "pizza, pizza pie": "pizza",
  "cheeseburger": "burger",
  "hamburger": "burger",
  "hotdog": "hot dog",
  "hot dog": "hot dog",
  "red hot": "hot dog",
  "french loaf": "bread",
  "meat loaf": "meatloaf",
  "meatloaf": "meatloaf",
  "bagel": "bagel",
  "beigel": "bagel",
  "pretzel": "pretzel",
  "carbonara": "spaghetti carbonara",
  "chocolate sauce": "chocolate sauce",
  "chocolate syrup": "chocolate sauce",
  "dough": "dough",
  "burrito": "burrito",
  "guacamole": "guacamole",
  "consomme": "soup",
  "trifle": "trifle",
  "pot pie": "pot pie",
  "espresso": "espresso",
  "ice cream": "ice cream",
  "icecream": "ice cream",
  "ice lolly": "popsicle",
  "lollipop": "popsicle",
  "popsicle": "popsicle",
  "plate": "mixed plate",
  "tray": "mixed plate",
  "dining table": "mixed plate",
  "menu": "mixed plate",
  "broccoli": "broccoli",
  "cauliflower": "cauliflower",
  "cucumber": "cucumber",
  "cuke": "cucumber",
  "zucchini": "zucchini",
  "courgette": "zucchini",
  "artichoke": "artichoke",
  "bell pepper": "bell pepper",
  "mushroom": "mushroom",
  "head cabbage": "cabbage",
  "mashed potato": "mashed potato",
  "spaghetti squash": "spaghetti squash",
  "acorn squash": "squash",
  "butternut squash": "squash",
  "granny smith": "apple",
  "strawberry": "strawberry",
  "orange": "orange",
  "lemon": "lemon",
  "fig": "fig",
  "pineapple": "pineapple",
  "ananas": "pineapple",
  "banana": "banana",
  "jackfruit": "jackfruit",
  "custard apple": "custard apple",
  "pomegranate": "pomegranate",
  "cardoon": "artichoke",
  "corn": "corn",
  "ear": "corn",
};

// ──────────────────────────────────────────────────────────────────────────────
// Comprehensive calorie & macro database (per 100 g).
// Sources: USDA, IFCT (Indian Food Composition Tables).
// ──────────────────────────────────────────────────────────────────────────────
const calorieDatabase = {
  // ── ImageNet specific labels ────────────────────────────────────
  "mixed plate":        { caloriesPer100g: 175, protein: 7,   carbs: 22,  fat: 6   },
  "espresso":           { caloriesPer100g: 2,   protein: 0.1, carbs: 0,   fat: 0   },
  "dough":              { caloriesPer100g: 290, protein: 8,   carbs: 48,  fat: 7   },
  "trifle":             { caloriesPer100g: 166, protein: 3,   carbs: 22,  fat: 7   },
  "chocolate sauce":    { caloriesPer100g: 330, protein: 3,   carbs: 54,  fat: 12  },
  "popsicle":           { caloriesPer100g: 60,  protein: 0,   carbs: 15,  fat: 0   },
  "bagel":              { caloriesPer100g: 257, protein: 10,  carbs: 50,  fat: 2   },
  "pretzel":            { caloriesPer100g: 380, protein: 9,   carbs: 79,  fat: 3   },
  "meatloaf":           { caloriesPer100g: 170, protein: 12,  carbs: 7,   fat: 11  },

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

  // ── Food-101 / Global Cuisine ──────────────────────────────────
  "pizza":              { caloriesPer100g: 266, protein: 11,  carbs: 33,  fat: 10  },
  "burger":             { caloriesPer100g: 295, protein: 14,  carbs: 24,  fat: 14  },
  "hot dog":            { caloriesPer100g: 290, protein: 10,  carbs: 24,  fat: 18  },
  "french fries":       { caloriesPer100g: 312, protein: 3.4, carbs: 41,  fat: 15  },
  "steak":              { caloriesPer100g: 271, protein: 25,  carbs: 0,   fat: 19  },
  "grilled salmon":     { caloriesPer100g: 208, protein: 20,  carbs: 0,   fat: 13  },
  "fish and chips":     { caloriesPer100g: 240, protein: 12,  carbs: 22,  fat: 13  },
  "salad":              { caloriesPer100g: 20,  protein: 1,   carbs: 4,   fat: 0.2 },
  "sushi":              { caloriesPer100g: 143, protein: 4.5, carbs: 32,  fat: 0.5 },
  "ramen":              { caloriesPer100g: 100, protein: 5,   carbs: 13,  fat: 3.5 },
  "fried rice":         { caloriesPer100g: 163, protein: 4,   carbs: 24,  fat: 6   },
  "pad thai":           { caloriesPer100g: 145, protein: 6,   carbs: 19,  fat: 5   },
  "tacos":              { caloriesPer100g: 210, protein: 9,   carbs: 20,  fat: 11  },
  "burrito":            { caloriesPer100g: 200, protein: 8,   carbs: 24,  fat: 8   },
  "guacamole":          { caloriesPer100g: 160, protein: 2,   carbs: 9,   fat: 15  },
  "pancakes":           { caloriesPer100g: 227, protein: 6,   carbs: 28,  fat: 10  },
  "omelette":           { caloriesPer100g: 154, protein: 11,  carbs: 1,   fat: 12  },
  "pasta":              { caloriesPer100g: 131, protein: 5,   carbs: 25,  fat: 1.1 },
  "spaghetti carbonara":{ caloriesPer100g: 190, protein: 8,   carbs: 22,  fat: 8   },
  "lasagna":            { caloriesPer100g: 163, protein: 9,   carbs: 16,  fat: 7   },
  "bread":              { caloriesPer100g: 265, protein: 9,   carbs: 49,  fat: 3   },
  "apple pie":          { caloriesPer100g: 237, protein: 2,   carbs: 34,  fat: 11  },
  "cheesecake":         { caloriesPer100g: 321, protein: 6,   carbs: 26,  fat: 22  },
  "chocolate cake":     { caloriesPer100g: 370, protein: 5,   carbs: 50,  fat: 17  },
  "ice cream":          { caloriesPer100g: 207, protein: 3.5, carbs: 24,  fat: 11  },
  "donuts":             { caloriesPer100g: 421, protein: 5,   carbs: 49,  fat: 23  },
  "soup":               { caloriesPer100g: 45,  protein: 2,   carbs: 6,   fat: 1   },
  "pot pie":            { caloriesPer100g: 230, protein: 7,   carbs: 22,  fat: 13  },
  "dumplings":          { caloriesPer100g: 180, protein: 7,   carbs: 22,  fat: 7   },
  "hummus":             { caloriesPer100g: 166, protein: 8,   carbs: 14,  fat: 10  },
  "falafel":            { caloriesPer100g: 333, protein: 13,  carbs: 32,  fat: 18  },

  // ── Vegetables & Fruits ─────────────────────────────────────────
  "broccoli":           { caloriesPer100g: 34,  protein: 2.8, carbs: 7,   fat: 0.4 },
  "cauliflower":        { caloriesPer100g: 25,  protein: 1.9, carbs: 5,   fat: 0.3 },
  "cabbage":            { caloriesPer100g: 25,  protein: 1.3, carbs: 6,   fat: 0.1 },
  "cucumber":           { caloriesPer100g: 15,  protein: 0.7, carbs: 4,   fat: 0.1 },
  "zucchini":           { caloriesPer100g: 17,  protein: 1.2, carbs: 3,   fat: 0.3 },
  "mushroom":           { caloriesPer100g: 22,  protein: 3.1, carbs: 3,   fat: 0.3 },
  "bell pepper":        { caloriesPer100g: 31,  protein: 1,   carbs: 6,   fat: 0.3 },
  "corn":               { caloriesPer100g: 86,  protein: 3.3, carbs: 19,  fat: 1.2 },
  "mashed potato":      { caloriesPer100g: 83,  protein: 2,   carbs: 15,  fat: 1.5 },
  "squash":             { caloriesPer100g: 26,  protein: 1,   carbs: 7,   fat: 0.1 },
  "artichoke":          { caloriesPer100g: 47,  protein: 3.3, carbs: 11,  fat: 0.2 },
  "banana":             { caloriesPer100g: 89,  protein: 1.1, carbs: 23,  fat: 0.3 },
  "apple":              { caloriesPer100g: 52,  protein: 0.3, carbs: 14,  fat: 0.2 },
  "strawberry":         { caloriesPer100g: 32,  protein: 0.7, carbs: 8,   fat: 0.3 },
  "orange":             { caloriesPer100g: 47,  protein: 0.9, carbs: 12,  fat: 0.1 },
  "lemon":              { caloriesPer100g: 29,  protein: 1.1, carbs: 9,   fat: 0.3 },
  "pineapple":          { caloriesPer100g: 50,  protein: 0.5, carbs: 13,  fat: 0.1 },
  "pomegranate":        { caloriesPer100g: 83,  protein: 1.7, carbs: 19,  fat: 1.2 },
  "fig":                { caloriesPer100g: 74,  protein: 0.8, carbs: 19,  fat: 0.3 },
  "jackfruit":          { caloriesPer100g: 95,  protein: 1.7, carbs: 23,  fat: 0.6 },
  "custard apple":      { caloriesPer100g: 94,  protein: 2.1, carbs: 24,  fat: 0.3 },
};

/**
 * Normalize an ImageNet label to a food-friendly name.
 */
function normalizeLabel(rawLabel) {
  const lower = rawLabel.toLowerCase().replace(/_/g, ' ').trim();

  // Check ImageNet → food mapping first
  if (imagenetToFood[lower]) {
    return imagenetToFood[lower];
  }

  // Also check without commas: "pizza, pizza pie" → "pizza"
  const beforeComma = lower.split(',')[0].trim();
  if (imagenetToFood[beforeComma]) {
    return imagenetToFood[beforeComma];
  }

  return beforeComma;
}

/**
 * Estimate nutrition given a food label and assumed portion size.
 * Handles ImageNet labels, partial matches, and fallback heuristics.
 */
export const estimateNutrition = (foodLabel, estimatedGrams = 250) => {
  const normalizedLabel = normalizeLabel(foodLabel);

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
