/*
 * BRAND COMPLIANCE
 * Dracula and Mina always appear together and only inside complete key art.
 * Talent appears only in acts 1 and 14, scaled together and never independently transformed.
 * The US title lockup remains focal; cast names stay clean and visible with every key-art use.
 * Logo on art requires its supplied darken-blend shadow plate.
 * Key art is never filtered, recolored, blended, or transformed beyond uniform Y translation.
 * Tagline copy is fixed. Audible orange is reserved for the master Audible logo.
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
  kind: "hero" | "narrative" | "carousel" | "venue" | "openItems";
  eyebrow?: string;
  headline: string;
  body?: string[];
  bullets?: BulletGroup[];
  cards?: Card[];
  galleries?: Gallery[];
  background: "keyart" | "bg-02" | "bg-03" | "bg-04";
  image?: string;
  stampIndex?: number;
  slideLayout: "hero" | "split" | "full-image-caption" | "two-column" | "grid-4" | "stat-block" | "checklist";
};

export const acts: Act[] = [
  { id: "cover", index: 1, chapter: "Presented by NowThis x Audible", kind: "hero", eyebrow: "PRESENTED BY NOWTHIS x AUDIBLE", headline: "THE HUNT", body: ["CAMPAIGN KICKOFF EXPERIENCE 2026"], background: "keyart", slideLayout: "hero" },
  { id: "structure", index: 2, chapter: "Structure", kind: "narrative", headline: "How The\nNight Unfolds", background: "bg-02", slideLayout: "two-column", bullets: [
    { label: "PART I — THE HUNT", items: ["Guests enter The Hunt and explore Dracula through hidden journal entries, immersive audio, and interactive discoveries throughout the venue."] },
    { label: "PART II — THE REVEAL", items: ["One final discovery completes The Hunt and leads guests to Audible, where they can continue listening to uncover how Dracula ends."] },
  ] },
  { id: "premise", index: 3, chapter: "One Night Only", kind: "narrative", headline: "One Night Only", background: "bg-03", image: "env-portal.jpg", slideLayout: "split", body: ["For one night only, Audible transforms a chic New York venue into The Hunt. Drawn from the haunting pages of Dracula, the evening blends decadent dining, gothic luxury, and interactive storytelling into New York's most coveted invitation.", "A stylish New York venue is transformed into Dracula's dining room through candlelight, dramatic tablescapes, and lavish details inspired by gothic luxury. Fog creeping over the floors, dramatic lighting, and luxurious gothic touches leave no doubt where this evening is taking place."] },
  { id: "arrival", index: 4, chapter: "Arrival", kind: "narrative", headline: "You May Enter", background: "bg-02", image: "env-carriage.jpg", slideLayout: "full-image-caption", body: ["Guests arrive by carriage to a landmarked 1767 carriage house. The original 18th-century hitching post still stands inside. This is not a set - it is the building the story would have chosen."], galleries: [
    { title: "The Entrance", images: [
      { src: "render-entrance.jpg", caption: "The transformed entrance", kind: "render" },
      { src: "venue-entrance.jpg", caption: "The entrance today", kind: "venue" },
    ] },
  ] },
  { id: "entrance-design", index: 5, chapter: "Entrance Design", kind: "carousel", headline: "Building The Threshold", background: "bg-03", slideLayout: "grid-4", cards: [
    { badge: "EXPERIENCE", title: "Arrival Environment", body: "A candlelit reception environment introduces guests to the world of Dracula through velvet drapery, portrait mirrors, florals, and the first invitation to enter.", image: "entrance-environment.png" },
    { badge: "GUEST FLOW", title: "Floor Plan", body: "The floor plan coordinates arrival, activation queues, the feast, portraits, aura readings, the library, and the customization station across the venue.", image: "entrance-floorplan.png", fit: "contain" },
    { badge: "PRODUCTION", title: "Entrance Build Plan", body: "The entrance elevation, materials, lighting, branded banners, florals, and modular construction details translate the threshold concept into a buildable installation.", image: "entrance-buildplan.png", fit: "contain" },
  ] },
  { id: "corridor", index: 6, chapter: "Threshold", kind: "narrative", headline: "Into The Castle", background: "bg-03", image: "env-corridor.jpg", slideLayout: "split", body: ["Guests step into the Count's castle through a candlelit corridor, where flickering light and dramatic drapes blur the line between reality and Dracula's world.", "Audio clips from Audible's Dracula play, letting guests know they are entering his realm. They receive a wax-sealed envelope, seemingly created in another time and place."] },
  { id: "map", index: 7, chapter: "The Invitation", kind: "narrative", headline: "Open If You Dare", background: "bg-02", image: "env-envelope.jpg", slideLayout: "full-image-caption", body: ["Inside each wax-sealed envelope is an illustrated map that lays out the evening, providing further instructions for The Hunt. As the night unfolds, the map becomes their guide, leading them to each immersive activation where they'll uncover clues, collect stamps, and piece together Dracula's story."], galleries: [
    { title: "The Letter & The Map", images: [
      { src: "graphic-letter-mechanic.jpg", caption: "Guest experience - tap to unlock", kind: "graphic" },
      { src: "graphic-venue-map.jpg", caption: "Venue floor plan", kind: "graphic" },
    ] },
  ] },
  { id: "dresscode", index: 8, chapter: "Guests", kind: "narrative", headline: "The Dress Code", background: "bg-03", slideLayout: "split", body: ["The Hunt invites guests to interpret Dracula through high fashion, embracing dramatic silhouettes, rich textures, and couture rooted in gothic glamour. Think modern vampire, not costume, where every look feels worthy of the front row."] },
  { id: "menu", index: 9, chapter: "Dining", kind: "carousel", headline: "The Menu", background: "bg-03", slideLayout: "grid-4", cards: [
    { badge: "TABLE", title: "The Grazing Table", body: "A dramatic grazing table reimagines Dracula through elevated bites featuring blood oranges, black cherries, dark chocolate, and other sophisticated nods to vampire lore. Each dish draws from iconic symbols and moments from the novel.", image: "env-grazing-table.jpg" },
    { badge: "DRACULA", title: "Smoked Old Fashioned", body: "With blood orange.", image: "env-cocktails.jpg" },
    { badge: "MINA", title: "Elderflower & Champagne Spritz", body: "", image: "env-cocktails.jpg" },
    { badge: "LUCY", title: "Black Cherry Gin Cocktail", body: "", image: "env-cocktails.jpg" },
  ], galleries: [
    { title: "The Grazing Table", images: [
      { src: "graphic-grazing-menu.jpg", caption: "Grazing table menu", kind: "graphic" },
    ] },
  ] },
  { id: "atmosphere", index: 10, chapter: "Atmosphere", kind: "narrative", headline: "The Castle\nComes To Life", background: "bg-02", image: "env-tablescape.jpg", slideLayout: "two-column", bullets: [
    { label: "THE TABLE BECOMES THE CENTERPIECE", items: ["Lavish tablescapes overflowing with moss, florals, and candlelight", "Hidden journal pages reveal forgotten moments from the novel before the investigation begins"] },
    { label: "THE FEAST HAS A SOUNDTRACK", items: ["A live string quartet sets the tone as guests arrive and dine", "Immersive sound design fills the space with whispers, turning pages, church bells, and wolves", "Exclusive moments from Audible's narration drift through the dining room, surrounding guests with the voices of Dracula"] },
  ], galleries: [
    { title: "The Grand Feast", images: [
      { src: "render-grand-feast.jpg", caption: "Grand feast render", kind: "render" },
      { src: "render-grand-feast-alt.jpg", caption: "Alternate grand feast render", kind: "render" },
      { src: "venue-grand-feast.jpg", caption: "The feast room today", kind: "venue" },
    ] },
  ] },
  { id: "hunt", index: 11, chapter: "The Mechanic", kind: "narrative", headline: "The Hunt For Dracula", background: "bg-03", image: "env-stamp.jpg", slideLayout: "full-image-caption", body: ["Using the map they received upon arrival, guests must visit every activation hidden throughout the venue to piece together the answer. At each stop, they uncover a new part of the story through audio, prophecy, or visual clues and receive a custom blood-red Audible stamp marking their progress.", "Each clue reveals more. Each branded stamp brings them closer. Only guests who complete the entire Hunt and collect every stamp can unlock The Midnight Revelation."] },
  { id: "activations", index: 12, chapter: "Four Activations", kind: "carousel", headline: "Four Clues", background: "bg-03", stampIndex: 4, slideLayout: "grid-4", cards: [
    { badge: "DECODE", title: "The Mirrors", body: "Antique mirrors conceal messages and visual illusions within their reflections. Guests must determine which reflection reveals the hidden message. The message uncovers another piece of Dracula's fate.", image: "env-mirrors.jpg" },
    { badge: "CAPTURE", title: "The Portrait Booth", body: "Guests step into the wine cellar's ornate Victorian portrait booth and become part of Dracula's world. Audio clips play as their portrait is captured. They must examine the finished portrait to uncover a hidden detail.", image: "render-wine-cellar.jpg", detailImages: [
      { src: "render-wine-cellar.jpg", caption: "Portrait booth render", kind: "render" },
      { src: "venue-wine-cellar.jpg", caption: "The wine cellar today", kind: "venue" },
    ] },
    { badge: "DIVINE", title: "The Aura Reading", body: "A dramatic aura reading captures the energy Dracula would see in you. Your aura reveals your fate: resistant to his influence, or dangerously easy to lure in. Guests leave with an aura portrait and personalized reading.", image: "env-aura.jpg" },
    { badge: "LISTEN", title: "Dracula's Library", body: "Guests search Dracula's library for books that unlock immersive audio. Integrated speakers create intimate listening moments. Guests must listen closely to uncover the clue hidden within.", image: "render-library.jpg", detailImages: [
      { src: "render-library.jpg", caption: "Library render", kind: "render" },
      { src: "venue-library.jpg", caption: "The library today", kind: "venue" },
    ] },
  ] },
  { id: "revelation", index: 13, chapter: "Completion", kind: "narrative", headline: "Four Clues. One Revelation.", background: "bg-02", stampIndex: 4, slideLayout: "two-column", body: ["In order to receive the final clue of the evening, guests must complete the\nfour Dracula experiences and receive their associated Audible stamps. Upon\ncompletion, guests display their stamped map and receive the final revelation."] },
  { id: "reveal", index: 14, chapter: "The Midnight Revelation", kind: "narrative", headline: "The Reveal", background: "bg-04", image: "env-mirror-reveal.jpg", slideLayout: "full-image-caption", body: ["With all four tasks complete and their final stamp secured, guests unlock The Midnight Revelation: an ornate handheld mirror created exclusively for the evening.", "Hidden within the reflection is one final message: \"Not everything can be seen. Some things must be heard.\" A discreet QR leads guests to Audible, where they can listen to uncover Dracula's ending for themselves."], galleries: [
    { title: "The Midnight Feast", images: [
      { src: "render-midnight-feast.jpg", caption: "Midnight feast render", kind: "render" },
      { src: "venue-midnight-feast.jpg", caption: "The room today", kind: "venue" },
    ] },
    { title: "The Gifting Suite", images: [
      { src: "render-gift-box.jpg", caption: "Branded gift box", kind: "render", specLabel: "175 pcs" },
      { src: "render-gifting-suite.jpg", caption: "Gifting suite render", kind: "render" },
      { src: "venue-gifting-suite.jpg", caption: "The gifting suite today", kind: "venue" },
    ] },
  ] },
  { id: "venue", index: 15, chapter: "Venue - Confirmed", kind: "venue", headline: "One if by Land, Two if by Sea", background: "bg-02", image: "env-venue-interior.jpg", slideLayout: "stat-block", body: ["17 Barrow St, New York, NY 10014", "Landmarked 1767 carriage house, formerly Aaron Burr's. Recognized for its classic menu, long history, and beautiful decor - often cited as the most romantic restaurant in New York City, and its old world touches fit the bill for Dracula.", "A barrel-vaulted stone tunnel runs from the building toward the old Hudson shoreline. Dracula arrives by sea. The passage is already there."], galleries: [
    { title: "The Floor Plan", images: [
      { src: "graphic-venue-map.jpg", caption: "Venue floor plan", kind: "graphic" },
    ] },
  ] },
  { id: "open-items", index: 16, chapter: "For Discussion", kind: "openItems", headline: "Open Items", background: "bg-03", slideLayout: "checklist", body: [
    "Audio integration - when and where clips play without disrupting the dining experience. Audio is mandatory to some extent; placement needs sign-off.",
    "Leave-behind production - the branded gift box is specified at 175 pcs and carries the QR component. Confirm final contents and approval path.",
    "Guest flow and throughput - the venue floor plan now maps activation zones. Model timed waves or staggered arrivals for the aura reading and portrait booth before final guest count.",
    "Talent and performance involvement - none currently scoped beyond the string quartet. Confirm whether Bailey, Purnell, or the costumed grand-feast performance shown in the render is in play.",
    "Date, final guest count, and budget band - date and budget are not yet set. Reconcile final guest count against the 175-box production quantity.",
    "Key art motion treatment - confirm brand-team approval for scroll-based parallax on the delivered key art composition.",
  ] },
  { id: "keyart-close", index: 17, chapter: "Listen To The Darkness", kind: "hero", headline: "Listen To The Darkness", background: "keyart", slideLayout: "hero" },
];

export const activationLabels = ["Decode", "Capture", "Divine", "Listen"];
export const venueStats = ["130 SEATED", "200 COCKTAIL", "3 ROOMS, PIPED SOUND", "PRIVATE GARDEN", "CLOSED MONDAYS - AVAILABLE FOR PRIVATE EVENTS"];

export function exportImageForAct(act: Act) {
  return act.galleries?.[0]?.images[0] ?? (act.image ? { src: act.image, caption: act.headline, kind: "render" as const } : null);
}
