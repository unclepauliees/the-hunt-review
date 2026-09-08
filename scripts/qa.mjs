import puppeteer from "puppeteer-core";
import axe from "axe-core";
import { mkdirSync, readdirSync } from "node:fs";

const url = process.argv[2] ?? "http://127.0.0.1:4173/";
const out = ".impeccable/review";
mkdirSync(`${out}/downloads`, { recursive: true });
const browser = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true, args: ["--no-sandbox", "--disable-dev-shm-usage"] });

async function inspect(name, width, height, reduced = false, touch = false) {
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 1, hasTouch: touch, isMobile: width < 768 });
  if (reduced) await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  const errors = [];
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(url, { waitUntil: "networkidle0" });
  await page.screenshot({ path: `${out}/${name}.png`, fullPage: false });
  const basics = await page.evaluate(() => ({
    sections: document.querySelectorAll("[data-act-index]").length,
    width: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    slidesDisabled: document.querySelector('.export-cluster button:first-of-type')?.disabled,
  }));
  await page.evaluate(() => document.querySelector("#activations")?.scrollIntoView({ block: "start" }));
  await new Promise((resolve) => setTimeout(resolve, 500));
  const cards = await page.$$("#activations .elastic-item");
  if (cards[2]) await cards[2].click();
  const baseInteraction = await page.evaluate(() => ({
    activationCards: document.querySelectorAll("#activations .elastic-item").length,
    activeCards: document.querySelectorAll("#activations .elastic-item.is-active").length,
    activeTitle: document.querySelector("#activations .elastic-item.is-active h3")?.textContent,
    focusableCards: Array.from(document.querySelectorAll("#activations .elastic-panel-trigger")).every((button) => button.tabIndex === 0),
  }));
  const markers = await page.$$("#activations .carousel-progress .stamp");
  if (markers[1]) await markers[1].click();
  const markerNavigation = await page.evaluate(() => ({
    markerButtons: document.querySelectorAll("#activations .carousel-progress button.stamp").length,
    pressedMarkers: document.querySelectorAll('#activations .carousel-progress button.stamp[aria-pressed="true"]').length,
    activeTitle: document.querySelector("#activations .elastic-item.is-active h3")?.textContent,
  }));
  await page.click("#activations .elastic-item:nth-child(2) .elastic-cue");
  const detailOpen = await page.evaluate(() => ({
    dialog: Boolean(document.querySelector(".gallery-detail[role=dialog]")),
    image: document.querySelector(".gallery-detail img")?.getAttribute("alt"),
    copyVisible: Boolean(document.querySelector(".gallery-detail h3, .gallery-detail p")),
    bodyLocked: document.body.style.overflow === "hidden",
  }));
  await page.keyboard.press("Escape");
  const detailClosed = await page.evaluate(() => !document.querySelector(".gallery-detail") && document.body.style.overflow !== "hidden");
  const interaction = { ...baseInteraction, markerNavigation, detailOpen, detailClosed };
  await page.evaluate(axe.source);
  const a11y = await page.evaluate(async () => (await window.axe.run()).violations.map((violation) => ({ id: violation.id, impact: violation.impact, nodes: violation.nodes.length })));
  await page.close();
  return { name, basics, interaction, errors, a11y };
}

const results = [];
results.push(await inspect("final-desktop", 1440, 1000));
results.push(await inspect("final-ipad", 1024, 768, false, true));
results.push(await inspect("final-mobile", 390, 844, false, true));
results.push(await inspect("final-reduced", 1440, 1000, true));

const exportPage = await browser.newPage();
await exportPage.setViewport({ width: 1280, height: 900 });
const cdp = await exportPage.createCDPSession();
await cdp.send("Page.setDownloadBehavior", { behavior: "allow", downloadPath: `${process.cwd()}/${out}/downloads` });
await exportPage.goto(url, { waitUntil: "networkidle0" });
await exportPage.evaluate(() => { window.open = (target) => { document.body.dataset.openedTarget = target ?? ""; return {}; }; });
await exportPage.click('.export-cluster button:first-of-type');
await new Promise((resolve) => setTimeout(resolve, 7000));
const slidesFallback = await exportPage.evaluate(() => ({
  openedTarget: document.body.dataset.openedTarget,
  status: document.querySelector('.export-cluster [role="status"]')?.textContent,
}));
results.push({ slidesFallback, pptxDownloads: readdirSync(`${out}/downloads`) });
await exportPage.close();
await browser.close();
console.log(JSON.stringify(results, null, 2));
