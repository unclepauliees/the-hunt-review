import puppeteer from "puppeteer-core";
import { mkdirSync, readFileSync } from "node:fs";
import { createServer } from "node:http";

const artifact = readFileSync("dist/the-hunt.html");
const server = createServer((request, response) => {
  response.writeHead(200, { "content-type": "text/html; charset=utf-8" });
  response.end(artifact);
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const address = server.address();
const url = process.argv[2] ?? `http://127.0.0.1:${address.port}/`;
const out = ".impeccable/review/mobile-fix";
mkdirSync(out, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

async function capture(name, width, height, mobile = true) {
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 1, hasTouch: mobile, isMobile: mobile });
  const errors = [];
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(url, { waitUntil: "load", timeout: 60_000 });
  await new Promise((resolve) => setTimeout(resolve, 1_200));

  await page.evaluate(() => scrollTo(0, 0));
  await page.screenshot({ path: `${out}/${name}-hero.png` });
  const heroStart = await page.evaluate(() => getComputedStyle(document.querySelector(".hero-keyart-plane")).transform);
  await page.evaluate(() => scrollTo(0, Math.round(innerHeight * .35)));
  await new Promise((resolve) => setTimeout(resolve, 250));
  const heroMoved = await page.evaluate(() => getComputedStyle(document.querySelector(".hero-keyart-plane")).transform);

  await page.evaluate(() => document.querySelector("#premise")?.scrollIntoView());
  await new Promise((resolve) => setTimeout(resolve, 300));
  await page.screenshot({ path: `${out}/${name}-premise.png` });
  const premise = await page.evaluate(() => {
    const copy = getComputedStyle(document.querySelector("#premise .act-copy-motion"));
    return { opacity: copy.opacity, transform: copy.transform };
  });

  await page.evaluate(() => document.querySelector("#reveal")?.scrollIntoView());
  await new Promise((resolve) => setTimeout(resolve, 300));
  const revealStart = await page.evaluate(() => getComputedStyle(document.querySelector(".reveal-parallax-media")).clipPath);
  await page.evaluate(() => scrollBy(0, Math.round(innerHeight * .7)));
  await new Promise((resolve) => setTimeout(resolve, 300));
  const revealMoved = await page.evaluate(() => getComputedStyle(document.querySelector(".reveal-parallax-media")).clipPath);
  await page.screenshot({ path: `${out}/${name}-reveal.png` });

  const basics = await page.evaluate(() => ({
    scrollY,
    scrollHeight: document.documentElement.scrollHeight,
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    lenisActive: document.documentElement.classList.contains("lenis"),
    exportPosition: getComputedStyle(document.querySelector(".export-cluster")).position,
    sections: document.querySelectorAll("[data-act-index]").length,
  }));
  await page.close();
  return { name, basics, heroStart, heroMoved, premise, revealStart, revealMoved, errors };
}

const results = [
  await capture("phone", 390, 844),
  await capture("phone-narrow", 320, 700),
  await capture("tablet", 820, 1180),
  await capture("desktop", 1440, 1000, false),
];

await browser.close();
await new Promise((resolve) => server.close(resolve));
console.log(JSON.stringify(results, null, 2));
