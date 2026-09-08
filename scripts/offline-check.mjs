import puppeteer from "puppeteer-core";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const browser = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true, args: ["--no-sandbox", "--allow-file-access-from-files"] });
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 900 });
await page.setOfflineMode(true);
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
page.on("requestfailed", (request) => { if (!request.url().startsWith("file:")) errors.push(`${request.url()} ${request.failure()?.errorText}`); });
await page.goto(pathToFileURL(resolve("dist/the-hunt.html")).href, { waitUntil: "load" });
await new Promise((resolveWait) => setTimeout(resolveWait, 1500));
const result = await page.evaluate(() => ({ sections: document.querySelectorAll("[data-act-index]").length, scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth, title: document.title }));
console.log(JSON.stringify({ result, errors }, null, 2));
await browser.close();
