import os
from typing import Any, Dict, List, Tuple

import numpy as np
import torch
from PIL import Image
from transformers import AutoImageProcessor, AutoModelForImageClassification


def _get_device() -> torch.device:
    prefer = os.getenv("DEVICE", "auto").lower()
    if prefer == "cpu":
        return torch.device("cpu")
    if prefer == "cuda":
        return torch.device("cuda" if torch.cuda.is_available() else "cpu")
    return torch.device("cuda" if torch.cuda.is_available() else "cpu")


def load_model() -> Tuple[Any, Any, torch.device]:
    model_name = os.getenv("MODEL_NAME", "nateraw/food")
    processor = AutoImageProcessor.from_pretrained(model_name)
    model = AutoModelForImageClassification.from_pretrained(model_name)
    device = _get_device()
    model.to(device)
    model.eval()
    return processor, model, device


@torch.inference_mode()
def predict_topk(
    processor: Any,
    model: Any,
    device: torch.device,
    image: Image.Image,
    k: int = 5,
) -> List[Dict[str, Any]]:
    inputs = processor(images=image, return_tensors="pt")
    inputs = {k: v.to(device) for k, v in inputs.items()}
    outputs = model(**inputs)
    logits = outputs.logits

    probs = torch.softmax(logits, dim=-1).detach().cpu().numpy()[0]
    topk_idx = np.argsort(probs)[::-1][:k]

    id2label = getattr(model.config, "id2label", {}) or {}

    preds: List[Dict[str, Any]] = []
    for idx in topk_idx:
        label = id2label.get(int(idx), str(int(idx)))
        preds.append({"label": label, "score": float(probs[int(idx)])})
    return preds
