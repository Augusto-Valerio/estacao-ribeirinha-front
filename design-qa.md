# Design QA — checkpoint 5

- Source visual truth: `C:\Users\Admin\.codex\generated_images\01a1be91-54e9-7892-9008-60f43fad2cca\exec-2e04ded1-6dd3-4790-afc5-cbd3d8ed9399.png`
- Desktop implementation: `C:\Users\Admin\AppData\Local\Temp\estacao-ribeirinha-checkpoint-5-1440.png`
- Mobile implementation: `C:\Users\Admin\AppData\Local\Temp\estacao-ribeirinha-checkpoint-5-mobile.png`
- Side-by-side comparison: `C:\Users\Admin\AppData\Local\Temp\estacao-ribeirinha-checkpoint-5-comparison.png`
- Desktop CSS viewport: 1440 × 1024; document client width: 1425 px
- Source pixels: 1487 × 1058
- Desktop implementation pixels: 1425 × 1151
- Mobile CSS viewport: 390 × 844; document client width: 375 px
- Mobile implementation pixels: 375 × 1855
- Density normalization: device scale 1; both desktop images were scaled to 720 px wide in the side-by-side comparison
- State: Visão geral, Estacao Arara Azul selected, API data loaded

## Scope

This checkpoint integrates `GET /avisos/estacao/{idEstacao}`, filters active
notices and presents them beside the current reading and chart. It includes
loading, error and no-active-notice states plus visual variants for
`INFORMATIVO`, `ATENCAO` and `CRITICO`.

The interface preserves the API title and message exactly. Missing accents in
dynamic notice content therefore reflect backend data rather than hard-coded
front-end copy.

## Full-view comparison

- The overview now follows the approved two-column composition: current reading
  and history on the left, community notices on the right.
- The right column uses the concept's vertical divider, heading, explanatory
  copy, severity icon, level label, active-status label and restrained outlined
  notice surface.
- The open white background and thin information bands remain unchanged.
- Real API values replace the illustrative station, measurement, date and notice
  content from the concept without changing hierarchy.
- On mobile, the grid becomes reading, notices and history, keeping urgent
  communication before the historical chart.

## Required fidelity surfaces

- Fonts and typography: Source Sans 3 remains consistent across headings,
  severity labels, notice title, message and publication date. Weight and scale
  preserve the approved public-service hierarchy.
- Spacing and layout rhythm: desktop column proportions, divider placement,
  card padding and section gaps follow the source. Mobile content stays within
  the existing 20-pixel gutters.
- Colors and tokens: attention uses amber, critical uses red and informational
  uses the established blue family. No gradients, glass effects or decorative
  shadows were introduced.
- Image and asset quality: this checkpoint introduces no raster assets. Direct
  Phosphor imports provide semantically appropriate information, warning and
  critical icons with one consistent stroke family.
- Copy and content: static heading and supporting copy match the approved
  concept. Titles, messages, levels and timestamps come directly from the API.

## Focused comparison

The notice column and card were readable in the combined desktop comparison, so
no extra crop was required. Icon weight, badge geometry, border color, title
scale, line length and publication-date hierarchy were inspected directly.

## Responsive and interaction evidence

- Desktop checked at 1440 × 1024 with `scrollWidth` equal to the 1425-pixel
  client width.
- Mobile checked at 390 × 844 with `scrollWidth` equal to the 375-pixel client
  width.
- The notice card measures 335 px wide on mobile and does not clip or overflow.
- Station 1 displayed the active attention notice and excluded its ended notice.
- Station 2 displayed the informational notice.
- Station 3 displayed the critical notice.
- Station 5 displayed the no-active-notice state with no article rendered.
- Switching stations also continued to update the station, latest reading and
  historical chart.
- Browser console checked with no warnings or errors.
- `npm run lint` and `npm run build` both passed.

## Accessibility evidence

- Notice content is a labeled section inside a complementary landmark.
- Active notices use a semantic list of articles with headings and machine-
  readable `time` elements.
- Severity is communicated by visible text in addition to color and icon.
- Loading uses `role="status"`; API failure uses `role="alert"` and an
  accessible retry button.
- Mobile controls and notice labels retain practical tap and reading sizes.

## Above-the-fold copy diff

No existing page, navigation, station or latest-reading copy was added, removed
or reordered on desktop. The approved `Avisos da comunidade` title and
`Avisos relacionados à estação selecionada.` description were added in the
source-design position. Dynamic content differences are required API data.

## Comparison history

1. The first full desktop comparison found no actionable P0, P1 or P2 visual
   mismatch within the checkpoint scope.
2. API calls for alternate stations were observed in their loading states before
   the Render responses completed. Final checks confirmed the informational,
   critical and empty states after the responses arrived; no source change was
   required.

## Findings

No actionable P0, P1 or P2 mismatch remains within the checkpoint scope.

## Follow-up polish

- The demonstrative-monitoring disclaimer from the approved concept remains a
  separate checkpoint.
- The final brand symbol remains pending.
- The full Avisos page will later expose active and ended notices beyond this
  compact overview.

final result: passed
