import { scrapePublicPage } from "./pages";
const fs = require("fs-extra");

// import puppeteer library
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

puppeteer.use(StealthPlugin());

import { config } from "./environment/config";
import { IQueueItem } from "../types";
import { scrapeIdentifier } from "./pages/identifiers";

(async () => {
  console.log(`>> Starting ${config.name} ......`);

  const userDataDir = `/tmp/chrome-user-data-${Math.floor(
    Math.random() * 100000
  )}`;
  const args = [
    "--disable-infobars",
    "--user-agent=" + config.user_agent,
    "--user-data-dir=" + userDataDir,
    "--ignore-certificate-errors",
    "--ignore-certifcate-errors-spki-list",
    "--disable-background-timer-throttling",
    "--disable-backgrounding-occluded-windows",
    "--disable-renderer-backgrounding",
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--disable-dev-shm-usage",
    "--disable-accelerated-2d-canvas",
    "--disable-gpu",
    "--disable-search-geolocation-disclosure",
    "--disable-plugins",
    "--disable-notifications",
  ];

  // Start browser
  const browser = await puppeteer.launch({
    headless: config.headless,
    devtools: config.devtools,
    args: args,
  });

  // Fill up queue
  let queue: IQueueItem[] = await scrapeIdentifier();
  console.log(`>> Queue Size: ${queue.length}`);

  // Start to scrape instagram identifiers queues
  if (queue.length === 0) {
    console.log(">> Scraper exiting...");
  } else {
    await scrapePublicPage(browser, queue);
  }

  // Delete user data dir
  try {
    await fs.rmSync(userDataDir, { recursive: true, force: true });
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        " > Error clearing user data dir ",
        (error as Error).message
      );
    }
  }
})();
