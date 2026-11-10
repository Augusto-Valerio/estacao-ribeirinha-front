# Design QA — checkpoint 6

- Design-system source: `C:\Users\Admin\.codex\generated_images\01a1be91-54e9-7892-9008-60f43fad2cca\exec-2e04ded1-6dd3-4790-afc5-cbd3d8ed9399.png`
- Desktop implementation: `C:\Users\Admin\AppData\Local\Temp\estacao-ribeirinha-checkpoint-6-history-1440.png`
- Mobile implementation: `C:\Users\Admin\AppData\Local\Temp\estacao-ribeirinha-checkpoint-6-history-mobile.png`
- Side-by-side comparison: `C:\Users\Admin\AppData\Local\Temp\estacao-ribeirinha-checkpoint-6-history-comparison.png`
- Desktop CSS viewport: 1440 × 1024; document client width: 1425 px
- Desktop implementation pixels: 1425 × 1270
- Mobile CSS viewport: 390 × 844; document client width: 375 px
- Mobile implementation pixels: 375 × 1603
- Density normalization: device scale 1; source and desktop implementation scaled to 720 px wide in the combined comparison
- State: Histórico route, Estacao Arara Azul selected, API data loaded

## Scope and source relationship

The approved image defines the product's visual system and overview composition;
it does not contain a separate history-page mock. This checkpoint extends the
same system without introducing another visual language: open white surfaces,
horizontal information bands, Source Sans 3, restrained blue and green tokens,
thin dividers, compact radii and data-first hierarchy.

The page consumes all readings from
`GET /leituras/estacao/{idEstacao}`, updates when the station changes and
shows the station summary, complete chart and detailed reading list.

## Full-view comparison

- Header, navigation, title scale, selector geometry and station-summary band
  remain consistent with the approved overview.
- The chart preserves the same axis, grid, blue mark and open-surface treatment,
  expanded to the full width appropriate for a dedicated data page.
- The detailed history uses a table instead of generic cards, keeping the
  government-service information density and alignment.
- The current API has one reading per station, so the chart contains one real
  point and a factual explanation rather than invented historical data.
- Mobile replaces the table header with explicit row labels while preserving
  the semantic HTML table for assistive technology.

## Required fidelity surfaces

- Fonts and typography: Source Sans 3, existing weights, title scale, table
  hierarchy and compact labels match the established product system.
- Spacing and layout rhythm: the title, selector, station summary, chart and
  table follow the existing gutters and divider cadence with no nested cards.
- Colors and tokens: primary blue, neutral grid lines, green active/trend states
  and pale table header use existing tokens; no gradient or glass treatment was
  added.
- Image and asset quality: no raster assets were introduced. Existing Phosphor
  station and battery icons are reused without substitutions.
- Copy and content: static labels describe the complete history accurately;
  station names and every measurement come from the public API.

## Focused comparison

The dedicated table is new functional content not present in the overview
source. It was reviewed directly at desktop and mobile sizes for header weight,
column alignment, row rhythm, trend treatment, label clarity and wrapping.

## Responsive and interaction evidence

- Desktop checked at 1440 × 1024 without horizontal overflow.
- Mobile checked at 390 × 844 with `scrollWidth` equal to the 375-pixel client
  width.
- Switching from station 1 to station 4 updated station identity, battery,
  chart, date, 122.1 cm value and descending trend.
- Returning to station 1 restored the 145.5 cm, rising-trend and 82% battery
  record.
- Chart and visible table expose the same API reading.
- Mobile table presents Data e hora, Nível do rio, Tendência and Bateria as a
  readable labeled record.
- Browser console checked with no warnings or errors.
- `npm run lint` and `npm run build` passed before the final visual review.

## Accessibility evidence

- Page, chart and table regions have programmatic headings.
- Native select, semantic table headers, `time` values and visible data labels
  remain keyboard and screen-reader accessible.
- Trend is conveyed by text in addition to color.
- Loading, API failure, no-station and no-reading states are present.
- The chart retains its accessibility layer and hidden data table.

## Above-the-fold copy diff

Navigation and product identity remain unchanged. The new page title,
description and complete-history labels are intentional route-specific copy.
No unapproved badges, promotional text or decorative labels were introduced.

## Comparison history

1. The initial desktop implementation had no actionable P0 or P1 issue.
2. The first mobile capture showed the trend label stretching across its data
   cell. This P2 responsive mismatch was fixed with content-sized alignment.
3. The final mobile capture measured the trend badge at approximately 83 px,
   confirmed the compact treatment and showed no overflow.

## Findings

No actionable P0, P1 or P2 mismatch remains within the checkpoint scope.

## Follow-up polish

- Multiple API readings will naturally produce a line and additional table rows.
- Date-range filtering can be considered later if the backend dataset grows
  enough to require it; no unsupported filter was invented now.
- The final brand symbol and demonstrative-monitoring disclaimer remain pending.

final result: passed
