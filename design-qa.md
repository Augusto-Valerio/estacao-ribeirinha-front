# Design QA — checkpoint 11

- Design-system source: `C:\Users\Admin\.codex\generated_images\01a1be91-54e9-7892-9008-60f43fad2cca\exec-2e04ded1-6dd3-4790-afc5-cbd3d8ed9399.png`
- Desktop implementation: `C:\Users\Admin\AppData\Local\Temp\estacao-ribeirinha-checkpoint-11-desktop.png`
- Mobile implementation: `C:\Users\Admin\AppData\Local\Temp\estacao-ribeirinha-checkpoint-11-mobile-final.png`
- Side-by-side comparison: `C:\Users\Admin\AppData\Local\Temp\estacao-ribeirinha-checkpoint-11-comparison.png`
- Source pixels: 1487 × 1058
- Desktop CSS viewport: 1440 × 900; implementation pixels: 1425 × 1239
- Mobile CSS viewport: 390 × 844; implementation pixels: 375 × 2007
- Density normalization: device scale 1; source and desktop implementation shown together in the combined comparison
- State: overview route, Estacao Arara Azul, original production-like sample data

## Scope and source relationship

This checkpoint applies product-wide finishing to the complete frontend. The
demonstrative-monitoring notice from the approved reference is now part of the
shared layout, while the 404 route and keyboard tab behavior complete important
navigation states without changing the established visual language.

## Full-view comparison

- The overview keeps the approved hierarchy: institutional header, station
  selector, operational summary, latest reading, notices and history.
- The new footer notice follows the reference's compact information band but
  uses a solid surface and left rule consistent with the coded design system.
- The desktop composition remains intentionally open, with dividers rather than
  nested cards.
- The 404 page uses the same typography, spacing, color and button treatment as
  the functional routes.

## Responsive evidence

- Desktop was checked at 1440 × 900.
- Mobile was checked at 390 × 844 with `scrollWidth` equal to `clientWidth`
  (390 px), proving no horizontal page overflow.
- The safety notice wraps into a readable compact block on mobile.
- Header navigation retains the existing accessible menu behavior.

## Accessibility and navigation evidence

- A direct unknown URL renders a semantic “Página não encontrada” heading,
  explanatory copy and a link back to the overview.
- The shared footer communicates that the product is demonstrative and directs
  emergencies to official municipal channels.
- Management tabs respond to Arrow Left/Right, Home and End. Pressing Arrow
  Right on Estações selected and focused Leituras.
- Skip link, visible focus styles, semantic headings and reduced-motion support
  remain present.
- A fresh browser tab produced zero console errors.

## Documentation and maintenance evidence

- The Vite template README was replaced by project-specific documentation in
  Portuguese: scope, features, stack, API, setup, environment, scripts,
  structure, design direction, Git flow and deployment requirements.
- Obsolete placeholder-page components were removed.
- `npm run lint`, `npm run build` and `git diff --check` passed.

## Above-the-fold copy diff

The overview copy remains unchanged. The new safety notice is intentionally
visible at the end of every route and avoids any claim of official status.

## Findings

No actionable P0, P1 or P2 mismatch remains within the checkpoint scope. A
custom brand mark remains optional P3 polish and should only be introduced after
its own visual approval.

## Follow-up polish

- Choose the hosting platform and configure SPA rewrites/environment variables.
- Run final deployed-origin CORS and route-refresh tests.
- Decide whether to create a custom brand mark and favicon.

final result: passed
