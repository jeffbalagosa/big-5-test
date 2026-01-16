# Change: Add Shared Scoring Engine

## Why

The Big-5 Test application currently maintains two separate implementations of scoring logic: one in TypeScript (src/utils/scoring.ts) for the React web interface and one in Python (modules/scoring.py) for the CLI. This duplication creates maintenance burden, increases the risk of scoring inconsistencies between interfaces, and violates the DRY principle. Any changes to scoring algorithms must be implemented twice, tested twice, and kept in sync manually.

## What Changes

- Create a standalone JavaScript/Node.js scoring library (`lib/scoring/`) that implements all scoring logic
- **BREAKING**: Python CLI will execute the Node.js scoring library via subprocess instead of using native Python scoring
- React app will import the shared scoring library directly (no breaking change for frontend)
- Remove duplicated scoring code from both Python and TypeScript implementations
- Add Node.js as a runtime dependency for the Python CLI
- Ensure scoring results are bit-for-bit identical between interfaces

## Impact

- **Affected specs**: `personality-tests`, `development-tooling`
- **Affected code**:
  - `modules/scoring.py` (removed/replaced with Node.js bridge)
  - `src/utils/scoring.ts` (replaced with import from shared lib)
  - `src/utils/scoring.test.ts` (updated to test shared lib)
  - `tests/test_big_5.py` (may need updates for integration testing)
  - New files: `lib/scoring/index.js`, `lib/scoring/package.json`, bridge code in Python
- **Dependencies**: Adds Node.js as a runtime requirement for Python CLI (already required for frontend dev)
