import pptxgen from "pptxgenjs";
import JSZip from "jszip";
import { asset } from "../assets";
import { acts, exportImageForAct, venueStats, type Act, type Card, type GalleryImage } from "../deck.config";

const W = 10;
const H = 5.625;
const bgFiles = { "bg-02": "bg-02-16x9.jpg", "bg-03": "bg-03-16x9.jpg", "bg-04": "bg-04-16x9.jpg", keyart: "keyart-16x9.jpg" } as const;
const color = { black: "171B1B", oxblood: "390F10", gold: "B6875B", sand: "E4BD96", white: "FFFFFF" };

async function dataUri(src: string) {
  const blob = await fetch(src).then((response) => response.blob());
  return await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

const textOptions = { fontFace: "Spectral", color: color.sand, margin: 0, breakLine: false } as const;

function addImage(slide: pptxgen.Slide, data: string, x: number, y: number, w: number, h: number, fit: "cover" | "contain" = "cover", altText = "") {
  slide.addImage({ data, x, y, w, h, sizing: { type: fit, w, h }, altText });
}

function addOverlay(slide: pptxgen.Slide, pptx: pptxgen, transparency = 35, fill = color.black, x = 0, y = 0, w = W, h = H) {
  slide.addShape(pptx.ShapeType.rect, { x, y, w, h, fill: { color: fill, transparency }, line: { transparency: 100 } });
}

function addMarker(slide: pptxgen.Slide, text: string, x: number, y: number, w: number, align: "left" | "center" = "left") {
  slide.addText(text.toUpperCase(), { ...textOptions, x, y, w, h: .22, fontSize: 8.5, color: color.gold, charSpacing: 2.3, align, fit: "shrink" });
}

function addTitle(slide: pptxgen.Slide, text: string, x: number, y: number, w: number, h: number, fontSize = 30, align: "left" | "center" = "left") {
  slide.addText(text, { ...textOptions, x, y, w, h, fontSize, breakLine: true, fit: "shrink", valign: "middle", align });
}

function addBody(slide: pptxgen.Slide, paragraphs: string[], x: number, y: number, w: number, h: number, fontSize = 13, align: "left" | "center" = "left") {
  slide.addText(paragraphs.join("\n\n"), { ...textOptions, x, y, w, h, fontSize, transparency: 10, valign: "top", breakLine: true, fit: "shrink", paraSpaceAfter: 9, align });
}

function exportBodyForAct(act: Act) {
  if (act.body?.length) return act.body;
  if (act.bullets?.length) return act.bullets.flatMap((group) => [group.label, ...group.items]);
  if (act.cards?.length) {
    return act.cards.map((card) => [card.badge, card.title, card.body].filter(Boolean).join(" / "));
  }
  return [];
}

async function addBase(slide: pptxgen.Slide, pptx: pptxgen, act: Act, transparency = 38) {
  addImage(slide, await dataUri(asset(bgFiles[act.background])), 0, 0, W, H);
  addOverlay(slide, pptx, transparency);
}

async function addHero(slide: pptxgen.Slide, pptx: pptxgen, act: Act) {
  addImage(slide, await dataUri(asset("keyart-16x9.jpg")), 0, 0, W, H, "contain", "Audible Dracula key art featuring Jonathan Bailey and Ella Purnell");
  if (act.id === "keyart-close") {
    addOverlay(slide, pptx, 42, color.black, 0, 3.55, W, 2.075);
    addImage(slide, await dataUri(asset("tagline-listen-2line.svg")), 3.1, 4.25, 3.8, .8, "contain", "Listen to the Darkness");
    return;
  }
  addOverlay(slide, pptx, 10, color.black, 0, 0, 4.45, H);
  addOverlay(slide, pptx, 24, color.black, 0, 0, 3.7, H);
  addMarker(slide, act.eyebrow ?? act.chapter, .55, .55, 3.2);
  slide.addText(act.body?.[0] ?? "", { ...textOptions, x: .65, y: 4.15, w: 3.35, h: .25, fontSize: 9, charSpacing: 2, align: "center", fit: "shrink" });
  addImage(slide, await dataUri(asset("tagline-audio-2line.svg")), 1.12, 4.48, 2.45, .62, "contain", "A New Audio Thriller");
}

async function addFullImageCaption(slide: pptxgen.Slide, pptx: pptxgen, act: Act) {
  addImage(slide, await dataUri(asset(act.image!)), 0, 0, W, H, "cover", act.headline);
  if (act.id === "arrival") {
    addOverlay(slide, pptx, 62);
    addMarker(slide, act.chapter, 3.2, 2.28, 3.6, "center");
    addTitle(slide, act.headline, 2, 2.56, 6, .75, 38, "center");
    return;
  }
  addOverlay(slide, pptx, 20);
  addOverlay(slide, pptx, 8, color.black, 0, 3.25, W, 2.375);
  addMarker(slide, act.chapter, .65, 3.78, 4.8);
  addTitle(slide, act.headline, .65, 4.05, 4.9, .62, 28);
  if (act.body?.length === 1) addBody(slide, act.body, 5.85, 3.75, 3.5, 1.2, 11.5);
  if ((act.body?.length ?? 0) > 1) addBody(slide, act.body ?? [], 5.85, 3.55, 3.5, 1.55, 8.8);
}

async function addGalleryExport(slide: pptxgen.Slide, pptx: pptxgen, act: Act, image: GalleryImage) {
  if (image.kind === "graphic") {
    await addBase(slide, pptx, act, 48);
    addImage(slide, await dataUri(asset(image.src)), .55, .52, 4.8, 4.58, "contain", image.caption);
    slide.addShape(pptx.ShapeType.roundRect, { x: .55, y: .52, w: 4.8, h: 4.58, rectRadius: .06, fill: { color: color.black, transparency: 100 }, line: { color: color.sand, transparency: 84, width: .5 } });
    addMarker(slide, act.chapter, 5.72, .78, 3.75);
    addTitle(slide, act.headline, 5.72, 1.08, 3.7, .76, act.kind === "venue" ? 25 : 29);
    const body = exportBodyForAct(act);
    if (body.length) addBody(slide, body, 5.72, 1.98, 3.55, act.kind === "venue" ? 1.18 : 2.65, act.kind === "venue" ? 9.2 : 10.5);
    if (act.kind === "venue") {
      venueStats.forEach((stat, index) => {
        const y = 3.42 + index * .3;
        slide.addShape(pptx.ShapeType.line, { x: 5.72, y, w: 3.55, h: 0, line: { color: color.sand, transparency: 82, width: .5 } });
        slide.addText(stat, { ...textOptions, x: 5.72, y: y + .07, w: 3.55, h: .16, fontSize: 7, color: color.gold, charSpacing: 1.2, fit: "shrink" });
      });
    }
    return;
  }

  addImage(slide, await dataUri(asset(image.src)), 0, 0, W, H, "cover", image.caption);
  if (act.bullets?.length) {
    addOverlay(slide, pptx, 42);
    addMarker(slide, act.chapter, .78, .78, 3.8);
    addTitle(slide, act.headline, .78, 1.08, 4.4, 1.05, 33);
    act.bullets.forEach((group, index) => {
      const x = index === 0 ? .78 : 5.22;
      addMarker(slide, group.label, x, 2.62, 3.8);
      addBody(slide, group.items, x, 3.02, 3.92, 1.8, 10.5);
    });
    return;
  }
  if (act.id === "arrival") {
    addOverlay(slide, pptx, 58);
    addMarker(slide, act.chapter, 3.2, 2.28, 3.6, "center");
    addTitle(slide, act.headline, 2, 2.56, 6, .75, 38, "center");
    return;
  }
  addOverlay(slide, pptx, 26);
  addOverlay(slide, pptx, 12, color.black, 0, 3.1, W, 2.525);
  addMarker(slide, act.chapter, .65, 3.6, 4.8);
  addTitle(slide, act.headline, .65, 3.88, 4.9, .68, 28);
  const body = exportBodyForAct(act);
  if (body.length) addBody(slide, body, 5.85, 3.42, 3.5, 1.62, body.length > 2 ? 8.8 : 10.5);
}

async function addSplit(slide: pptxgen.Slide, pptx: pptxgen, act: Act) {
  await addBase(slide, pptx, act, 50);
  addImage(slide, await dataUri(asset(act.image!)), .75, .62, 4.25, 4.38, "cover", act.headline);
  slide.addShape(pptx.ShapeType.roundRect, { x: .75, y: .62, w: 4.25, h: 4.38, rectRadius: .06, fill: { color: color.black, transparency: 100 }, line: { color: color.sand, transparency: 82, width: .5 } });
  addMarker(slide, act.chapter, 5.35, 1.18, 3.8);
  addTitle(slide, act.headline, 5.35, 1.48, 3.9, .8, 31);
  addBody(slide, act.body ?? [], 5.35, 2.45, 3.75, 2.35, 12.5);
}

async function addTwoColumn(slide: pptxgen.Slide, pptx: pptxgen, act: Act) {
  if (act.id === "atmosphere" && act.image) {
    addImage(slide, await dataUri(asset(act.image)), 0, 0, W, H, "cover", "Candlelit Dracula-inspired tablescape");
    addOverlay(slide, pptx, 22);
  } else {
    await addBase(slide, pptx, act, 32);
  }
  const left = act.id === "structure" || act.id === "atmosphere" ? 1.58 : .8;
  addMarker(slide, act.chapter, left, .75, 3.8);
  addTitle(slide, act.headline, left, 1.03, 4.4, 1.05, 33);
  if (act.bullets) {
    act.bullets.forEach((group, index) => {
      const x = index === 0 ? left : 5.3;
      addMarker(slide, group.label, x, 2.58, 3.8);
      addBody(slide, group.items, x, 2.98, 3.85, 1.85, 12.5);
    });
  } else if (act.body?.length) {
    addBody(slide, act.body, 1.45, 2.55, 7.1, 1.6, 15, "center");
  }
}

function cardGeometry(count: number, index: number) {
  const gap = .12;
  const width = (9 - gap * (count - 1)) / count;
  return { x: .5 + index * (width + gap), y: 1.18, w: width, h: 3.85 };
}

async function addCard(slide: pptxgen.Slide, pptx: pptxgen, card: Card, index: number, count: number) {
  const box = cardGeometry(count, index);
  addImage(slide, await dataUri(asset(card.image)), box.x, box.y, box.w, box.h, card.fit ?? "cover", card.title);
  addOverlay(slide, pptx, 20, color.black, box.x, box.y, box.w, box.h);
  addOverlay(slide, pptx, 7, color.black, box.x, box.y + 2.08, box.w, 1.77);
  addMarker(slide, card.badge, box.x + .18, box.y + 2.27, box.w - .36);
  slide.addText(card.title, { ...textOptions, x: box.x + .18, y: box.y + 2.58, w: box.w - .36, h: .56, fontSize: count > 3 ? 16 : 18, bold: true, color: color.white, breakLine: true, fit: "shrink", valign: "bottom" });
  if (card.body) slide.addText(card.body, { ...textOptions, x: box.x + .18, y: box.y + 3.2, w: box.w - .36, h: .61, fontSize: count > 3 ? 8.4 : 9.5, color: color.white, transparency: 4, breakLine: true, fit: "shrink", valign: "top" });
}

async function addGrid(slide: pptxgen.Slide, pptx: pptxgen, act: Act) {
  await addBase(slide, pptx, act, 46);
  addMarker(slide, act.chapter, .5, .33, 3.4);
  addTitle(slide, act.headline, .5, .56, 5, .5, 26);
  const cards = act.cards ?? [];
  await Promise.all(cards.map((card, index) => addCard(slide, pptx, card, index, cards.length)));
}

async function addVenue(slide: pptxgen.Slide, pptx: pptxgen, act: Act) {
  addImage(slide, await dataUri(asset(act.image!)), 0, 0, W, H, "cover", "One if by Land, Two if by Sea dining room");
  addOverlay(slide, pptx, 15);
  addOverlay(slide, pptx, 5, color.black, 4.85, 0, 5.15, H);
  addMarker(slide, act.chapter, 5.2, .48, 4.1);
  addTitle(slide, act.headline, 5.2, .72, 4.15, .82, 28);
  addMarker(slide, act.body?.[0] ?? "", 5.2, 1.64, 4.1);
  addBody(slide, [act.body?.[1] ?? ""], 5.2, 2.02, 4.05, 1.22, 11.5);
  venueStats.forEach((stat, index) => {
    const y = 3.33 + index * .31;
    slide.addShape(pptx.ShapeType.line, { x: 5.2, y, w: 4.02, h: 0, line: { color: color.sand, transparency: 82, width: .5 } });
    slide.addText(stat, { ...textOptions, x: 5.2, y: y + .07, w: 4.02, h: .16, fontSize: 7.5, color: color.gold, charSpacing: 1.4, fit: "shrink" });
  });
  slide.addText(act.body?.[2] ?? "", { ...textOptions, x: 5.2, y: 4.96, w: 4.02, h: .35, fontSize: 8.4, fit: "shrink", breakLine: true });
}

async function addChecklist(slide: pptxgen.Slide, pptx: pptxgen, act: Act) {
  await addBase(slide, pptx, act, 36);
  addMarker(slide, act.chapter, .65, .42, 3.5);
  addTitle(slide, act.headline, .65, .68, 4.2, .58, 29);
  (act.body ?? []).forEach((item, index) => {
    const y = 1.42 + index * .65;
    slide.addShape(pptx.ShapeType.line, { x: .65, y, w: 8.7, h: 0, line: { color: color.sand, transparency: 82, width: .5 } });
    slide.addText(String(index + 1).padStart(2, "0"), { ...textOptions, x: .65, y: y + .15, w: .38, h: .2, fontSize: 8, color: color.gold });
    slide.addText(item, { ...textOptions, x: 1.18, y: y + .1, w: 7.55, h: .42, fontSize: 10.5, fit: "shrink", breakLine: true, valign: "middle" });
    slide.addText("OWNER", { ...textOptions, x: 8.78, y: y + .17, w: .55, h: .14, fontSize: 6.5, color: color.gold, align: "right" });
  });
}

async function addAct(pptx: pptxgen, act: Act) {
  const slide = pptx.addSlide();
  if (act.kind === "hero") return addHero(slide, pptx, act);
  const exportImage = exportImageForAct(act);
  if (exportImage && act.galleries?.length) return addGalleryExport(slide, pptx, act, exportImage);
  if (act.kind === "carousel") return addGrid(slide, pptx, act);
  if (act.kind === "venue") return addVenue(slide, pptx, act);
  if (act.kind === "openItems") return addChecklist(slide, pptx, act);
  if (act.id === "dresscode" || act.slideLayout === "two-column") return addTwoColumn(slide, pptx, act);
  if (act.slideLayout === "full-image-caption") return addFullImageCaption(slide, pptx, act);
  if (act.slideLayout === "split") return addSplit(slide, pptx, act);
  await addBase(slide, pptx, act);
  addMarker(slide, act.chapter, .65, .72, 4);
  addTitle(slide, act.headline, .65, 1.05, 5.3, .8, 31);
  addBody(slide, act.body ?? [], .65, 2.05, 7.9, 2.6, 13.5);
}

export async function exportPptx() {
  const pptx = new pptxgen();
  pptx.defineLayout({ name: "HUNT_WIDE", width: W, height: H });
  pptx.layout = "HUNT_WIDE";
  pptx.author = "NowThis x Audible";
  pptx.subject = "The Hunt campaign kickoff";
  pptx.title = "The Hunt";
  pptx.company = "NowThis x Audible";
  pptx.theme = { headFontFace: "Spectral", bodyFontFace: "Spectral" };
  for (const act of acts) await addAct(pptx, act);
  const generated = await pptx.write({ outputType: "blob", compression: true }) as Blob;
  const archive = await JSZip.loadAsync(generated);
  const contentTypesFile = archive.file("[Content_Types].xml");
  if (!contentTypesFile) throw new Error("The PowerPoint package is missing its content type manifest.");
  const contentTypes = await contentTypesFile.async("string");
  const repairedTypes = contentTypes.replace(/<Override PartName="\/ppt\/slideMasters\/slideMaster(\d+)\.xml" ContentType="[^"]+"\/>/g, (entry, index) => (
    archive.file(`ppt/slideMasters/slideMaster${index}.xml`) ? entry : ""
  ));
  archive.file("[Content_Types].xml", repairedTypes);
  const output = await archive.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 6 } });
  const url = URL.createObjectURL(output);
  const link = document.createElement("a");
  link.href = url;
  link.download = "the-hunt.pptx";
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30_000);
}
