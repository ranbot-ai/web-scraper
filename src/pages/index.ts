import { IQueueItem } from "../../types";
import { asyncForEach } from "../utils";
import { config } from "./../environment/config";
import { SOCIAL_LINKS, SOCIAL_LINKS_TO_EXCLUDE } from "./identifiers";

async function extractMetadata(page: any): Promise<any> {
  const metaData = await page.$$eval("meta", (metas: any) => {
    return metas.reduce((acc: any, meta: any) => {
      let key = meta.name || meta.property || meta["http-equiv"] || undefined;
      const value = meta.content;

      // Utility function to convert kebab-case to camelCase
      if (key)
        key = key
          .replace(/-([a-z])|_([a-z])|:([a-z])/g, (char: string) =>
            char.toUpperCase()
          )
          .replace(/\-|\_|\:/g, "");

      if (key && value) {
        // Automatically convert kebab-case keys to camelCase
        acc[key] = value; // Aggregate key-value pairs into a single object
      }

      return acc;
    }, {}); // Initialize as an empty object for aggregation
  });

  return metaData; // Return metadata in the desired format
}

async function extractContactAddress(page: any): Promise<any> {
  const address = await page.$$eval(`a[href^='mailto:']`, (elements: any[]) =>
    elements.map((el: { getAttribute: (arg0: string) => any }) =>
      el.getAttribute("href").replace("mailto:", "")
    )
  );

  return [...new Set(address)];
}

async function extractContactPhone(page: any): Promise<any> {
  const phoneNumber = await page.$$eval(`a[href^='tel:']`, (elements: any[]) =>
    elements.map((el: { getAttribute: (arg0: string) => any }) =>
      el.getAttribute("href").replace("tel:", "")
    )
  );

  return [...new Set(phoneNumber)];
}

async function extractYoutubeLinks(page: any): Promise<any> {
  const youtubeLinks = await page.$$eval(`iframe`, (elements: any[]) =>
    elements
      .map((el: { getAttribute: (arg0: string) => any }) =>
        el.getAttribute("src")
      )
      .filter((link: string) => {
        return (
          link &&
          link.match(
            /\s*(https?:\/\/www.youtube.com\/(?:v|embed)\/([a-zA-Z0-9-]+).*)/
          )
        );
      })
  );

  return [...new Set(youtubeLinks)];
}

async function extractSocialLinks(page: any): Promise<any> {
  let links: string[] = [];
  await asyncForEach(SOCIAL_LINKS, async (prefix: string) => {
    let linksForPrefix = await page.evaluate((prefix: string) => {
      //returns array of all hrefs that fit social links
      const currentURL = document.location.href;

      return Array.from(document.querySelectorAll("a[href^='" + prefix + "']"))
        .map((a: any) => a.getAttribute("href"))
        .filter(
          (link) =>
            link.match(/^https\:\/\/github\.com/) === null ||
            (currentURL.match(/^https\:\/\/github\.com/) &&
              link === "https://github.com/github")
        );
    }, prefix);

    links.push(linksForPrefix);
  });

  return Array.from(new Set(links.flat())).filter((link) => {
    let matched = false;

    SOCIAL_LINKS_TO_EXCLUDE.forEach((regexp: any) => {
      if (link.match(regexp)) matched = true;
    });
    return !matched;
  });
}

export async function findLinksToVisit(page: any) {
  const rawLinks = await page.evaluate(() => {
    const anchorTags = document.querySelectorAll("a");

    let linkData = Array.from(anchorTags)
      .filter((anchor) => {
        let cleanedText = anchor.textContent?.trim();
        return (
          cleanedText &&
          /\S/.test(cleanedText) &&
          !/^(mailto|javascript|#|tel|fax|sms):/.test(anchor.href)
        );
      })
      .map((anchor) => {
        let cleanedText = anchor.textContent?.trim();
        const imgTags = anchor.querySelectorAll("img");

        // Replace <img> tags with their alt text
        if (imgTags.length > 0) {
          imgTags.forEach((img) => {
            const altText = img.alt.trim();
            // Replace the <img> tag in the anchor's innerHTML with the alt text
            if (altText) {
              cleanedText = cleanedText?.replace(img.outerHTML, altText);
            }
          });
        }

        // Further clean the text by removing any residual HTML tags
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = cleanedText as string;
        cleanedText = tempDiv.textContent || tempDiv.innerText || "";

        // Remove \n characters and duplicate spaces
        cleanedText = cleanedText.replace(/\s+/g, " ").trim();

        return {
          href: anchor.href,
          text: cleanedText,
        };
      });

    // Filter out duplicates based on href only
    const uniqueLinkData = Array.from(
      new Set(linkData.map((link) => link.href))
    ).map((href) => linkData.find((link) => link.href === href));
    return uniqueLinkData;
  });

  return rawLinks;
}

// scrape page metadata and social links
async function scrapePublicPage(
  browser: any,
  queue: IQueueItem[]
): Promise<void> {
  // Go through every item in the queue and open page in the browser
  while (queue.length > 0) {
    let queueItem: IQueueItem = queue.shift() as IQueueItem;
    console.log(queueItem);
    let identifier = queueItem.identifier;

    const context = browser.defaultBrowserContext();
    let page = await browser.newPage();

    // Configure the navigation timeout
    await page.setDefaultNavigationTimeout(config.timeout);

    let domain = identifier.identifier;
    let response: any = null;
    let error: any = null;
    let success = false;
    let data: any = {};

    await asyncForEach(config.protocols, async (protocol: string) => {
      if (success === false) {
        let url = protocol + domain;

        try {
          data["sourceUrl"] = url;
          console.log("// Visiting: " + url);

          await context.overridePermissions(url, [
            "geolocation",
            "notifications",
          ]);
          response = await page.goto(url, { waitUntil: "networkidle2" });

          console.log("// -> Page Loaded");
          success = true;
        } catch (err: any) {
          response = null;
          error = err;
          console.error("// -> Error: " + err.message);
        }
      }
    });

    if (success === false) {
      if (error !== null) data["error"] = error.message;
    } else {
      if (response !== null) data["responseCode"] = response.status();

      await page.bringToFront();

      data["finalUrl"] = await page.evaluate(() => document.location.href);
      data["title"] = await page.evaluate(() => document.title);
      data["contactEmail"] = await extractContactAddress(page);
      data["contactPhone"] = await extractContactPhone(page);
      data["metadata"] = await extractMetadata(page);
      data["youtubeLinks"] = await extractYoutubeLinks(page);
      data["socialLinks"] = await extractSocialLinks(page);
      data["rawLinks"] = await findLinksToVisit(page);
    }

    console.log(`// Data: ${JSON.stringify(data, null, 2)}`);

    await page.close();
  }

  await browser.close();
}

export { scrapePublicPage };
