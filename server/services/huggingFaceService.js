import { pipeline, env } from '@xenova/transformers';
import fs from 'fs';

// Disable local model check — always download from HuggingFace Hub on first run
env.allowLocalModels = false;

// Singleton classifier instance (loaded once, reused for every request)
let classifier = null;
let modelName = null;

/**
 * Load the image-classification pipeline.
 * On first call this downloads the ONNX model weights (~85 MB) and caches
 * them locally (in ~/.cache/). Subsequent calls are instant.
 *
 * Model priority:
 *   1. Xenova/food_classification  – if available (food-specific)
 *   2. Xenova/vit-base-patch16-224 – general ImageNet classifier (1000 classes,
 *      many of which are food items)
 */
async function loadClassifier() {
  if (classifier) return classifier;

  const modelsToTry = [
    'Xenova/vit-base-patch16-224',  // General ViT — guaranteed available in ONNX
  ];

  for (const model of modelsToTry) {
    try {
      console.log(`🔄 Loading local model: ${model} (first run downloads ~85 MB)...`);
      classifier = await pipeline('image-classification', model, {
        quantized: true,   // Use quantized weights for smaller download + faster inference
      });
      modelName = model;
      console.log(`✅ Model loaded successfully: ${model}`);
      return classifier;
    } catch (err) {
      console.warn(`⚠️  Failed to load ${model}: ${err.message}`);
    }
  }

  throw new Error('Could not load any image classification model');
}

/**
 * Classify a food image entirely locally using the ONNX model.
 * No API keys needed. No outgoing API calls at inference time.
 *
 * @param {string} imagePath – path to the uploaded image file
 * @returns {Array<{label: string, score: number}>} – top predictions
 */
export const classifyFood = async (imagePath) => {
  const clf = await loadClassifier();

  console.log(`🍽️  Running local inference on: ${imagePath}`);

  // Transformers.js accepts a file path or URL
  const results = await clf(imagePath, { topk: 5 });

  // Map results to our standard format and clean up labels
  const predictions = results.map(r => ({
    label: r.label
      .replace(/_/g, ' ')
      .replace(/,.*$/, '')      // "pizza, pizza pie" → "pizza"
      .trim()
      .toLowerCase(),
    score: r.score,
  }));

  console.log(`✅ Local ML predictions:`, predictions.slice(0, 3).map(p => `${p.label} (${(p.score * 100).toFixed(1)}%)`));
  return predictions;
};
