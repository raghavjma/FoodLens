from __future__ import annotations

import json
from typing import Any, Dict, Optional

from fastapi import FastAPI, File, Form, UploadFile
from PIL import Image

from food_db import lookup_nutrition
from model import load_model, predict_topk
from portion import estimate_grams
from recommender import parse_history, parse_profile, recommend_foods

app = FastAPI(title="FoodLens ML Service")


@app.on_event("startup")
def _startup() -> None:
    processor, model, device = load_model()
    app.state.processor = processor
    app.state.model = model
    app.state.device = device


@app.get("/health")
def health() -> Dict[str, Any]:
    return {"status": "ok"}


@app.post("/analyze")
async def analyze(
    image: UploadFile = File(...),
    portion: Optional[str] = Form(None),
    portion_grams: Optional[str] = Form(None),
    user_profile: Optional[str] = Form(None),
    history: Optional[str] = Form(None),
    top_k: int = Form(5),
) -> Dict[str, Any]:
    raw = await image.read()
    pil = Image.open(io_bytes(raw)).convert("RGB")

    processor = app.state.processor
    model = app.state.model
    device = app.state.device

    try:
        preds = predict_topk(processor, model, device, pil, k=int(top_k))
    except Exception as e:
        preds = [{"label": "unknown", "score": 0.0, "error": str(e)}]

    best_label = preds[0]["label"] if preds else "unknown"
    canonical, nutrition = lookup_nutrition(best_label)

    grams_float: Optional[float] = None
    if portion_grams is not None:
        try:
            grams_float = float(portion_grams)
        except Exception:
            grams_float = None

    grams, portion_source = estimate_grams(pil, portion_hint=portion, portion_grams=grams_float)

    estimated_calories: Optional[float] = None
    if nutrition is not None:
        estimated_calories = float(nutrition.calories_per_100g * grams / 100.0)

    profile = parse_profile(user_profile)
    hist = parse_history(history)
    excluded = set(hist)
    if canonical:
        excluded.add(canonical)

    recs = recommend_foods(profile, excluded=excluded, top_n=5)

    nutrition_out: Optional[Dict[str, Any]] = None
    if nutrition is not None and canonical is not None:
        nutrition_out = {
            "food": canonical,
            "calories_per_100g": nutrition.calories_per_100g,
            "protein_g_per_100g": nutrition.protein_g_per_100g,
            "carbs_g_per_100g": nutrition.carbs_g_per_100g,
            "fat_g_per_100g": nutrition.fat_g_per_100g,
            "fiber_g_per_100g": nutrition.fiber_g_per_100g,
            "is_vegetarian": nutrition.is_vegetarian,
        }

    return {
        "food_predictions": preds,
        "recognized_food": nutrition_out,
        "portion": {"grams": grams, "source": portion_source},
        "estimated_calories": estimated_calories,
        "recommendations": recs,
    }


def io_bytes(b: bytes):
    import io

    return io.BytesIO(b)
