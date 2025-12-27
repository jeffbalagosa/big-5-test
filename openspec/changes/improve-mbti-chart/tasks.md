# Tasks: Improve MBTI Chart Visualization

- [ ] **Research & Setup**
  - [ ] Verify current MBTI plotting tests in `tests/test_mbti_plotting.py` <!-- id: 0 -->
- [ ] **Implementation**
  - [ ] Update `create_mbti_bar_graph` in `modules/plotting.py` to implement the diverging bar chart <!-- id: 1 -->
    - [ ] Implement clarity index calculation: `(pct - 50) * 2`
    - [ ] Set up diverging x-axis (-100 to 100)
    - [ ] Add bold centerline at 0
    - [ ] Update labels and pole positioning (I-E, N-S, T-F, J-P)
  - [ ] Ensure `modules/pdf_report.py` correctly handles the updated chart <!-- id: 2 -->
- [ ] **Verification**
  - [ ] Update/Add tests in `tests/test_mbti_plotting.py` to validate the new chart format <!-- id: 3 -->
  - [ ] Run `pytest tests/test_mbti_plotting.py` <!-- id: 4 -->
  - [ ] Manually verify PDF output by running the MBTI test and generating a report <!-- id: 5 -->
