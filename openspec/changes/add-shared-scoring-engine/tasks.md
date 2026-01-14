# Implementation Tasks

## 1. Setup Infrastructure

- [ ] 1.1 Create `lib/scoring/` directory structure
- [ ] 1.2 Create `lib/scoring/package.json` with minimal configuration (name, version, main entry point, test script)
- [ ] 1.3 Update `.gitignore` to exclude `lib/scoring/node_modules/` if using npm dependencies
- [ ] 1.4 Choose and document test framework (Jest or Node.js native test runner)
- [ ] 1.5 Create `lib/scoring/test-fixtures.json` with sample questions and expected scoring results for validation

## 2. Implement Shared Scoring Library

- [ ] 2.1 Create `lib/scoring/index.js` with module structure and exports
- [ ] 2.2 Implement `scoreLikertItem(response, reverse, maxVal)` helper function with reverse scoring logic
- [ ] 2.3 Implement `isValidLikertResponse(response, maxVal)` validation function
- [ ] 2.4 Implement `scoreBig5(answers, questions, maxVal=5)` with trait accumulation and percentage calculation
- [ ] 2.5 Implement `scoreMBTI(answers, questions, maxVal=6)` with dichotomy calculation and type code generation
- [ ] 2.6 Add JSDoc comments to all exported functions for documentation

## 3. Create CLI Wrapper for Scoring Library

- [ ] 3.1 Create `lib/scoring/cli.js` that reads JSON from stdin
- [ ] 3.2 Implement JSON parsing with error handling for malformed input
- [ ] 3.3 Implement input validation for required fields (answers, questions, test_type)
- [ ] 3.4 Implement test_type routing (call scoreBig5 or scoreMBTI based on input)
- [ ] 3.5 Implement JSON output to stdout with standardized format
- [ ] 3.6 Implement error output to stdout as JSON with "error" field for all failure cases

## 4. Create TypeScript Definitions

- [ ] 4.1 Create `lib/scoring/index.d.ts` with TypeScript type definitions
- [ ] 4.2 Define `Question` interface (id, trait, reverse)
- [ ] 4.3 Define `Big5Scores` interface (Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism)
- [ ] 4.4 Define `MBTIScores` interface (E, I, S, N, T, F, J, P, type)
- [ ] 4.5 Define function signatures for `scoreBig5()` and `scoreMBTI()`

## 5. Test Shared Scoring Library

- [ ] 5.1 Create `lib/scoring/index.test.js` with test framework setup
- [ ] 5.2 Add unit tests for `scoreLikertItem()` covering normal and reverse scoring
- [ ] 5.3 Add unit tests for `isValidLikertResponse()` covering valid and invalid inputs
- [ ] 5.4 Add unit tests for `scoreBig5()` using test fixtures (all traits represented)
- [ ] 5.5 Add unit tests for `scoreMBTI()` using test fixtures (all dichotomies represented)
- [ ] 5.6 Add unit tests for edge cases (missing responses, empty questions array, invalid maxVal)
- [ ] 5.7 Create `lib/scoring/cli.test.js` for integration tests
- [ ] 5.8 Add integration tests for CLI stdin/stdout communication (successful scoring, error cases)
- [ ] 5.9 Run `npm test` in `lib/scoring/` directory to verify all tests pass

## 6. Migrate React App to Shared Library

- [ ] 6.1 Create `lib/scoring/index.test.ts` to verify TypeScript definitions work correctly
- [ ] 6.2 Update Vite configuration (`vite.config.ts`) if needed to resolve `lib/scoring` path
- [ ] 6.3 Update `src/utils/scoring.ts` to import `scoreBig5` and `scoreMBTI` from `../../../lib/scoring/index.js`
- [ ] 6.4 Replace implementation with thin wrapper functions that call shared library with proper TypeScript types
- [ ] 6.5 Update `src/utils/scoring.test.ts` imports to test the new wrapper functions
- [ ] 6.6 Run `npm run test` to verify all frontend unit tests pass
- [ ] 6.7 Run `npm run lint` to verify no linting issues introduced
- [ ] 6.8 Start dev server and manually test one Big-5 and one MBTI questionnaire completion

## 7. Audit Python Codebase for Scoring Dependencies

- [ ] 7.1 Search codebase with `grep -r "from modules.scoring import\|from modules import scoring\|import modules.scoring" .` to find all imports
- [ ] 7.2 Document all files that import from `modules/scoring` (expected: `modules/cli.py`, `main.py`, `tests/test_big_5.py`)
- [ ] 7.3 Review each file to understand how scoring functions are called

## 8. Create Python-Node.js Bridge

