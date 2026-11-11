# Design QA — checkpoint 9

- Design-system source: `C:\Users\Admin\.codex\generated_images\01a1be91-54e9-7892-9008-60f43fad2cca\exec-2e04ded1-6dd3-4790-afc5-cbd3d8ed9399.png`
- Desktop implementation: `C:\Users\Admin\AppData\Local\Temp\estacao-ribeirinha-checkpoint-9-readings-1440.png`
- Mobile implementation: `C:\Users\Admin\AppData\Local\Temp\estacao-ribeirinha-checkpoint-9-readings-mobile.png`
- Side-by-side comparison: `C:\Users\Admin\AppData\Local\Temp\estacao-ribeirinha-checkpoint-9-readings-comparison.png`
- Source pixels: 1487 × 1058
- Desktop CSS viewport: 1440 × 1024; implementation pixels: 1425 × 1070
- Mobile CSS viewport: 390 × 844; implementation pixels: 375 × 1735
- Density normalization: device scale 1; source and desktop implementation shown together in the combined comparison
- State: Gestão route, Leituras tab, Estacao Arara Azul, original reading #1 after temporary test cleanup

## Scope and source relationship

This checkpoint extends the approved public-service design system to the second
management entity. It reuses the same open form/table composition established
for stations, while giving water level, battery, timestamp and trend the data
hierarchy already visible in the approved overview.

The page implements real create, read, update and delete operations for
`/leituras`. It follows the backend distinction between automatic trend
calculation on create and explicit trend validation on update.

## Full-view comparison

- Product header, active Gestão navigation, page title, tabs and section rhythm
  remain consistent with the approved application shell.
- Station selection uses the established labelled blue selector.
- The form/table split avoids nested cards and keeps data entry beside the
  resulting records on desktop.
- Level, battery, timestamp and trend are presented in a compact civic-service
  table with restrained semantic labels.
- Mobile preserves the native controls and turns the table row into a labelled
  record without horizontal overflow.

## Required fidelity surfaces

- Fonts and typography: Source Sans 3 and the established heading, control,
  table and button weights are preserved.
- Spacing and layout rhythm: tabs, station selector, form fields, informational
  note, table header and row dividers follow the same spacing scale as the rest
  of the application.
- Colors and tokens: existing blue, green and neutral tokens carry hierarchy
  and trend meaning; no gradient, glass or decorative animation was added.
- Image and asset quality: no raster imagery is needed. Phosphor edit/delete
  icons remain consistent with the station CRUD.
- Copy and content: labels mirror the Java entity and validations; displayed
  readings come from the public API.

## Interaction and API evidence

- Initial GET loaded original reading #1 for station 1.
- A temporary 150.5 cm / 77% reading was created through the browser form as
  #21; the API calculated its trend as Subindo.
- Reading #21 was edited to 151.5 cm / 76% with trend Estável, and the refreshed
  table showed every changed value.
- Delete opened an alert dialog naming #21 and 151.5 cm, with initial focus on
  Cancelar; cancelling preserved the record.
- Temporary reading #21 was removed with API `204`; a subsequent GET proved one
  remaining reading, ID #1, and `TemporaryStillExists: false`.
- Original readings were not modified.
- A fresh browser tab produced no console errors.
- `npm run lint`, `npm run build` and `git diff --check` passed.

## Responsive evidence

- Desktop uses a balanced form/table split with all actions visible.
- Mobile checked at 390 × 844 with scroll width equal to client width.
- Level and battery retain a compact paired layout; the native datetime control
  remains readable and tappable.
- The single reading becomes a labelled vertical record with content-sized
  trend and action controls.

## Accessibility evidence

- Page, entity section, form and reading list have programmatic headings.
- Entity tabs and station selectors expose native and ARIA state.
- Every input has a visible label, numeric min/max/step rules and a datetime
  maximum that prevents future values.
- The automatic-trend rule is visible before submission; edit mode exposes the
  required trend select.
- Table headers, time values, status/alert feedback and the alert dialog are
  semantic, with initial focus on the safe delete action.
- Loading, API failure, empty-station and empty-reading states are present.

## Above-the-fold copy diff

Product identity and navigation are unchanged. The Leituras title, backend-rule
note and field labels are intentional functional copy. No unsupported official
claim or decorative label was introduced.

## Findings

No actionable P0, P1 or P2 mismatch remains within the checkpoint scope.

## Follow-up polish

- The Avisos tab remains for the final CRUD checkpoint.
- Final brand/disclaimer, route fallback, documentation and deployment checks
  remain for application-wide finishing.

final result: passed
