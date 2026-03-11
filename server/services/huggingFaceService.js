import fs from 'fs';
import axios from 'axios';

// Primary: nateraw/food (Food-101 classifier — handles many global cuisines)
// Fallback: google/vit-base-patch16-224 (general ImageNet classifier)
const MODELS = [
  {
    name: "nateraw/food",
    url: "https://api-inference.huggingface.co/models/nateraw/food",
    type: "food"
  },
  {
    name: "google/vit-base-patch16-224",
    url: "https://api-inference.huggingface.co/models/google/vit-base-patch16-224",
    type: "general"
  }
];

/**
 * Sleep utility for retry delays
 */
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Call a single HuggingFace model with retry logic for cold-start (503).
 * HF free-tier models go to sleep after inactivity; a 503 means the model
 * is loading and we should wait and retry.
 */
async function queryModel(modelUrl, fileData, maxRetries = 3) {
  const headers = { 'Content-Type': 'application/octet-stream' };
  if (process.env.HF_API_KEY) {
    headers['Authorization'] = `Bearer ${process.env.HF_API_KEY}`;
  }

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`  → HF attempt ${attempt}/${maxRetries} for ${modelUrl}`);
      const response = await axios.post(modelUrl, fileData, {
        headers,
        timeout: 30000 // 30-second timeout per attempt
      });

      if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        return response.data;
      }
      throw new Error("Empty or invalid response from model");
    } catch (error) {
      const status = error.response?.status;
      const estimatedTime = error.response?.data?.estimated_time;

      if (status === 503 && attempt < maxRetries) {
        // Model is loading — wait for the estimated time (or 10s default)
        const waitTime = Math.min((estimatedTime || 10) * 1000, 30000);
        console.log(`  ⏳ Model loading (503). Waiting ${Math.round(waitTime / 1000)}s before retry...`);
        await sleep(waitTime);
        continue;
      }

      if (status === 429 && attempt < maxRetries) {
        // Rate limited — back off
        console.log(`  ⏳ Rate limited (429). Waiting 5s...`);
        await sleep(5000);
        continue;
      }

      // For any other error on the last attempt, throw
      if (attempt === maxRetries) {
        throw new Error(`HF model failed after ${maxRetries} attempts: ${error.message} (status: ${status || 'N/A'})`);
      }
    }
  }
}

/**
 * Main classification function — tries models in order until one succeeds.
 * Also maps general-purpose ImageNet labels to food-friendly labels.
 */
export const classifyFood = async (imagePath) => {
  const fileData = fs.readFileSync(imagePath);

  for (const model of MODELS) {
    try {
      console.log(`🔍 Trying model: ${model.name}`);
      let predictions = await queryModel(model.url, fileData);

      // For the general model, try to extract food-relevant labels
      if (model.type === "general") {
        predictions = mapGeneralLabelsToFood(predictions);
      }

      console.log(`✅ Classification success via ${model.name}:`, predictions.slice(0, 3));
      return predictions;
    } catch (error) {
      console.warn(`⚠️  Model ${model.name} failed: ${error.message}`);
      continue; // Try next model
    }
  }

  // ALL models failed — return an honest error instead of fake data
  console.error("❌ All ML models failed. Returning 'unknown' classification.");
  return [
    { label: "unknown_food", score: 0.0 }
  ];
};

/**
 * Maps general ImageNet labels to more food-friendly names when possible.
 * The google/vit model returns ImageNet labels like "plate", "restaurant", etc.
 * We keep the top prediction as-is but flag that it's from a general model.
 */
function mapGeneralLabelsToFood(predictions) {
  // ImageNet has some food labels — just pass them through
  // but clean up formatting (e.g., "french_loaf" → "french loaf")
  return predictions.map(p => ({
    label: p.label.replace(/_/g, ' ').toLowerCase(),
    score: p.score
  }));
}
