"""Data loading utilities for the Big-Five questionnaire."""

from typing import List
import yaml
import pandas as pd
import json
import os
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


"""
Data loading utilities for Big Five PDF report generation.
"""


def load_data(filepath):
    """
    Load and validate input data from CSV, JSON, or YAML.
    Returns a pandas DataFrame.
    """
    ext = os.path.splitext(filepath)[1].lower()
    if ext == ".csv":
        return pd.read_csv(filepath)
    elif ext in (".yaml", ".yml"):
        with open(filepath, "r", encoding="utf-8") as f:
            data = yaml.safe_load(f)
        # If YAML has 'items' key, use it; else, use root
        items = data["items"] if isinstance(data, dict) and "items" in data else data
        return pd.DataFrame(items)
    elif ext == ".json":
        with open(filepath, "r", encoding="utf-8") as f:
            data = json.load(f)
        return pd.DataFrame(data)
    else:
        raise ValueError(f"Unsupported file format: {ext}")
