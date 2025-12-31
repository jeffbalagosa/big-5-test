# react-frontend Specification Delta

## MODIFIED Requirements

### Requirement: Navigation Drawer Layout

The frontend SHALL provide a persistent left-side navigation sidebar for accessing all application sections.

#### Scenario: Persistent sidebar display (desktop)

- **WHEN** the user loads the application on a viewport >= 768px
- **THEN** a navigation sidebar is visible on the left side in either collapsed or expanded state
- **AND** the sidebar does not overlay the main content

#### Scenario: Collapsed sidebar state

- **WHEN** the sidebar is in collapsed state
- **THEN** only navigation icons are visible (no labels)
- **AND** the sidebar width is approximately 60px
- **AND** a toggle button is visible to expand the sidebar

#### Scenario: Expanded sidebar state

- **WHEN** the sidebar is in expanded state
- **THEN** navigation icons and labels are visible
- **AND** a toggle button is visible to collapse the sidebar

#### Scenario: Sidebar resize (expanded)

- **WHEN** the sidebar is expanded
- **AND** the user drags the right edge of the sidebar
- **THEN** the sidebar width adjusts within the range of 200px to 400px

#### Scenario: Sidebar state persistence

- **WHEN** the user changes the sidebar collapsed/expanded state or width
- **THEN** the preference is saved to localStorage
- **AND** the preference is restored on subsequent page loads

#### Scenario: Navigation sidebar mobile collapse

- **WHEN** the viewport width is less than 768px
- **THEN** the sidebar is hidden by default
- **AND** a hamburger menu button is visible to open it as an overlay

#### Scenario: Navigation sidebar mobile overlay

- **WHEN** the user clicks the hamburger menu icon on mobile
- **THEN** the navigation sidebar slides in from the left as an overlay
- **AND** clicking outside the sidebar closes it

## REMOVED Requirements

### Requirement: Top Header Bar

~~The frontend SHALL provide a top header bar with application title and menu button.~~

**Reason**: Navigation is now handled entirely by the persistent sidebar.
