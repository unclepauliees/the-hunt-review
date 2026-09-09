# The Hunt: Claude Audit and Optimization Handoff

Prepared: September 8, 2026  
Repository: https://github.com/unclepauliees/the-hunt-review  
Live review: https://unclepauliees.github.io/the-hunt-review/  
Baseline commit: `b646b23` (`Fix mobile scrolling and parallax`)

## Assignment

Audit the shipped experiential deck and make evidence-based improvements to mobile reliability, motion quality, performance, accessibility, and export fidelity. Preserve the approved content, section order, visual direction, brand constraints, and desktop behavior unless a verified defect requires a scoped change.

Do not treat this handoff as a request to redesign the deck. Begin with inspection and reproducible tests, implement only justified changes, and document each behavioral difference.

## Product

The Hunt is a cinematic, scroll-led campaign review deck for NowThis x Audible's Dracula experience. It contains 17 acts, interactive image galleries, a progress rail, scroll-linked hero and Reveal treatments, a PowerPoint exporter, and a Google Slides handoff.

The source of truth for deck content and sequence is `src/deck.config.ts`. Product intent lives in `PRODUCT.md`; visual rules live in `DESIGN.md`.

## Current Architecture

- React 19, TypeScript, Vite, and Tailwind CSS 4
- GSAP and ScrollTrigger for desktop hero motion
- Motion for the Reveal clip-path treatment
- Lenis smooth scrolling only on fine-pointer desktop devices
- Native browser scrolling on touch and coarse-pointer devices
- PptxGenJS and JSZip for the editable PowerPoint export
- A Vite single-file build that embeds JavaScript, CSS, fonts, and images

Key modules:

- `src/App.tsx`: act routing and global controls
- `src/deck.config.ts`: all content, act order, image references, and slide layouts
- `src/index.css`: deck layout, responsive design, and motion styling
- `src/components/deck/HeroAct.tsx`: desktop GSAP parallax and touch-safe hero progress
- `src/components/ui/SmoothScrollReveal.tsx`: Reveal clip-path and scale animation
- `src/providers/LenisProvider.tsx`: desktop-only smooth-scroll boundary
- `src/components/deck/ElasticGallery.tsx`: expandable gallery panels and detail dialog
- `src/export/pptxExporter.ts`: PowerPoint generation
- `src/export/slidesExporter.ts`: optional direct Google Slides creation
- `src/export/slideLayouts.ts`: slide layout implementation
- `scripts/qa-mobile.mjs`: native-scroll and motion regression checks
- `scripts/qa.mjs`: interaction, accessibility, and export regression checks

## Approved Behavior to Preserve

- Phones and tablets use native scrolling. Do not re-enable Lenis or other scroll interception for touch input.
- Desktop fine-pointer devices use Lenis and retain scroll-linked GSAP motion.
- Mobile narrative copy is stable and immediately legible; it must not animate from clipped or transparent states.
- Mobile export controls are in normal document flow and never cover content.
- Hero art uses a touch-safe wrapper transform to avoid iOS compositing bands.
- The Reveal grows from an inset frame to full bleed while scrolling.
- Gallery panels open on hover or click where those input modes exist.
- Clicking `Click to Expand` opens only the selected image in a modal; gallery copy disappears.
- Escape and the close control dismiss the detail modal and restore body scrolling.
- The Atmosphere section uses `src/assets/env-tablescape.jpg` full bleed.
- The deck remains a single standalone HTML file after `npm run build`.

## Brand Constraints

These rules are also recorded in `src/deck.config.ts` and must remain intact:

- Dracula and Mina appear together and only inside complete approved key art.
- Talent may not be isolated, independently transformed, recolored, or filtered.
- The US title lockup remains focal and cast names remain visible where complete key art is used.
- Supplied key art may only receive uniform Y translation for motion.
- Tagline copy is fixed.
- Audible orange is reserved for the master Audible logo.

## Mobile Fixes in the Baseline

The baseline addresses the failures seen in iPhone in-app browser captures:

- Disabled Lenis for touch/coarse-pointer devices.
- Added passive native-scroll progress for mobile hero parallax.
- Moved hero motion to a wrapper to avoid transformed-image compositing seams.
- Removed unstable narrative text transforms and opacity states on touch devices.
- Replaced `100vh` assumptions with `svh`/`dvh` where browser chrome affected layout.
- Added `viewport-fit=cover` and safe-area spacing.
- Moved fixed export controls into flow on touch devices.
- Reduced Reveal scale from `1.7` to `1.28` and widened its initial frame.
- Added reduced-motion fallbacks.

