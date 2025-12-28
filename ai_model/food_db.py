from __future__ import annotations

from dataclasses import dataclass
from typing import Dict, FrozenSet, Optional, Tuple


@dataclass(frozen=True)
class Nutrition:
    calories_per_100g: float
    protein_g_per_100g: float
    carbs_g_per_100g: float
    fat_g_per_100g: float
    fiber_g_per_100g: float
    is_vegetarian: bool
    allergen_tags: FrozenSet[str]


FOOD_NUTRITION: Dict[str, Nutrition] = {
    "apple": Nutrition(52, 0.3, 13.8, 0.2, 2.4, True, frozenset()),
    "banana": Nutrition(89, 1.1, 22.8, 0.3, 2.6, True, frozenset()),
    "rice_cooked": Nutrition(130, 2.4, 28.2, 0.3, 0.4, True, frozenset()),
    "bread": Nutrition(265, 9.0, 49.0, 3.2, 2.7, True, frozenset({"gluten"})),
    "pizza": Nutrition(266, 11.0, 33.0, 10.0, 2.3, False, frozenset({"gluten", "dairy"})),
    "burger": Nutrition(295, 17.0, 30.0, 14.0, 1.5, False, frozenset({"gluten", "meat"})),
    "salad": Nutrition(33, 2.0, 6.0, 0.4, 2.8, True, frozenset()),
    "pasta": Nutrition(157, 5.8, 30.9, 0.9, 1.8, True, frozenset({"gluten"})),
    "fried_chicken": Nutrition(246, 28.0, 8.0, 14.0, 0.0, False, frozenset({"meat"})),
    "egg": Nutrition(155, 13.0, 1.1, 11.0, 0.0, False, frozenset({"egg"})),
    "paneer": Nutrition(265, 18.0, 6.0, 20.0, 0.0, True, frozenset({"dairy"})),
    "idli": Nutrition(146, 4.4, 30.0, 0.4, 2.0, True, frozenset()),
    "dosa": Nutrition(168, 4.0, 28.0, 4.0, 2.0, True, frozenset()),
    "samosa": Nutrition(262, 4.0, 32.0, 13.0, 3.0, True, frozenset({"gluten"})),
}


LABEL_ALIASES: Dict[str, str] = {
    "pizza": "pizza",
    "cheeseburger": "burger",
    "hamburger": "burger",
    "salad": "salad",
    "banana": "banana",
    "apple": "apple",
    "bread": "bread",
    "pasta": "pasta",
    "fried chicken": "fried_chicken",
    "egg": "egg",
    "paneer": "paneer",
    "idly": "idli",
    "idli": "idli",
    "dosa": "dosa",
    "samosa": "samosa",
    "rice": "rice_cooked",
}


def normalize_label(label: str) -> str:
    s = (label or "").strip().lower()
    s = s.replace("_", " ")
    return s


def lookup_nutrition(predicted_label: str) -> Tuple[Optional[str], Optional[Nutrition]]:
    norm = normalize_label(predicted_label)
    key = LABEL_ALIASES.get(norm)
    if key is None:
        key = LABEL_ALIASES.get(norm.replace(" ", ""))
    if key is None:
        return None, None
    return key, FOOD_NUTRITION.get(key)
