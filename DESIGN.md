---
name: The Hunt
description: A cinematic map-led review system for Audible's Dracula experience.
colors:
  dracula-red: "#BC0000"
  oxblood: "#390F10"
  near-black: "#171B1B"
  bronze: "#A77346"
  sand: "#E4BD96"
  teal-dark: "#263435"
  navy-dark: "#233442"
  originals-gold: "#B6875B"
typography:
  display:
    fontFamily: "Spectral, Georgia, serif"
    fontSize: "clamp(2.75rem, 8vw, 6rem)"
    fontWeight: 300
    lineHeight: 1.02
  headline:
    fontFamily: "Spectral, Georgia, serif"
    fontSize: "clamp(2rem, 5vw, 4.25rem)"
    fontWeight: 300
    lineHeight: 1.02
    letterSpacing: "0.08em"
  body:
    fontFamily: "Spectral, Georgia, serif"
    fontSize: "clamp(1rem, 1.5vw, 1.375rem)"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Spectral, Georgia, serif"
    fontSize: "clamp(0.8rem, 1.4vw, 1rem)"
    fontWeight: 500
    letterSpacing: "0.15em"
rounded:
  control: "6px"
  card: "8px"
  act: "12px"
spacing:
  act-gutter: "12px"
  compact: "1rem"
  content: "clamp(2rem, 7vw, 8rem)"
components:
  button-secondary:
    background: "#1F2424"
    textColor: "#E4BD96"
    borderColor: "rgba(228,188,151,0.18)"
    borderRadius: "6px"
  stamp-active:
    background: "#BC0000"
    textColor: "#E4BD96"
    borderColor: "#E4BD96"
    borderRadius: "999px"
---

# Design System: The Hunt

## Overview

**Creative North Star: "The Map"**

The Hunt treats a digital review deck as the map guests receive at the event. Full-bleed imagery carries the experience while sand-gold editorial type and wax-seal state marks give reviewers orientation. The system is cinematic without becoming decorative: production questions, controls, and dense copy remain quiet and legible.

The visual world is dark end to end, with oxblood and near-black fields shaped by client imagery rather than generic effects. The first and fourteenth acts give licensed key art complete authority; intervening acts move through people-free environment plates.

**Key Characteristics:**

- Full-bleed cinematic imagery with narrow editorial copy fields.
- Near-black, oxblood, sand, and aged-gold color discipline.
- Wax seals as progress and completion states.
- Spectral typography across display, body, labels, and controls.
- Motion that supports the journey and becomes static under reduced-motion preferences.

## Colors

The palette is low-key and warm, using red only for meaningful progress and reserving sand and aged gold for readable hierarchy.

### Primary

- **Dracula Red** (`#BC0000`): Active seals and completed progress only.
- **Oxblood** (`#390F10`): Inactive seals, error surfaces, and deep red transitions.

### Secondary

- **Bronze** (`#A77346`): Supporting warm detail.
- **Teal Dark** (`#263435`): The field-guide panel and cool shadowed structure.

### Neutral

- **Near Black** (`#171B1B`): Global ground and the dominant deck surface.
- **Sand** (`#E4BD96`): Primary text, focus rings, and seal outlines.
- **Originals Gold** (`#B6875B`): Compact labels, progress text, and secondary hierarchy.

**The Signal Red Rule.** Dracula red indicates progress or completion; it does not decorate passive UI.

## Typography

**Display Font:** Spectral 300 (with Georgia and serif fallbacks)  
**Body Font:** Spectral 400 (with Georgia and serif fallbacks)  
**Label Font:** Spectral 500

**Character:** A literary serif bridges the Dracula source material and an editorial approval context. Hierarchy comes from weight, size, spacing, and measure rather than a second type family.

### Hierarchy

- **Display** (300, `clamp(2.75rem, 8vw, 6rem)`, 1.02): Hero-scale editorial statements.
- **Headline** (300, `clamp(2rem, 5vw, 4.25rem)`, 1.02): Uppercase act titles with `0.08em` tracking.
- **Body** (400, `clamp(1rem, 1.5vw, 1.375rem)`, 1.55): Narrative copy capped near 68 characters.
- **Label** (500, `clamp(0.8rem, 1.4vw, 1rem)`, `0.15em`): Compact uppercase progress and operational labels.

**The Image Lettering Rule.** The Dracula lockup and campaign taglines remain supplied image assets, never approximated with live type.

## Layout

Narrative acts use a 12px outer gutter and a sticky inner surface sized to the viewport. Image acts pair full-height imagery with an editorial field occupying roughly half the width. Text-only acts expand to a wider reading field. Repeated menu and activation items move on a horizontal snap rail: cards are capped at 720px on desktop, 60vw on tablet, and 82vw on phone.

Below 768px, narrative acts become static stacked compositions, environment imagery occupies the upper portion, progress navigation leaves the edge, and copy fills the lower field. Export controls remain fixed in a reserved bottom zone.

## Elevation & Depth

The system uses tonal layering and image planes instead of box shadows. Hero depth comes from uniform image translation, additive ember and crack textures, and a pinned vignette. Interactive controls use backdrop blur only because they float over changing imagery.

**The Image-First Depth Rule.** Depth comes from supplied plates and scroll relationship; flat content surfaces do not receive decorative shadows.

## Shapes

Act surfaces use a restrained 12px radius. Repeated cards use 8px and compact controls use 6px. Circular forms are reserved for wax seals and map progress. Hairline borders separate production detail without enclosing whole page sections.

## Components

### Export Buttons

- **Shape:** Compact 6px rectangle with a 1px warm hairline.
- **Default:** Near-black translucent fill, sand text, Lucide icon, uppercase label.
- **Hover / Focus:** Oxblood fill on hover; 2px sand focus ring with 5px offset.
- **Loading:** Disabled while the deck is generated, with an animated progress icon.
- **Google Slides fallback:** Downloads the editable deck and opens Google Slides when direct OAuth export is not configured.

### Reveal Cards

- **Shape:** 8px clipped image surface with no outer shadow.
- **Behavior:** Copy rises over a photographic scrim on pointer or keyboard focus; touch centers and reveals cards, while Expand All opens every card.
- **Responsive:** Mobile keeps body copy visible so no hover discovery is required.

### Stamp Seals

- **Default:** Oxblood circular field, sand hairline ring, reduced scale and opacity.
- **Active:** Dracula-red fill, full opacity, full scale with a 400ms ease-out transition.
- **Use:** Progress and completion only.

### Map Rail

- **Desktop:** Fixed right-edge hairline with 17 linked act markers and hover/focus labels.
- **Tablet / Mobile:** Hidden below the desktop breakpoint to preserve content width.

## Do's and Don'ts

### Do:

- **Do** keep licensed key art intact and limited to the two hero acts.
- **Do** use people-free environment imagery for all intervening acts.
- **Do** reserve Dracula red for active and completed progress.
- **Do** preserve keyboard, touch, and reduced-motion access to all content.
- **Do** keep operational controls quiet over the cinematic field.

### Don't:

- **Don't** crop, filter, recolor, or separate figures from the licensed key art.
- **Don't** use Audible orange as an interface accent.
- **Don't** add light surfaces, stock imagery, generated talent, or invented approval copy.
- **Don't** use cards as generic page-section containers.
- **Don't** depend on hover to reveal required review content.