## Verified Baseline

`npm run build` passes and produces `dist/the-hunt.html` at roughly 19 MB.

`node scripts/qa-mobile.mjs` passes at:

- 390 x 844 phone
- 320 x 700 narrow phone
- 820 x 1180 touch tablet
- 1440 x 1000 desktop

The mobile suite verifies native scrolling, zero horizontal overflow, text visibility, hero movement, Reveal movement, export-control placement, and browser errors.

`node scripts/qa.mjs` passes at desktop, iPad, iPhone, and reduced-motion viewports. Current results show:

- 17 acts rendered
- Zero horizontal overflow
- Gallery activation and marker navigation working
- Detail modal opens with image only and closes with Escape
- Body scroll lock restored after modal close
- Zero browser errors
- Zero Axe violations
- PPTX download generated successfully
- Google Slides fallback opens Slides and downloads the PPTX for upload

The Impeccable detector reports zero primary findings:

```bash
/Users/paulestevez_ipx_temp/.agents/skills/impeccable/scripts/impeccable detect src index.html --no-advisory
```

## Export Behavior

`Download .pptx` creates an editable `the-hunt.pptx` in the browser.

`Export to Slides` has two modes:

1. Without OAuth configuration, it opens Google Slides and downloads `the-hunt.pptx`; the user uploads it through File > Open > Upload.
2. With both `VITE_GOOGLE_CLIENT_ID` and `VITE_ASSET_BASE_URL`, it attempts direct editable Google Slides creation.

Do not describe the fallback as direct Slides creation. If auditing direct export, use a valid OAuth client authorized for the exact deployed origin and a public asset base containing the master images.

## Priority Audit

1. Test real iOS Safari and at least one iOS in-app browser. Puppeteer uses desktop Chrome emulation and cannot fully prove WebKit compositing behavior.
2. Confirm native scroll remains responsive during fast flicks, direction reversals, orientation changes, and browser-toolbar collapse.
3. Inspect hero and Reveal at intermediate scroll positions for seams, jumps, blank frames, and clipped lockups.
4. Review the 768-1024 px touch-tablet hero crop. It intentionally favors a continuous full-height image over fitting the complete 16:9 art inside a portrait viewport.
5. Profile the 19 MB standalone file for decode time, memory, long tasks, and image paint cost on an older iPhone. Preserve offline single-file delivery unless an alternative is explicitly approved.
6. Compare every generated PPTX slide against the web deck for cropping, typography, line wrapping, image fit, and editable object placement.
7. Test both exports in Safari, Chrome, and an in-app browser with pop-ups blocked and allowed.
8. Verify keyboard focus order, visible focus, dialog focus containment, and screen-reader names beyond automated Axe coverage.
9. Check all layouts at 320, 375, 390, 430, 768, 820, 1024, 1280, 1440, and ultrawide widths.
10. Confirm reduced-motion users receive a complete, static, readable deck with no excessive scroll distance.

## Optimization Guardrails

- Fix measured problems; avoid broad visual restyling.
- Do not change copy or act order without explicit approval.
- Do not replace supplied campaign imagery with generated or stock imagery.
- Keep text from overlapping, clipping, or entering behind the export controls at every viewport.
- Preserve progressive enhancement: core reading and navigation must work without smooth-scroll interception.
- Prefer transform and opacity animation over layout-property animation.
- Avoid adding dependencies unless they remove a demonstrated limitation.
- Keep `dist/the-hunt.html` in sync with source after every accepted change.
- Do not commit `.impeccable/review` screenshots or temporary downloads.

## Workflow

```bash
npm install
npm run build
node scripts/qa-mobile.mjs
node scripts/qa.mjs
```

After changes:

1. Run `git diff --check`.
2. Run the Impeccable detector once after final UI edits.
3. Rebuild and rerun both QA scripts against the rebuilt standalone artifact.
4. Inspect the generated screenshots in `.impeccable/review/` and `.impeccable/review/mobile-fix/`.
5. Open the downloaded PPTX and visually compare all 17 slides before declaring export fidelity complete.
6. Copy `dist/the-hunt.html` to the requested delivery location only after its checksum matches the tested artifact.
7. Commit source and `dist/the-hunt.html` together, push `main`, wait for the Pages workflow, and verify the public URL returns the new artifact.

## Expected Audit Report

Report findings first, ordered by severity, with file and line references. For each issue include the affected viewport or browser, reproduction steps, expected behavior, actual behavior, and the smallest recommended fix. Separate verified defects from optional refinements. If making changes, include before/after evidence and the exact commands used for verification.

