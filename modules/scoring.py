"""Compatibility layer forwarding scoring calls to the shared Node.js bridge."""

from modules.scoring_bridge import (
    get_mbti_type,
    score_big5_nodejs,
    score_mbti_nodejs,
)

__all__ = [
    "score_big5_nodejs",
    "score_mbti_nodejs",
    "get_mbti_type",
]
