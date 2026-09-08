import type { Act } from "../deck.config";

export type SlideRegion = { x: number; y: number; w: number; h: number };
export type SlideLayout = { image?: SlideRegion; title: SlideRegion; body?: SlideRegion };

export function slideLayoutFor(act: Act): SlideLayout {
  if (act.slideLayout === "hero") return { title: { x: .55, y: 4.55, w: 5.2, h: .6 } };
  if (act.slideLayout === "grid-4") return { title: { x: .5, y: .35, w: 9, h: .6 }, body: { x: .5, y: 1.05, w: 9, h: 4 } };
  if (act.image) return { image: { x: .35, y: .6, w: 5.25, h: 4.4 }, title: { x: 5.85, y: .7, w: 3.55, h: .75 }, body: { x: 5.85, y: 1.65, w: 3.55, h: 3.35 } };
  return { title: { x: .65, y: .7, w: 8.7, h: .75 }, body: { x: .65, y: 1.65, w: 8.7, h: 3.35 } };
}
