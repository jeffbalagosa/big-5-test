# main-layout-width Specification Delta

**Capability**: Main Content Area Full Width

**Related specs**: react-frontend

## MODIFIED Requirements

### Requirement: Navigation Drawer Layout

The frontend SHALL provide a persistent left-side navigation sidebar for accessing all application sections **and ensure the main content area utilizes full available width**.

#### Scenario: Main content area uses full width

- **WHEN** the application renders on any viewport size
- **THEN** the main content element (`<main>`) takes 100% of the available width within its container
- **AND** no maximum width constraint is applied to the main element
- **AND** the main element adapts to sidebar collapsed/expanded states

#### Scenario: Main content width on desktop with expanded sidebar

- **GIVEN** the viewport width is >= 768px
- **AND** the sidebar is in expanded state (e.g., 250px width)
- **WHEN** the main content renders
- **THEN** the main element occupies 100% of the remaining horizontal space
- **AND** content padding is applied via the existing padding property

#### Scenario: Main content width on desktop with collapsed sidebar

- **GIVEN** the viewport width is >= 768px
- **AND** the sidebar is in collapsed state (e.g., 60px width)
- **WHEN** the main content renders
- **THEN** the main element occupies 100% of the remaining horizontal space
- **AND** has more available width than when sidebar is expanded

#### Scenario: Main content width on mobile

- **GIVEN** the viewport width is < 768px
- **WHEN** the main content renders
- **THEN** the main element occupies 100% of the viewport width
- **AND** the sidebar is hidden (overlay mode)

#### Scenario: No arbitrary max-width constraint

- **WHEN** the main content element renders
- **THEN** no `maxWidth` inline style or CSS property constrains the main element width
- **AND** the element can grow to utilize all available space in its flex container
