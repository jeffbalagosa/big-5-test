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
        # Support both 'trait' and 'dimension' keys
        trait = entry.get("trait", entry.get("dimension", ""))
        dimension = entry.get("dimension", trait)
        items.append(
            Item(
                text=entry["text"],
                trait=trait,
                dimension=dimension,
                reverse=entry.get("reverse", False),
            )
        )
    return items


def load_questionnaire(test_type: str = "big5") -> List[Item]:
    """Load the appropriate questionnaire based on test type."""
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    config_dir = os.path.join(base_dir, "config")

    if test_type == "mbti":
        path = os.path.join(config_dir, "mbti.yaml")
    else:
        path = os.path.join(config_dir, "questionnaire.yaml")

    return load_questions_from_yaml(path)


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
