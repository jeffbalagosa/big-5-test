import yaml
import json
import os


def convert_yaml_to_json(yaml_path, json_path):
    with open(yaml_path, "r", encoding="utf-8") as f:
        data = yaml.safe_load(f)

    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)
    print(f"Converted {yaml_path} to {json_path}")


if __name__ == "__main__":
    config_dir = "config"
    output_dir = "src/data"

    files = [
        ("questionnaire.yaml", "questionnaire.json"),
        ("questionnaire-child.yaml", "questionnaire-child.json"),
        ("mbti.yaml", "mbti.json"),
    ]

    for yaml_file, json_file in files:
        yaml_path = os.path.join(config_dir, yaml_file)
        json_path = os.path.join(output_dir, json_file)
        if os.path.exists(yaml_path):
            convert_yaml_to_json(yaml_path, json_path)
        else:
            print(f"Warning: {yaml_path} not found")
