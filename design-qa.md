# Design QA — checkpoint 8

- Design-system source: `C:\Users\Admin\.codex\generated_images\01a1be91-54e9-7892-9008-60f43fad2cca\exec-2e04ded1-6dd3-4790-afc5-cbd3d8ed9399.png`
- Desktop implementation: `C:\Users\Admin\AppData\Local\Temp\estacao-ribeirinha-checkpoint-8-stations-1440.png`
- Mobile implementation: `C:\Users\Admin\AppData\Local\Temp\estacao-ribeirinha-checkpoint-8-stations-mobile.png`
- Side-by-side comparison: `C:\Users\Admin\AppData\Local\Temp\estacao-ribeirinha-checkpoint-8-stations-comparison.png`
- Source pixels: 1487 × 1058
- Desktop CSS viewport: 1440 × 1024; implementation pixels: 1425 × 1128
- Mobile CSS viewport: 390 × 844; implementation pixels: 375 × 2897
- Density normalization: device scale 1; source and desktop implementation shown together in the combined comparison
- State: Gestão route, Estações tab, five original API records after temporary test cleanup

## Scope and source relationship

The approved image defines the government-service visual system. The management
screen is a functional extension of that system: white open surfaces, strong
blue hierarchy, compact rectangular controls, thin dividers and semantic status
colors. It avoids a generic card dashboard and keeps the CRUD as a form beside a
data table on desktop.

The checkpoint implements real create, read, update and delete operations for
`/estacoes`. The public API remains authoritative for validation and for the
restriction that prevents deletion when child readings or notices exist.

## Full-view comparison

- Product header, navigation, title scale and page gutters match the approved
  application shell.
- The station form and table are contained by a single vertical divider rather
  than nested cards or floating panels.
- Native fields use the same compact radius, blue focus treatment and Source
  Sans 3 control typography as existing selectors.
- Table status labels reuse the approved green, amber and red semantics.
- Mobile turns each table row into a labelled record without changing the
  semantic HTML table or introducing horizontal overflow.

## Required fidelity surfaces

- Fonts and typography: Source Sans 3, existing weights and title hierarchy are
  preserved across page, tabs, form controls, table and confirmation dialog.
- Spacing and layout rhythm: header band, tabs, section summary, form/table
  split and row dividers follow the established open-surface cadence.
- Colors and tokens: existing primary, border, success, warning and critical
  tokens are used; no gradients, glass treatment or decorative animation was
  introduced.
- Image and asset quality: no raster imagery is needed. Phosphor edit, delete
  and navigation icons are used consistently instead of glyph substitutes.
- Copy and content: labels reflect the exact Java entity and validation rules;
  record values come from the public API.

## Interaction and API evidence

- Initial GET loaded the five original stations.
- A temporary station was created through the browser form and returned in the
  refreshed list as record #21.
- Record #21 was edited through the same form; its name and status changed in
  the API-backed table.
- The delete control opened an alert dialog naming the exact station, explained
  the linked-data restriction and moved focus to Cancelar.
- Cancelling closed the dialog without changing data.
- The temporary #21 record was then removed with an API `204`; a subsequent GET
  proved a count of five and `TemporaryStillExists: false`.
- The five original records were not modified.
- A fresh browser tab produced no console errors.
- `npm run lint`, `npm run build` and `git diff --check` passed.

## Responsive evidence

- Desktop uses a readable form/table split and keeps action buttons visible.
- Mobile checked at 390 × 844 with `scrollWidth` equal to client width.
- Fields remain labelled and usable; Município/UF preserve the compact paired
  layout without clipping.
- Table rows become labelled records and action buttons remain practical tap
  targets.
- Status labels were corrected to content width; the final active label measured
  about 56 px inside a 335 px cell.

## Accessibility evidence

- Page, management section, form and table regions have programmatic headings.
- Tabs expose tablist, tab, selected state, panel ownership and keyboard focus.
- Every form control has a visible label, native required/max-length rules and
  an explanatory UF pattern.
- Feedback uses status or alert roles, table headers remain semantic and actions
  have visible text plus icons.
- Delete confirmation uses alertdialog semantics, labelled description and
  intentional initial focus on the safe action.
- Loading, API error and empty-list states are present.

## Above-the-fold copy diff

Product identity and navigation remain unchanged. Gestão do monitoramento,
the entity tabs and the factual CRUD instructions are intentional route-specific
copy. No official-government claim, promotional content or decorative label was
added.

## Findings

No actionable P0, P1 or P2 mismatch remains within the checkpoint scope.

## Follow-up polish

- The Leituras and Avisos tabs are intentionally reserved for the next two CRUD
  checkpoints.
- Final brand symbol and demonstrative-monitoring disclaimer remain part of the
  application-wide finishing checkpoint.

final result: passed
