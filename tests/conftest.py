from __future__ import annotations

import sys
from pathlib import Path


def pytest_configure() -> None:
    """Ensure project root is importable during tests.

    Some environments run pytest with an import mode that does not automatically
    put the repository root on sys.path, which breaks imports like
    `from modules...` and `import main`.
    """

    project_root = Path(__file__).resolve().parents[1]
    project_root_str = str(project_root)

    if project_root_str not in sys.path:
        sys.path.insert(0, project_root_str)
