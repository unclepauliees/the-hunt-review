/*
 * BRAND COMPLIANCE
 * Dracula and Mina always appear together and only inside complete key art.
 * Talent appears only in acts 1 and 14, scaled together and never independently transformed.
 * The US title lockup remains focal; cast names stay clean and visible with every key-art use.
 * Logo on art requires its supplied darken-blend shadow plate.
 * Key art is never filtered, recolored, blended, or transformed beyond uniform Y translation.
 * Tagline copy is fixed. Audible orange is reserved for the master Audible logo.
 * Reference-flow approval drafts may use supplied PPT slide renders intact.
 */

export interface GalleryImage {
  src: string;
  caption: string;
  kind: "render" | "venue" | "graphic";
  specLabel?: string;
}

export interface Gallery {
  title: string;
  images: GalleryImage[];
}

export type Card = { title: string; badge: string; body: string; image: string; fit?: "cover" | "contain"; detailImages?: GalleryImage[] };
export type BulletGroup = { label: string; items: string[] };
export type Act = {
  id: string;
  index: number;
  chapter: string;
  kind: "hero" | "narrative" | "carousel" | "venue" | "openItems" | "reference";
  eyebrow?: string;
  headline: string;
  body?: string[];
  bullets?: BulletGroup[];
  cards?: Card[];
  galleries?: Gallery[];
  background: "keyart" | "bg-02" | "bg-03" | "bg-04";
  image?: string;
  referenceImage?: string;
  subheading?: string;
  imageFit?: "cover" | "contain";
  stampIndex?: number;
  slideLayout: "hero" | "split" | "full-image-caption" | "two-column" | "grid-4" | "stat-block" | "checklist";
};

