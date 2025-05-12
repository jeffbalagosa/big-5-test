"""
Unit tests for data loading utilities for the Big Five PDF report feature.
"""

import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import tempfile
import pandas as pd
import pytest
from modules import data_loader


def test_load_data_csv():
    csv_content = """Category,Score\nOpenness,32\nConscientiousness,28\nExtraversion,25\nAgreeableness,30\nNeuroticism,18\n"""
    with tempfile.NamedTemporaryFile(mode="w+", suffix=".csv", delete=False) as tmp:
        tmp.write(csv_content)
        tmp_path = tmp.name
    try:
        df = data_loader.load_data(tmp_path)
        assert isinstance(df, pd.DataFrame)
        assert list(df.columns) == ["Category", "Score"]
        assert df.shape == (5, 2)
        assert df["Category"].iloc[0] == "Openness"
        assert df["Score"].iloc[4] == 18
    finally:
        os.remove(tmp_path)


def test_load_data_yaml():
    yaml_content = """
items:
  - Category: Openness
    Score: 32
  - Category: Conscientiousness
    Score: 28
  - Category: Extraversion
    Score: 25
  - Category: Agreeableness
    Score: 30
  - Category: Neuroticism
    Score: 18
"""
    with tempfile.NamedTemporaryFile(mode="w+", suffix=".yaml", delete=False) as tmp:
        tmp.write(yaml_content)
        tmp_path = tmp.name
    try:
        df = data_loader.load_data(tmp_path)
        assert isinstance(df, pd.DataFrame)
        assert list(df.columns) == ["Category", "Score"]
        assert df.shape == (5, 2)
        assert df["Category"].iloc[1] == "Conscientiousness"
        assert df["Score"].iloc[3] == 30
    finally:
        os.remove(tmp_path)


def test_load_data_json():
    json_content = '[{"Category": "Openness", "Score": 32}, {"Category": "Conscientiousness", "Score": 28}, {"Category": "Extraversion", "Score": 25}, {"Category": "Agreeableness", "Score": 30}, {"Category": "Neuroticism", "Score": 18}]'
    with tempfile.NamedTemporaryFile(mode="w+", suffix=".json", delete=False) as tmp:
        tmp.write(json_content)
        tmp_path = tmp.name
    try:
        df = data_loader.load_data(tmp_path)
        assert isinstance(df, pd.DataFrame)
        assert list(df.columns) == ["Category", "Score"]
        assert df.shape == (5, 2)
        assert df["Category"].iloc[2] == "Extraversion"
        assert df["Score"].iloc[0] == 32
    finally:
        os.remove(tmp_path)


def test_load_data_invalid():
    with tempfile.NamedTemporaryFile(mode="w+", suffix=".txt", delete=False) as tmp:
        tmp.write("not a valid format")
        tmp_path = tmp.name
    try:
        with pytest.raises(ValueError):
            data_loader.load_data(tmp_path)
    finally:
        os.remove(tmp_path)
