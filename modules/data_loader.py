"""Data loading utilities for the Big-Five questionnaire."""

from typing import List
import yaml
from modules.models import Item


def load_questions_from_yaml(path: str) -> List[Item]:
    """Load questionnaire items from a YAML file."""
    with open(path, "r", encoding="utf-8") as f:
        data = yaml.safe_load(f)
    items = []
    for entry in data["items"]:
        items.append(
            Item(
                text=entry["text"],
                trait=entry["trait"],
                reverse=entry.get("reverse", False),
            )
        )
    return items
