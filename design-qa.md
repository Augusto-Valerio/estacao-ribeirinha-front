# Design QA — checkpoint 4

- Source visual truth: `C:\Users\Admin\.codex\generated_images\01a1be91-54e9-7892-9008-60f43fad2cca\exec-2e04ded1-6dd3-4790-afc5-cbd3d8ed9399.png`
- Desktop implementation: `C:\Users\Admin\AppData\Local\Temp\estacao-ribeirinha-checkpoint-4-1440.png`
- Mobile implementation: `C:\Users\Admin\AppData\Local\Temp\estacao-ribeirinha-checkpoint-4-mobile.png`
- Side-by-side comparison: `C:\Users\Admin\AppData\Local\Temp\estacao-ribeirinha-checkpoint-4-comparison.png`
- Desktop CSS viewport: 1440 × 1024; document client width: 1425 px
- Source pixels: 1487 × 1058
- Desktop implementation pixels: 1425 × 1151
- Mobile CSS viewport: 390 × 844; document client width: 375 px
- Mobile implementation pixels: 375 × 1464
- Density normalization: device scale 1; both desktop images were scaled to 720 px wide in the side-by-side comparison
- State: Visão geral, Estacao Arara Azul selected, station and reading APIs loaded

## Scope

This checkpoint integrates `GET /leituras/estacao/{idEstacao}` and adds the
water-level history for the selected station. The chart shows the readings from
the latest 24-hour period, follows station changes, and includes loading, error,
empty and single-reading states. Notices, the demonstrative-monitoring
disclaimer and the final brand symbol remain outside this checkpoint.

The public API currently contains one reading per station. The interface does
not fabricate historical points: it renders the real point and explains that
new readings will form the evolution line.

## Full-view comparison

- The history occupies the left data column indicated by the approved concept,
  leaving the right region available for the later notices checkpoint.
- The open white surface, thin horizontal dividers and restrained public-service
  styling remain unchanged.
- `Histórico do nível do rio` and `Últimas 24 horas` preserve the source copy,
  order and hierarchy.
- The numeric Y axis, time X axis, blue data mark and light grid follow the
  concept without adding cards, gradients, decorative icons or animation.
- The single real point necessarily differs from the concept's illustrative
  multi-point line. This is an intentional data constraint, not visual drift.

## Required fidelity surfaces

- Fonts and typography: Source Sans 3 remains consistent across headings,
  labels, axes, explanatory copy and tooltip. No browser-default control type
  was introduced.
- Spacing and layout rhythm: the chart heading aligns with the page grid; its
  58-rem desktop width approximates the concept's left column and becomes full
  width on mobile.
- Colors and tokens: primary blue, neutral borders and muted supporting text use
  the existing design tokens and match the accepted public-service direction.
- Image and asset quality: this checkpoint introduces no raster assets. Recharts
  renders the data visualization, while existing Phosphor icons remain intact.
- Copy and content: source headings are preserved. The single-reading notice is
  an intentional, factual addition required by the current backend data.

## Focused comparison

The chart region was inspected at original desktop size and in the combined
source/implementation image. Axis labels, grid weight, mark color, heading scale
and left-column proportions were all readable, so no additional crop was
needed.

## Responsive and interaction evidence

- Desktop checked at 1440 × 1024 with no horizontal overflow.
- Mobile checked at 390 × 844; `scrollWidth` equals the 375-pixel client width.
- The chart measures 335 px wide on mobile and remains legible inside the page
  gutter.
- Switching from station 1 to station 3 updated the station summary, latest
  reading and chart from 145.5 cm to 210.8 cm, then station 1 was restored.
- The accessible chart label reports the real point count and selected period.
- A visually hidden data table exposes every plotted date and value to assistive
  technology.
- Browser console checked with no warnings or errors.
- `npm run lint` and `npm run build` both passed.

## Above-the-fold copy diff

No existing above-the-fold copy was added, removed, renamed or reordered. Real
station names and measurements continue to come from the API. The new history
copy appears below the latest-reading band and matches the approved concept,
apart from the factual single-reading explanation.

## Comparison history

1. The first build identified a Recharts tooltip generic-type mismatch. The
   tooltip was aligned with the library's exported value and name types; the
   next build passed.
2. The first successful build placed the complete chart library in the initial
   JavaScript chunk and emitted a size warning. The chart was changed to a lazy
   feature chunk; the next build passed without the warning.
3. The first mobile capture occurred while the API request was still loading.
   The final capture waited for the single-reading state and confirmed the
   complete chart without overflow.

## Findings

No actionable P0, P1 or P2 mismatch remains within the checkpoint scope.

## Follow-up polish

- The right column will receive active notices in the next overview checkpoint.
- The demonstrative-monitoring disclaimer and final brand symbol remain pending.
- A visible trend line will appear naturally after the backend contains two or
  more readings for the same station within a 24-hour period.

final result: passed
