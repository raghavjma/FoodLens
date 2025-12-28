from __future__ import annotations

from typing import Optional, Tuple

from PIL import Image


PORTION_HINT_TO_GRAMS = {
    "small": 180.0,
    "medium": 280.0,
    "large": 400.0,
}


def estimate_grams(
    image: Image.Image,
    portion_hint: Optional[str] = None,
    portion_grams: Optional[float] = None,
) -> Tuple[float, str]:
    if portion_grams is not None:
        try:
            g = float(portion_grams)
            if g > 0:
                return g, "explicit"
        except Exception:
            pass

    hint = (portion_hint or "medium").strip().lower()
    if hint in PORTION_HINT_TO_GRAMS:
        return PORTION_HINT_TO_GRAMS[hint], hint

    return PORTION_HINT_TO_GRAMS["medium"], "medium"