// Approved revision direction: PDF pages 1-21; page 22 specifies shared controls.
export const acts: Act[] = [
  {
    "id": "cover",
    "chapter": "Presented by NowThis x Audible",
    "kind": "hero",
    "eyebrow": "PRESENTED BY NOWTHIS x AUDIBLE",
    "headline": "THE HUNT",
    "body": [
      "CAMPAIGN KICKOFF EXPERIENCE 2026"
    ],
    "background": "keyart",
    "slideLayout": "hero",
    "index": 1
  },
  {
    "id": "structure",
    "chapter": "Structure",
    "kind": "narrative",
    "headline": "How The\nNight Unfolds",
    "background": "bg-02",
    "slideLayout": "split",
    "bullets": [
      {
        "label": "PART I - THE HUNT",
        "items": [
          "Guests enter The Hunt and explore Dracula through hidden journal entries, immersive audio, and interactive discoveries throughout the venue.",
          "The Haunted Mirrors",
          "Lucy's Wine Cellar",
          "Jonathan's Library",
          "Mina's Gifting Suite"
        ]
      },
      {
        "label": "PART II - THE REVEAL",
        "items": [
          "One final discovery completes The Hunt and leads guests to Mina's Gifting Suite, where they receive their eternal reward."
        ]
      }
    ],
    "index": 2
  },
  {
    "id": "guest-flow",
    "chapter": "Guest Flow",
    "kind": "narrative",
    "headline": "Dracula's Castle",
    "background": "bg-03",
    "slideLayout": "split",
    "image": "revision-003.jpg",
    "body": [
      "For one night only, Audible transforms a chic New York venue into The Hunt. Drawn from the haunting pages of Dracula, the evening blends decadent dining, gothic luxury, and interactive storytelling into New York's most coveted invitation."
    ],
    "subheading": "One Night Only",
    "imageFit": "contain",
    "index": 3
  },
  {
    "id": "premise",
    "chapter": "One Night Only",
    "kind": "narrative",
    "headline": "One Night Only",
    "background": "bg-03",
    "slideLayout": "split",
    "image": "env-portal.jpg",
    "body": [
      "For one night only, Audible transforms a chic New York venue into The Hunt. Drawn from the haunting pages of Dracula, the evening blends decadent dining, gothic luxury, and interactive storytelling into New York's most coveted invitation."
    ],
    "index": 4
  },
  {
    "id": "arrival",
    "chapter": "Arrival",
    "kind": "narrative",
    "headline": "You May Enter",
    "background": "bg-03",
    "slideLayout": "split",
    "image": "render-entrance.jpg",
    "subheading": "Exterior Entrance",
    "index": 5
  },
  {
    "id": "exterior-entrance",
    "chapter": "Exterior Entrance",
    "kind": "carousel",
    "headline": "Exterior Entrance",
    "background": "bg-03",
    "slideLayout": "grid-4",
    "cards": [
      {
        "title": "Before Build",
        "badge": "Before Build",
        "body": "",
        "image": "revision-008.jpg",
        "fit": "contain"
      },
      {
        "title": "After Build",
        "badge": "After Build",
        "body": "",
        "image": "revision-009.jpg",
        "fit": "contain"
      }
    ],
    "index": 6
  },
  {
    "id": "corridor",
    "chapter": "Threshold",
    "kind": "narrative",
    "headline": "Into The Castle",
    "background": "bg-03",
    "slideLayout": "split",
    "image": "env-corridor.jpg",
    "body": [
      "Guests step into the Count's castle through a candlelit corridor, where flickering light and dramatic drapes blur the line between reality and Dracula's world.",
      "Audio clips from Audible's Dracula play, letting guests know they are entering his realm. They receive a wax-sealed envelope, seemingly created in another time and place."
    ],
    "index": 7
  },
  {
    "id": "map",
    "chapter": "The Invitation",
    "kind": "narrative",
    "headline": "Open If You Dare",
    "background": "bg-02",
    "slideLayout": "split",
    "image": "env-envelope.jpg",
    "body": [
      "Inside each wax-sealed envelope is an illustrated map that lays out the evening, providing further instructions for The Hunt. As the night unfolds, the map becomes their guide, leading them to each immersive activation where they'll uncover clues, collect stamps, and piece together Dracula's story."
    ],
    "index": 8
  },
  {
    "id": "letter",
    "chapter": "A Letter From Dracula",
    "kind": "carousel",
    "headline": "A Letter From Dracula",
    "background": "bg-03",
    "slideLayout": "grid-4",
    "cards": [
      {
        "title": "A Letter From Dracula",
        "badge": "A Letter From Dracula",
        "body": "",
        "image": "revision-012.jpg",
        "fit": "contain"
      },
      {
        "title": "Tech Meets Immersion",
        "badge": "Tech Meets Immersion",
        "body": "",
        "image": "revision-013.jpg",
        "fit": "contain"
      }
    ],
    "index": 9
  },
  {
    "id": "activations",
    "chapter": "Four Clues",
    "kind": "carousel",
    "headline": "Four Clues",
    "background": "bg-03",
    "slideLayout": "grid-4",
    "cards": [
      {
        "title": "The Haunted Mirrors",
        "badge": "The Haunted Mirrors",
        "body": "Antique mirrors conceal messages and visual illusions within their reflections. Guests must determine which reflection reveals the hidden message. The message uncovers another piece of Dracula's fate.",
        "image": "env-mirrors.jpg",
        "fit": "cover"
      },
      {
        "title": "Lucy's Wine Cellar",
        "badge": "Lucy's Wine Cellar",
        "body": "Guests step into the wine cellar's ornate Victorian portrait set and become part of Dracula's world. Audio clips play as their portrait is captured. They must examine the room to uncover a hidden detail.",
        "image": "render-wine-cellar.jpg",
        "fit": "cover"
      },
      {
        "title": "Jonathan's Library",
        "badge": "Jonathan's Library",
        "body": "A candlelit library invites guests to explore Jonathan Harker's world - discovering hidden clues, curious artifacts, and fragments of the story tucked among the shelves.",
        "image": "render-library.jpg",
        "fit": "cover"
      },
      {
        "title": "Van Helsing's Reading",
        "badge": "Van Helsing's Reading",
        "body": "A dramatic aura reading captures the energy Dracula would see in you. Your aura reveals your fate: resistant to his influence, or dangerously easy to lure in. Guests leave with an aura reading.",
        "image": "env-aura.jpg",
        "fit": "cover"
      },
      {
        "title": "How It Works",
        "badge": "How It Works",
        "body": "",
        "image": "revision-020.jpg",
        "fit": "contain"
      }
    ],
    "index": 10
  },
  {
    "id": "haunted-mirrors",
    "chapter": "The Entrance + Haunted Mirrors",
    "kind": "carousel",
    "headline": "The Entrance + Haunted Mirrors",
    "background": "bg-03",
    "slideLayout": "grid-4",
    "cards": [
      {
        "title": "Before Build",
        "badge": "Before Build",
        "body": "",
        "image": "revision-022.jpg",
        "fit": "contain"
      },
      {
        "title": "Entrance + Mirrors",
        "badge": "Entrance + Mirrors",
        "body": "",
        "image": "revision-023.jpg",
        "fit": "contain"
      }
    ],
    "index": 11
  },
  {
    "id": "midnight-feast",
    "chapter": "The Midnight Feast",
    "kind": "carousel",
    "headline": "The Midnight Feast",
    "background": "bg-03",
    "slideLayout": "grid-4",
    "cards": [
      {
        "title": "Before Build",
        "badge": "Before Build",
        "body": "",
        "image": "revision-026.jpg",
        "fit": "contain"
      },
      {
        "title": "Midnight Feast",
        "badge": "Midnight Feast",
        "body": "",
        "image": "revision-025.jpg",
        "fit": "contain"
      },
      {
        "title": "Midnight Feast + Mina Ballerina",
        "badge": "Midnight Feast + Mina Ballerina",
        "body": "",
        "image": "revision-027.jpg",
        "fit": "contain"
      }
    ],
    "index": 12
  },
  {
    "id": "food-beverage",
    "chapter": "Food & Beverage",
    "kind": "carousel",
    "headline": "Food & Beverage",
    "background": "bg-03",
    "slideLayout": "grid-4",
    "cards": [
      {
        "title": "Food Menu",
        "badge": "Food Menu",
        "body": "",
        "image": "revision-029.jpg",
        "fit": "contain"
      },
      {
        "title": "Cocktail Menu",
        "badge": "Cocktail Menu",
        "body": "",
        "image": "revision-030.jpg",
        "fit": "contain"
      }
    ],
    "index": 13
  },
  {
    "id": "wine-cellar",
    "chapter": "Lucy's Wine Cellar",
    "kind": "carousel",
    "headline": "Lucy's Wine Cellar",
    "background": "bg-03",
    "slideLayout": "grid-4",
    "cards": [
      {
        "title": "Before",
        "badge": "Before",
        "body": "",
        "image": "revision-032.jpg",
        "fit": "contain"
      },
      {
        "title": "Lucy's Wine Cellar + Portrait Studio",
        "badge": "Lucy's Wine Cellar + Portrait Studio",
        "body": "",
        "image": "revision-033.jpg",
        "fit": "contain"
      }
    ],
    "body": [
      "Staged as a Victorian portrait, modernized by a photographer. The photos will be uploaded on the app."
    ],
    "index": 14
  },
  {
    "id": "library",
    "chapter": "Jonathan's Library + Van Helsing's Reading",
    "kind": "carousel",
    "headline": "Jonathan's Library + Van Helsing's Reading",
    "background": "bg-03",
    "slideLayout": "grid-4",
    "cards": [
      {
        "title": "Before",
        "badge": "Before",
        "body": "",
        "image": "revision-035.jpg",
        "fit": "contain"
      },
      {
        "title": "Jonathan's Library + Van Helsing's Reading",
        "badge": "Jonathan's Library + Van Helsing's Reading",
        "body": "",
        "image": "revision-036.jpg",
        "fit": "contain"
      }
    ],
    "index": 15
  },
  {
    "id": "gifting-suite",
    "chapter": "Mina's Gifting Suite",
    "kind": "carousel",
    "headline": "Mina's Gifting Suite",
    "background": "bg-03",
    "slideLayout": "grid-4",
    "cards": [
      {
        "title": "Before",
        "badge": "Before",
        "body": "",
        "image": "revision-038.jpg",
        "fit": "contain"
      },
      {
        "title": "Mina's Gifting Suite",
        "badge": "Mina's Gifting Suite",
        "body": "",
        "image": "revision-039.jpg",
        "fit": "contain"
      },
      {
        "title": "Mina's Gift",
        "badge": "Mina's Gift",
        "body": "",
        "image": "revision-040.jpg",
        "fit": "contain"
      }
    ],
    "index": 16
  },
  {
    "id": "performers",
    "chapter": "Performers",
    "kind": "carousel",
    "headline": "Performers",
    "background": "bg-03",
    "slideLayout": "grid-4",
    "cards": [
      {
        "title": "Harpist",
        "badge": "Harpist",
        "body": "",
        "image": "revision-042.jpg",
        "fit": "contain"
      },
      {
        "title": "Actors",
        "badge": "Actors",
        "body": "",
        "image": "revision-043.jpg",
        "fit": "contain"
      },
      {
        "title": "Dracula (Pianist)",
        "badge": "Dracula (Pianist)",
        "body": "",
        "image": "revision-044.jpg",
        "fit": "contain"
      },
      {
        "title": "Mina (Ballerina)",
        "badge": "Mina (Ballerina)",
        "body": "",
        "image": "revision-045.jpg",
        "fit": "contain"
      }
    ],
    "index": 17
  },
  {
    "id": "reveal",
    "chapter": "Hero Props",
    "kind": "narrative",
    "headline": "The Secrets Will Be Revealed",
    "background": "bg-04",
    "slideLayout": "split",
    "image": "env-mirror-reveal.jpg",
    "subheading": "Hero Props",
    "index": 18
  },
  {
    "id": "hero-props",
    "chapter": "Hero Props - Reveals",
    "kind": "carousel",
    "headline": "Hero Props - Reveals",
    "background": "bg-03",
    "slideLayout": "grid-4",
    "cards": [
      {
        "title": "Jonathan's Book",
        "badge": "Jonathan's Book",
        "body": "",
        "image": "revision-048.jpg",
        "fit": "contain"
      },
      {
        "title": "Large Book",
        "badge": "Large Book",
        "body": "",
        "image": "revision-049.jpg",
        "fit": "contain"
      },
      {
        "title": "Life Size Reference",
        "badge": "Life Size Reference",
        "body": "",
        "image": "revision-050.jpg",
        "fit": "contain"
      },
      {
        "title": "Castle Key",
        "badge": "Castle Key",
        "body": "Revealed in the mirror room.",
        "image": "revision-051.jpg",
        "fit": "contain"
      },
      {
        "title": "Large Chess Piece",
        "badge": "Large Chess Piece",
        "body": "Revealed in Lucy's Wine Cellar on a statue bust.",
        "image": "revision-052.jpg",
        "fit": "contain"
      },
      {
        "title": "Candlestick Phone",
        "badge": "Candlestick Phone",
        "body": "Revealed at the aura reading table.",
        "image": "revision-053.jpg",
        "fit": "contain"
      }
    ],
    "index": 19
  },
  {
    "id": "signage",
    "chapter": "Signage",
    "kind": "carousel",
    "headline": "Signage",
    "background": "bg-03",
    "slideLayout": "grid-4",
    "cards": [
      {
        "title": "Blue Set",
        "badge": "Blue Set",
        "body": "",
        "image": "revision-055.jpg",
        "fit": "contain"
      },
      {
        "title": "Red Set",
        "badge": "Red Set",
        "body": "",
        "image": "revision-056.jpg",
        "fit": "contain"
      }
    ],
    "body": [
      "Signage will be blue or red, depending on the design of the rooms it's in."
    ],
    "index": 20
  },
  {
    "id": "keyart-close",
    "chapter": "Thanks",
    "kind": "hero",
    "headline": "Thanks",
    "background": "keyart",
    "slideLayout": "hero",
    "index": 21
  }
];

export const activationLabels = ["Decode", "Capture", "Divine", "Listen"];
export const venueStats = ["130 SEATED", "200 COCKTAIL", "3 ROOMS, PIPED SOUND", "PRIVATE GARDEN", "CLOSED MONDAYS - AVAILABLE FOR PRIVATE EVENTS"];

export function exportImageForAct(act: Act) {
  if (act.kind === "reference" && act.referenceImage) return { src: act.referenceImage, caption: act.headline, kind: "graphic" as const };
  return act.galleries?.[0]?.images[0] ?? (act.image ? { src: act.image, caption: act.headline, kind: "render" as const } : null);
}
