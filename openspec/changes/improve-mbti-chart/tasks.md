# Tasks: Improve MBTI Chart Visualization

- [x] **Research & Setup**
  - [x] Verify current MBTI plotting tests in `tests/test_mbti_plotting.py` <!-- id: 0 -->
- [x] **Implementation**
  - [x] Update `create_mbti_bar_graph` in `modules/plotting.py` to implement the diverging bar chart <!-- id: 1 -->
    - [x] Implement clarity index calculation: `(pct - 50) * 2`
    - [x] Set up diverging x-axis (-100 to 100)
    - [x] Add bold centerline at 0
    - [x] Update labels and pole positioning (I-E, N-S, T-F, J-P)
  - [x] Ensure `modules/pdf_report.py` correctly handles the updated chart <!-- id: 2 -->
- [x] **Verification**
  - [x] Update/Add tests in `tests/test_mbti_plotting.py` to validate the new chart format <!-- id: 3 -->
  - [x] Run `pytest tests/test_mbti_plotting.py` <!-- id: 4 -->
  - [x] Manually verify PDF output by running the MBTI test and generating a report <!-- id: 5 -->
