# Design QA — checkpoint 3

- Source visual truth: `C:\Users\Admin\.codex\generated_images\01a1be91-54e9-7892-9008-60f43fad2cca\exec-2e04ded1-6dd3-4790-afc5-cbd3d8ed9399.png`
- Implementation screenshot: `C:\Users\Admin\AppData\Local\Temp\estacao-ribeirinha-checkpoint-3-1440.png`
- Comparison image: `C:\Users\Admin\AppData\Local\Temp\estacao-ribeirinha-checkpoint-3-comparison.png`
- Intended CSS viewport: 1440 × 1024
- Source pixels: 1487 × 1058
- Implementation pixels: 1425 × 1013
- Normalized comparison: upper 600-pixel regions scaled to 1440 × 600 at device scale 1
- State: Visão geral, Estacao Arara Azul selected, API data loaded

## Scope

This checkpoint implements the station selector, station identity, operational
status, battery, latest water-level reading, tendency and timestamp using the
published API. Chart, notices, disclaimer and final brand symbol remain outside
this checkpoint.

## Full-view comparison

- The implementation preserves the approved open white surface, horizontal
  information bands, thin dividers and data-first hierarchy.
- Page title and station selector share the same row on desktop and stack at
  the approved responsive breakpoint.
- Station identity, status and battery follow the concept's three-region band.
- Latest level and tendency retain the concept's large-number emphasis without
  introducing cards, shadows, gradients or decorative content.
- Unimplemented chart and notice regions remain empty rather than receiving
  fabricated data.

## Focused comparison

- Typography: Source Sans 3 preserves the sober public-service tone and clear
  hierarchy of title, station name, metric and supporting labels.
- Spacing: page gutters, separator rhythm and vertical bands follow the source
  composition; real API names are allowed to determine natural text width.
- Colors: deep blue identifies primary information, green identifies the active
  station and upward tendency, and neutral borders separate regions.
- Icons: Phosphor location, battery and tendency icons match the source
  metaphors and stroke character.
- Copy: `Situação da estação`, `Estação`, `Nível do rio`, `Bateria` and
  `Atualizado em` match the approved above-the-fold copy.
- Content: station names and readings come from the public API, so differences
  from the mock data are intentional and required.

## Responsive and interaction evidence

- Desktop checked at the intended 1440 × 1024 viewport.
- Mobile checked at 390 × 844 without horizontal overflow.
- Five stations loaded from `/estacoes`.
- Switching from station 1 to stations 2 and 3 updated identity, status,
  battery, level, tendency and timestamp.
- Loading state was observed during the Render cold-start and reading changes.
- Error, retry, no-station and no-reading states are implemented in code.
- Header and page measurements confirmed `scrollWidth === clientWidth`.
- Browser console checked with no warnings or errors.

## Comparison history

1. The first React pass produced two lint warnings for synchronous state changes
   inside effects. Loading transitions were moved to user actions and request
   callbacks; the next lint run completed without warnings.
2. The first visual comparison used `Nível da água` and the browser's long
   Portuguese date format. Copy was changed to `Nível do rio` and the compact
   `07 nov 2026, 08:00` pattern from the approved design.
3. A normalized screenshot appeared to omit the Gestão item. Browser layout
   measurement confirmed the item at x=1312.78–1360 within a 1425-pixel client
   width and no horizontal overflow; the omission was only presentation crop.

## Findings

No actionable P0, P1 or P2 mismatch remains within the checkpoint scope.

## Follow-up polish

- The final brand symbol needs its own approved asset.
- The chart, notices and demonstrative-monitoring disclaimer belong to later
  checkpoints.
- Battery severity thresholds will not be invented without a backend or product
  rule.

final result: passed
