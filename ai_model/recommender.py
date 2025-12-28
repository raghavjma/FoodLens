from __future__ import annotations

import json
from typing import Any, Dict, Iterable, List, Optional, Tuple

import numpy as np

from food_db import FOOD_NUTRITION, Nutrition


def _vec(n: Nutrition) -> np.ndarray:
    return np.array(
        [
            n.calories_per_100g,
            n.protein_g_per_100g,
            n.carbs_g_per_100g,
            n.fat_g_per_100g,
            n.fiber_g_per_100g,
        ],
        dtype=np.float32,
    )


def _minmax_params() -> Tuple[np.ndarray, np.ndarray]:
    xs = np.stack([_vec(n) for n in FOOD_NUTRITION.values()], axis=0)
    mn = xs.min(axis=0)
    mx = xs.max(axis=0)
    denom = (mx - mn)
    denom = np.where(denom == 0, 1.0, denom)
    return mn.astype(np.float32), denom.astype(np.float32)


_MIN, _DEN = _minmax_params()


def _scale(v: np.ndarray) -> np.ndarray:
    return (v - _MIN) / _DEN


def _cosine(a: np.ndarray, b: np.ndarray) -> float:
    denom = float(np.linalg.norm(a) * np.linalg.norm(b))
    if denom == 0:
        return 0.0
    return float(np.dot(a, b) / denom)


def parse_profile(profile_json: Optional[str]) -> Dict[str, Any]:
    if not profile_json:
        return {}
    try:
        return json.loads(profile_json)
    except Exception:
        return {}


def parse_history(history_json: Optional[str]) -> List[str]:
    if not history_json:
        return []
    try:
        v = json.loads(history_json)
        if isinstance(v, list):
            return [str(x) for x in v]
        return []
    except Exception:
        return []


def recommend_foods(
    profile: Dict[str, Any],
    excluded: Iterable[str],
    top_n: int = 5,
) -> List[Dict[str, Any]]:
    vegetarian = bool(profile.get("vegetarian", False))
    allergies = set((profile.get("allergies") or []))
    allergies = {str(x).strip().lower() for x in allergies if str(x).strip()}

    target = profile.get("target") or {}
    target_cal = float(target.get("calories_per_100g", 150.0))
    target_protein = float(target.get("protein_g_per_100g", 8.0))
    target_carbs = float(target.get("carbs_g_per_100g", 25.0))
    target_fat = float(target.get("fat_g_per_100g", 5.0))
    target_fiber = float(target.get("fiber_g_per_100g", 3.0))

    target_vec = np.array(
        [target_cal, target_protein, target_carbs, target_fat, target_fiber],
        dtype=np.float32,
    )
    target_vec = _scale(target_vec)

    excluded_set = {str(x).strip().lower() for x in excluded if str(x).strip()}

    scored: List[Tuple[float, str, Nutrition]] = []
    for k, n in FOOD_NUTRITION.items():
        if k.lower() in excluded_set:
            continue
        if vegetarian and not n.is_vegetarian:
            continue
        if allergies and (n.allergen_tags & allergies):
            continue
        s = _cosine(_scale(_vec(n)), target_vec)
        scored.append((s, k, n))

    scored.sort(key=lambda x: x[0], reverse=True)
    out: List[Dict[str, Any]] = []
    for s, k, n in scored[:top_n]:
        out.append(
            {
                "food": k,
                "score": float(s),
                "calories_per_100g": n.calories_per_100g,
                "protein_g_per_100g": n.protein_g_per_100g,
                "carbs_g_per_100g": n.carbs_g_per_100g,
                "fat_g_per_100g": n.fat_g_per_100g,
                "fiber_g_per_100g": n.fiber_g_per_100g,
            }
        )
    return out
