import { pipeline } from '@huggingface/transformers';
import fs from 'fs';

// ──────────────────────────────────────────────────────────────────────────────
// Food-101 Swin Transformer (ONNX)
//
// Model:  onnx-community/swin-finetuned-food101-ONNX
// Arch:   SwinForImageClassification (Swin Transformer)
// Data:   Food-101 dataset — 101 food categories
// Acc:    92.1% on Food-101 validation set
// Format: Pre-converted ONNX weights — runs locally via ONNX Runtime
// Size:   ~100 MB (downloaded once, cached locally in ~/.cache/)
//
// Categories include: samosa, chicken_curry, pizza, sushi, fried_rice,
//   dumplings, pad_thai, ramen, hamburger, steak, biryani (mapped), etc.
//
// NO API KEY NEEDED. NO INTERNET AT INFERENCE TIME (after first download).
// ──────────────────────────────────────────────────────────────────────────────

const FOOD_MODEL = 'onnx-community/swin-finetuned-food101-ONNX';

// Singleton classifier — loaded once, reused for every request
let classifier = null;

/**
 * Load the Food-101 image classification pipeline.
 * First call downloads the ONNX model weights and caches them.
 * Subsequent calls return the cached pipeline instantly.
 */
async function loadClassifier() {
  if (classifier) return classifier;

  console.log(`🔄 Loading Food-101 model: ${FOOD_MODEL}`);
  console.log(`   ⏳ First run downloads ~100 MB — please wait...`);

  classifier = await pipeline('image-classification', FOOD_MODEL, {
    dtype: 'q8',  // Use int8 quantized weights — smaller, faster
  });

  console.log(`✅ Food-101 model loaded successfully!`);
  return classifier;
}

/**
 * Classify a food image using the locally-running Food-101 Swin Transformer.
 *
 * @param {string} imagePath – path to the uploaded image file
 * @returns {Array<{label: string, score: number}>} – top-5 predictions
 */
export const classifyFood = async (imagePath) => {
  const clf = await loadClassifier();

  console.log(`🍽️  Running Food-101 local inference on: ${imagePath}`);

  // Transformers.js accepts a local file path
  const results = await clf(imagePath, { topk: 5 });

  // Clean up labels: "chicken_curry" → "chicken curry"
  const predictions = results.map(r => ({
    label: r.label.replace(/_/g, ' ').trim().toLowerCase(),
    score: r.score,
  }));

  console.log(`✅ Food-101 predictions:`, predictions.slice(0, 3).map(
    p => `${p.label} (${(p.score * 100).toFixed(1)}%)`
  ));

  return predictions;
};
