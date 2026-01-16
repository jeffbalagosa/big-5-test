# Design: Shared Scoring Engine

## Context

The application provides two interfaces (React web app and Python CLI) that both need to score personality test responses. Currently, each interface has its own implementation:
- React: TypeScript in `src/utils/scoring.ts`
- Python CLI: Python in `modules/scoring.py`

The algorithms are logically identical but implemented in different languages, leading to:
- Code duplication and maintenance burden
- Risk of divergence if one implementation is updated without the other
- Double the testing surface for scoring logic
- No single source of truth for scoring algorithms

Constraints:
- Both interfaces must produce identical results for the same inputs
- React app runs in browser (needs JavaScript)
- Python CLI must remain Python-based for its core functionality
- Node.js is already required for frontend development
- Solution must not significantly degrade performance

## Goals / Non-Goals

**Goals:**
- Single implementation of scoring logic used by both interfaces
- Maintain scoring correctness and produce identical results
- Simplify maintenance by eliminating code duplication
- Make scoring logic testable in one place

**Non-Goals:**
- Rewriting the Python CLI entirely in Node.js
- Optimizing scoring performance (current performance is acceptable)
- Adding new scoring algorithms (focus is on consolidation)
- Creating a general-purpose polyglot library system

## Decisions

### Decision 1: JavaScript as the Shared Language

**What:** Implement scoring logic as a standalone JavaScript/Node.js library that both interfaces can use.

**Why:**
- React already requires JavaScript, so no new runtime for frontend
- Node.js can be executed from Python via subprocess with minimal overhead
- JavaScript is the only language that can run natively in both browser and Node.js
- Allows progressive migration (can test in isolation)

**Alternatives considered:**
1. **Python with TypeScript wrapper** - Would require maintaining two implementations, defeats the purpose
2. **WebAssembly (WASM)** - Adds significant complexity for compilation, tooling, debugging; overkill for simple arithmetic
3. **JSON-based declarative spec** - Would still require two interpreters; doesn't handle edge cases and validation logic well

### Decision 2: Library Structure

**What:** Create `lib/scoring/` as a standalone Node.js package with:
- `index.js` - Main entry point with `scoreBig5()` and `scoreMBTI()` functions
- `package.json` - Minimal dependencies (none expected for pure math)
- Unit tests colocated
- CLI wrapper that accepts JSON input via stdin, outputs JSON to stdout

**Why:**
- Standalone package can be tested independently
- JSON stdin/stdout is a universal IPC mechanism
- Pure functions with no side effects are easy to reason about
- Minimal API surface reduces maintenance

### Decision 3: Python Integration via Subprocess

**What:** Python CLI will invoke Node.js scoring library via `subprocess.run()`, passing responses as JSON.

**Implementation:**
```python
# modules/scoring_bridge.py
import subprocess
import json

def score_big5_nodejs(responses, questions):
    input_data = json.dumps({
        "answers": {str(q.id): r for q, r in zip(questions, responses)},
        "questions": [{"id": q.id, "trait": q.trait, "reverse": q.reverse} for q in questions],
        "test_type": "big5"
    })

    result = subprocess.run(
        ["node", "lib/scoring/cli.js"],
        input=input_data,
        capture_output=True,
        text=True,
        check=True
    )

    return json.loads(result.stdout)
```

**Why:**
- Subprocess is reliable and well-supported in Python
- JSON is human-readable for debugging
- No Python-Node bindings needed (avoids native modules)
- Clear separation of concerns

**Trade-offs:**
- Small performance overhead from process spawn (~10-50ms) - acceptable for CLI use
- Requires Node.js to be installed and in PATH
- Error handling across process boundary needs care

### Decision 4: React Integration via Direct Import

**What:** React app imports scoring functions directly:
```typescript
import { scoreBig5, scoreMBTI } from '../../../lib/scoring';
```

**Why:**
- No changes to React app's runtime model
- Direct function calls (no IPC overhead)
- TypeScript can consume JavaScript with type definitions
- Vite handles the module bundling

## Risks / Trade-offs

### Risk 1: Node.js Dependency for CLI
**Risk:** Users must have Node.js installed to run the Python CLI.
**Mitigation:**
- Document in README and installation instructions
- Check for Node.js at CLI startup with helpful error message
- Consider bundling Node.js binary in future if distribution becomes complex

### Risk 2: Type Safety Loss
**Risk:** JavaScript is not strongly typed like TypeScript.
**Mitigation:**
- Provide TypeScript declaration files (`.d.ts`) for the scoring library
- Maintain comprehensive unit tests with edge cases
- Use JSDoc comments for inline documentation

### Risk 3: Process Spawn Overhead
**Risk:** Subprocess calls add latency compared to native Python.
**Mitigation:**
- Benchmark actual overhead (expected <50ms, negligible for CLI)
- If performance becomes an issue, can batch multiple scoring operations
- Most CLI time is user interaction, not computation

### Risk 4: Error Handling Complexity
**Risk:** Errors in Node.js process must be caught and translated to Python exceptions.
**Mitigation:**
- Standardize error output format (JSON with error field)
- Wrap subprocess calls with try-catch and clear error messages
- Log both stdout and stderr for debugging

## Migration Plan

### Phase 1: Create Shared Library
1. Extract scoring logic from `src/utils/scoring.ts` to `lib/scoring/index.js`
2. Add CLI wrapper (`lib/scoring/cli.js`) for stdin/stdout interface
3. Add comprehensive unit tests for the shared library
4. Validate that results match current TypeScript implementation

### Phase 2: Migrate React App
1. Create TypeScript declaration file for scoring library
2. Update `src/utils/scoring.ts` to re-export from shared library
3. Run existing tests to verify compatibility
4. Update imports throughout React codebase
5. Remove old implementation code

### Phase 3: Migrate Python CLI
1. Create `modules/scoring_bridge.py` with subprocess integration
2. Update `modules/cli.py` to use bridge instead of native scoring
3. Add integration tests to verify Python-Node communication
4. Update documentation with Node.js requirement
5. Remove old `modules/scoring.py` implementation

### Phase 4: Validation
1. Run full test suite (Python + TypeScript)
2. Perform manual end-to-end testing of both interfaces
3. Compare scoring outputs between old and new implementations
4. Update CI/CD to ensure Node.js is available for tests

### Rollback Plan
- Keep old scoring implementations in git history
- If critical issues found, can temporarily revert imports to old code
- Each phase is independently reversible

## Open Questions

None at this time. The approach is straightforward and all major decisions have been made.
