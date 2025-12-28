# Design: Child-Friendly Big-5 Questionnaire

## Overview

This change adds support for administering the Big-5 personality test to 12-year-olds using age-appropriate language while maintaining the same underlying trait measurement structure.

## Key Design Decisions

### 1. Separate Configuration File

**Decision**: Create a new `questionnaire-child.yaml` rather than embedding variants in the same file.

**Rationale**:

- Clean separation of concerns
- Easier to maintain and update independently
- Follows existing pattern (`questionnaire.yaml` vs `mbti.yaml`)
- Allows for potential future age groups without complicating schema

### 2. CLI Parameter Design

**Decision**: Use a simple `--child` boolean flag.

**Rationale**:

- Minimal, intuitive interface
- No flag = adult (default), `--child` = child-friendly version
- Only applies to Big-5 test (MBTI remains unchanged for now)
- Default preserves backward compatibility

### 3. Language Simplification Guidelines

The child-friendly questions will:

- Use simpler vocabulary (reading level appropriate for 12-year-olds)
- Replace abstract concepts with concrete examples
- Use school/home context instead of workplace scenarios
- Avoid philosophical or complex emotional concepts
- Maintain the same trait mapping and reverse-scoring logic

### 4. File Loading Logic

**Decision**: Extend `load_questionnaire()` to accept an optional `child` boolean parameter.

```python
def load_questionnaire(test_type: str = "big5", child: bool = False) -> List[Item]:
```

File selection logic:

- `test_type="mbti"` + `child=True` → display "Coming Soon" and exit
- `test_type="mbti"` + `child=False` → `mbti.yaml`
- `test_type="big5"` + `child=False` → `questionnaire.yaml`
- `test_type="big5"` + `child=True` → `questionnaire-child.yaml`

## Alternative Considered

### Single File with Age Variants

Could use a structure like:

```yaml
items:
  - text: I enjoy trying new things.
    text_child: I like trying new things.
    trait: Openness
```

**Rejected because**:

- Complicates YAML schema
- Harder to read and maintain
- Requires more complex loading logic
- Doesn't scale well for multiple age groups