- [ ] 8.1 Create `modules/scoring_bridge.py` module with docstring explaining architecture
- [ ] 8.2 Implement `check_nodejs_available()` function that checks `node` command in PATH
- [ ] 8.3 Implement `_prepare_scoring_input(responses, questionnaire, test_type)` to convert Python data to JSON
- [ ] 8.4 Implement `_invoke_nodejs_scoring(json_input)` to spawn Node.js subprocess and capture output
- [ ] 8.5 Implement `_parse_scoring_output(stdout)` to parse JSON and return Python dict
- [ ] 8.6 Implement `score_big5_nodejs(responses, questionnaire)` public function
- [ ] 8.7 Implement `score_mbti_nodejs(responses, questionnaire)` public function
- [ ] 8.8 Add error handling for FileNotFoundError (Node.js not found), subprocess.CalledProcessError, and JSONDecodeError
- [ ] 8.9 Add informative error messages with troubleshooting guidance for Node.js installation

## 9. Migrate Python CLI to Use Bridge

- [ ] 9.1 Update imports in `modules/cli.py` to import from `scoring_bridge` instead of `scoring`
- [ ] 9.2 Replace `score_responses()` calls with `score_big5_nodejs()`
- [ ] 9.3 Replace `score_mbti_responses()` calls with `score_mbti_nodejs()`
- [ ] 9.4 Update imports in `main.py` if it imports scoring functions directly
- [ ] 9.5 Replace any scoring function calls in `main.py` with bridge equivalents
- [ ] 9.6 Add Node.js availability check at application startup with clear error message if missing

## 10. Test Python Bridge Integration

- [ ] 10.1 Create `tests/test_scoring_bridge.py` for bridge-specific tests
- [ ] 10.2 Add unit test for `check_nodejs_available()` (mock subprocess)
- [ ] 10.3 Add unit test for `_prepare_scoring_input()` verifying JSON structure
- [ ] 10.4 Add integration test for `score_big5_nodejs()` with real Node.js subprocess
- [ ] 10.5 Add integration test for `score_mbti_nodejs()` with real Node.js subprocess
- [ ] 10.6 Add test for error scenario: Node.js not in PATH (mock FileNotFoundError)
- [ ] 10.7 Add test for error scenario: invalid JSON from Node.js process
- [ ] 10.8 Update `tests/test_big_5.py` to mock or use bridge-based scoring
- [ ] 10.9 Run `pytest` to verify all Python tests pass

## 11. Update Documentation and Infrastructure

- [ ] 11.1 Update `README.md` "Requirements" section to list Node.js v18+ as runtime dependency
- [ ] 11.2 Add "Installation" section to `README.md` with Node.js setup instructions
- [ ] 11.3 Add "Architecture" section to `README.md` explaining shared scoring library approach
- [ ] 11.4 Check if `Dockerfile` exists and update it to install Node.js if present
- [ ] 11.5 Check if `.github/workflows/*.yml` exist and update CI to install Node.js if present
- [ ] 11.6 Update pre-commit hooks configuration if it validates or runs scoring logic
- [ ] 11.7 Add inline code comments in `modules/scoring_bridge.py` explaining subprocess communication

## 12. Remove Old Scoring Implementation

- [ ] 12.1 Review `modules/scoring.py` and identify which functions are no longer needed
- [ ] 12.2 Delete `score_responses()` and `score_mbti_responses()` from `modules/scoring.py`
- [ ] 12.3 Delete `_score_item()` helper if not used elsewhere
- [ ] 12.4 Delete entire `modules/scoring.py` file if no other functions remain
- [ ] 12.5 Search codebase again with grep to verify no files import deleted functions
- [ ] 12.6 Remove `modules/scoring.py` from any explicit import lists or documentation

## 13. Final Validation and Quality Assurance

- [ ] 13.1 Run `pytest` for complete Python test suite
- [ ] 13.2 Run `npm run test` for complete frontend test suite
- [ ] 13.3 Run `npm run test:e2e` for end-to-end flow verification
- [ ] 13.4 Run `scripts/pre-certify.ps1` to verify all quality checks pass
- [ ] 13.5 Benchmark subprocess overhead: measure time for 10 scoring operations
- [ ] 13.6 Manually test Python CLI: Big-5 test with PDF generation
- [ ] 13.7 Manually test Python CLI: MBTI test with PDF generation
- [ ] 13.8 Manually test Python CLI: Child-friendly Big-5 variant
- [ ] 13.9 Manually test React app: Big-5 test with PDF export
- [ ] 13.10 Manually test React app: MBTI test with PDF export
- [ ] 13.11 Compare scoring outputs: run identical test in both interfaces and verify results match
- [ ] 13.12 Test error handling: temporarily rename `node` executable and verify helpful error appears
- [ ] 13.13 Test Docker build and run if Docker support exists
- [ ] 13.14 Review all modified files for code quality, documentation, and consistency
- [ ] 13.15 Create pull request with descriptive title and link to this proposal
- [ ] 13.16 Request code review from team
