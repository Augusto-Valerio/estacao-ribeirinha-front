# Design QA — checkpoint 7

- Design-system source: `C:\Users\Admin\.codex\generated_images\01a1be91-54e9-7892-9008-60f43fad2cca\exec-2e04ded1-6dd3-4790-afc5-cbd3d8ed9399.png`
- Desktop implementation: `C:\Users\Admin\AppData\Local\Temp\estacao-ribeirinha-checkpoint-7-notices-1440.png`
- Mobile implementation: `C:\Users\Admin\AppData\Local\Temp\estacao-ribeirinha-checkpoint-7-notices-mobile.png`
- Side-by-side comparison: `C:\Users\Admin\AppData\Local\Temp\estacao-ribeirinha-checkpoint-7-notices-comparison.png`
- Source pixels: 1487 × 1058
- Desktop CSS viewport: 1440 × 1024; implementation pixels: 1440 × 1025
- Mobile CSS viewport: 390 × 844; implementation pixels: 375 × 1221
- Density normalization: device scale 1; full source and implementation shown together in the combined comparison
- Desktop state: Avisos route, Estacao Arara Azul selected, all filters, API data loaded
- Mobile state: Avisos route, Estacao Jandaira selected, critical active notice loaded

## Scope and source relationship

The approved image defines the product's visual system and the notice-card
treatment on the overview. It does not contain a dedicated archive page. This
checkpoint extends the same system with the minimum functional controls needed
to consult active and ended notices without introducing another visual
language.

The page consumes `GET /avisos/estacao/{idEstacao}`, updates when the station
changes and filters the returned records locally by status and level.

## Full-view comparison

- Header, navigation, title scale, station selector and horizontal divider
  cadence remain consistent with the approved overview.
- Notice level hierarchy reuses the approved informative, attention and
  critical semantics; ended notices are deliberately neutralized so they are
  not mistaken for current alerts.
- The dedicated page uses open information bands, two compact native filters
  and a two-column desktop list instead of adding dashboard cards or decorative
  containers.
- Real API counts appear as an inline summary, not as invented metrics.
- The mobile version collapses to one column, keeps filters full-width and
  preserves readable notice metadata without horizontal overflow.

## Required fidelity surfaces

- Fonts and typography: Source Sans 3, established weights, heading scale,
  control typography and notice hierarchy match the product system.
- Spacing and layout rhythm: page gutters, title band, archive heading, filter
  band, results line and notice list follow the reference's divider cadence and
  open white surface.
- Colors and tokens: primary blue, neutral borders and semantic green, amber
  and red states reuse existing tokens; no gradient, glass or decorative glow
  was added.
- Image and asset quality: no raster assets were introduced. Existing Phosphor
  navigation and notice icons are reused with consistent weight and size.
- Copy and content: static labels describe the real query and filters; station,
  notice, status, level, message and publication time come from the public API.

## Focused comparison

The notice cards were compared directly with the approved attention card. Icon
placement, compact rectangular labels, border weight, heading hierarchy and
publication metadata stay within the established component family.

## Responsive and interaction evidence

- Desktop checked at 1440 × 1024.
- Mobile checked at 390 × 844 with `scrollWidth` equal to the client width and
  no horizontal overflow.
- Status and level filters returned the correct visible result counts.
- A filter combination with no result showed its explicit empty state, and
  Limpar filtros restored both controls to Todos.
- Estacao Horizonte showed the no-notices state.
- Estacao Jandaira showed its active critical notice and semantic red
  treatment.
- The final mobile pass kept level and status labels on one horizontal row,
  matching the approved notice anatomy.
- Returning to the overview preserved its active notice card after the shared
  card refactor.
- Browser console checked without application errors.
- `npm run lint` and `npm run build` passed before the final visual review.

## Accessibility evidence

- Page and archive regions have programmatic headings.
- Native labelled selects remain keyboard and screen-reader accessible.
- Notice level and status are conveyed by text and icon in addition to color.
- Counts use a semantic description list, notices use a semantic list, and
  publication values use `time` elements.
- Loading, API failure, no-station, no-notice and no-filter-result states are
  present.
- Mobile controls retain practical tap targets and visible focus styles come
  from the shared global CSS.

## Above-the-fold copy diff

Product identity and navigation remain unchanged. The route title, factual
description, archive heading and filter labels are intentional functional copy.
No promotional text, decorative eyebrow, fake badge or unsupported official
claim was introduced.

## Findings

No actionable P0, P1 or P2 mismatch remains within the checkpoint scope.

## Follow-up polish

- The final brand symbol and demonstrative-monitoring disclaimer remain pending
  as application-wide finishing work.
- A denser pagination strategy can be considered only if the API later returns
  a volume that makes it necessary.

final result: passed
