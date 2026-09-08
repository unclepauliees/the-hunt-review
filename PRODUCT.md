# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React and TypeScript on Vite, with Tailwind CSS v4, Motion, GSAP, Lenis, Lucide, and PptxGenJS. The primary artifact compiles to one self-contained offline HTML file.

## Users

The primary users are Audible brand-team reviewers evaluating a one-night immersive Dracula dinner concept. They need to understand the guest journey, assess brand compliance, and resolve production questions from desktop, tablet, or a shared presentation.

## Product Purpose

The Hunt is an internal campaign approval deck for a NowThis and Audible event at One if by Land, Two if by Sea. It lets reviewers experience the proposed evening as a guided digital hunt and export the same approved content to editable presentation formats.

## Positioning

The deck mirrors the event's own illustrated map: readers collect four wax-seal progress marks as they move through the narrative, completing The Hunt in miniature before reaching the Audible listening reveal.

## Operating Context

Reviewers may open the HTML directly without a server or network, review it on iPads, export a Google Slides deck when public asset hosting and Google credentials are configured, or download an editable PowerPoint fallback.

## Capabilities and Constraints

- Seventeen ordered acts driven by `src/deck.config.ts`.
- One self-contained `dist/the-hunt.html` output with inlined web assets.
- Native editable text in Google Slides and PowerPoint exports.
- Exactly one Lenis scroll controller, with reduced-motion and touch-accessible alternatives.
- Licensed talent imagery appears only in the complete key art in acts 1 and 14.
- Final approval copy and act ordering are fixed by the supplied handoff.
- Google Slides export downloads the editable PowerPoint deck and opens Google Slides for upload in zero-configuration builds. Deployments with `VITE_ASSET_BASE_URL` and Google OAuth configuration create the editable Slides deck directly.

## Brand Commitments

The product is titled The Hunt and is presented by NowThis x Audible. It uses the supplied Audible Dracula US lockup, fixed Dracula toolkit palette, Spectral typography substitute, supplied vector taglines, and the licensed composed key art without filtering, recoloring, or subject separation.

## Evidence on Hand

The handoff archive at `/Users/paulestevez_ipx_temp/Downloads/the-hunt-handoff.zip` contains final copy, brand and behavior specifications, optimized web imagery, master export imagery, licensed key art, and original people-free environment renders. It contains no configured Google OAuth client or confirmed public asset host.

## Product Principles

- Make approval feel like experiencing the guest journey.
- Keep every representation anchored to one content source.
- Preserve licensed artwork and final copy exactly.
- Keep review content reachable across pointer, touch, keyboard, and reduced-motion modes.
- Degrade loudly and legibly when an asset or export dependency is unavailable.

## Accessibility & Inclusion

All content must remain reachable by keyboard and touch, carousels must support an expand-all review state, motion must stop under `prefers-reduced-motion`, and responsive behavior must cover phone and iPad review sizes.
