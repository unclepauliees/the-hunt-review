import puppeteer from "puppeteer-core";

const [url, output, width = "1440", height = "1000", fullPage = "false", reduceMotion = "false"] = process.argv.slice(2);
if (!url || !output) throw new Error("Usage: capture.mjs <url> <output> [width] [height]");

const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

const page = await browser.newPage();
await page.setViewport({ width: Number(width), height: Number(height), deviceScaleFactor: 1 });
if (reduceMotion === "true") await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
const consoleErrors = [];
const pageErrors = [];
const failedRequests = [];
page.on("console", (message) => {
  if (message.type() === "error") consoleErrors.push(message.text());
});
page.on("pageerror", (error) => pageErrors.push(error.message));
page.on("requestfailed", (request) => failedRequests.push(`${request.url()} ${request.failure()?.errorText ?? "failed"}`));
await page.goto(url, { waitUntil: "networkidle0" });
await page.screenshot({ path: output, fullPage: fullPage === "true" });
const metrics = await page.evaluate(() => ({
  scrollWidth: document.documentElement.scrollWidth,
  clientWidth: document.documentElement.clientWidth,
  scrollHeight: document.documentElement.scrollHeight,
  title: document.title,
}));
console.log(JSON.stringify({ metrics, consoleErrors, pageErrors, failedRequests }, null, 2));
await browser.close();
