# Design QA — checkpoint 10

- Design-system source: `C:\Users\Admin\.codex\generated_images\01a1be91-54e9-7892-9008-60f43fad2cca\exec-2e04ded1-6dd3-4790-afc5-cbd3d8ed9399.png`
- Desktop implementation: `C:\Users\Admin\AppData\Local\Temp\estacao-ribeirinha-checkpoint-10-notices-1440.png`
- Mobile implementation: `C:\Users\Admin\AppData\Local\Temp\estacao-ribeirinha-checkpoint-10-notices-mobile-final.png`
- Side-by-side comparison: `C:\Users\Admin\AppData\Local\Temp\estacao-ribeirinha-checkpoint-10-notices-comparison.png`
- Source pixels: 1487 × 1058
- Desktop CSS viewport: 1280 × 720; implementation pixels: 1265 × 1352
- Mobile CSS viewport: 390 × 844; implementation pixels: 375 × 2388
- Density normalization: device scale 1; source and desktop implementation shown together in the combined comparison
- State: Gestão route, Avisos tab, Estacao Arara Azul, original notices after temporary test cleanup

## Scope and source relationship

This checkpoint completes the third management entity while preserving the
approved public-service visual language. The layout reuses the open form/table
composition from station and reading management, with clear semantic badges for
notice level and lifecycle status.

The page implements real create, read, update and delete operations for
`/avisos`. Form constraints mirror the Java business rules: 100-character
title, 500-character message, fixed level/status values and no future date.

## Full-view comparison

- Product header, active Gestão navigation, page title, tabs and section rhythm
  remain consistent with the approved application shell.
- Station selection uses the established labelled blue selector.
- The form/table split avoids nested cards and keeps publishing beside the
  resulting notices on desktop.
- Level and status badges apply color only where it communicates operational
  meaning; the page adds no gradient, glass effect or decorative animation.

## Interaction and API evidence

- Initial GET loaded original notices #1 and #2 for station 1.
- A temporary Atenção/Ativo notice was created through the browser form as #21
  for station 5.
- Notice #21 was edited to a new title and message, Crítico level and Encerrado
  status; the refreshed table showed every changed value.
- Delete opened an alert dialog naming #21 and its title, with initial focus on
  Cancelar; cancelling preserved the record.
- Temporary notice #21 was removed with API `204`; a subsequent GET proved zero
  notices for station 5 and `temporary_present=False`.
- Original notices were not modified.
- `npm run lint`, `npm run build` and `git diff --check` passed.

## Responsive evidence

- Desktop uses a balanced form/table split with all actions visible.
- Mobile was checked at 390 × 844 without horizontal page overflow.
- Notice level and status stack at the narrow breakpoint so every option remains
  fully legible.
- Notices become labelled vertical records with content-sized badges and action
  controls.

## Accessibility evidence

- Page, entity section, form and notice list have programmatic headings.
- Entity tabs and station selectors expose native and ARIA state.
- Every input has a visible label, native required state, length constraint or
  datetime maximum matching the backend contract.
- Table headers, time values, status feedback and the alert dialog are semantic,
  with initial focus on the safe delete action.
- Loading, API failure, empty-station and empty-notice states are present.

## Above-the-fold copy diff

Product identity and navigation are unchanged. The Avisos title and field labels
are functional copy derived from the backend entity. No unsupported official
claim or decorative label was introduced.

## Findings

The initial 390 px review exposed a status select too narrow for “Encerrado”.
Level and status now stack below 480 px. No actionable P0, P1 or P2 mismatch
remains within the checkpoint scope.

## Follow-up polish

- Final brand/disclaimer, route fallback, documentation and deployment checks
  remain for application-wide finishing.

final result: passed
