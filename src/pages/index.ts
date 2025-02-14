import { IQueueItem } from "../../types";
import { asyncForEach } from "../utils";
import { config } from "../environment/config";
import { SOCIAL_LINKS, SOCIAL_LINKS_TO_EXCLUDE } from "./identifiers";

type MetaData = Record<string, string>;
type ContactInfo = {
  emails: string[];
  phones: string[];
};
type LinkData = {
  href: string;
  text: string;
};

async function extractMetadata(page: any): Promise<MetaData> {
  return page.$$eval("meta", (metas: HTMLMetaElement[]) => {
    return metas.reduce((acc: MetaData, meta: HTMLMetaElement) => {
      const key = meta.name || meta.getAttribute("property") || meta.httpEquiv;
      const value = meta.content;

      if (key) {
        const camelCaseKey = key
          .replace(/-([a-z])|_([a-z])|:([a-z])/g, (char: string) =>
            char.toUpperCase()
          )
          .replace(/[-_:]/g, "");
        if (value) acc[camelCaseKey] = value;
      }

      return acc;
    }, {});
  });
}

async function extractContactInfo(page: any): Promise<ContactInfo> {
  const emails = await page.$$eval(
    `a[href^='mailto:']`,
    (elements: HTMLAnchorElement[]) =>
      elements
        .map((el) => el.getAttribute("href")?.replace("mailto:", ""))
        .filter(Boolean) as string[]
  );

  const phones = await page.$$eval(
    `a[href^='tel:']`,
    (elements: HTMLAnchorElement[]) =>
      elements
        .map((el) => el.getAttribute("href")?.replace("tel:", ""))
        .filter(Boolean) as string[]
  );

  return {
    emails: [...new Set(emails)] as string[],
    phones: [...new Set(phones)] as string[],
  };
}

async function extractYoutubeLinks(page: any): Promise<string[]> {
  return page.$$eval(`iframe`, (elements: HTMLIFrameElement[]) =>
    elements
      .map((el) => el.getAttribute("src"))
      .filter(
        (link) =>
          link &&
          /https?:\/\/www\.youtube\.com\/(?:v|embed)\/([a-zA-Z0-9-]+)/.test(
            link
          )
      )
  );
}

async function extractSocialLinks(page: any): Promise<string[]> {
  const links: string[] = [];
  await asyncForEach(SOCIAL_LINKS, async (prefix: string) => {
    const linksForPrefix = await page.evaluate((prefix: string) => {
      const currentURL = document.location.href;
      return Array.from(document.querySelectorAll(`a[href^='${prefix}']`))
        .map((a) => a.getAttribute("href"))
        .filter(
          (link) =>
            !link?.match(/^https:\/\/github\.com/) ||
            (currentURL.match(/^https:\/\/github\.com/) &&
              link === "https://github.com/github")
        );
    }, prefix);

    links.push(...linksForPrefix);
  });

  return Array.from(new Set(links)).filter(
    (link) => !SOCIAL_LINKS_TO_EXCLUDE.some((regexp) => link.match(regexp))
  );
}

async function findLinksToVisit(page: any): Promise<LinkData[]> {
  const rawLinks = await page.evaluate(() => {
    const anchorTags = document.querySelectorAll("a");
    const linkData = Array.from(anchorTags)
      .filter((anchor) => {
        const cleanedText = anchor.textContent?.trim();
        return (
          cleanedText &&
          /\S/.test(cleanedText) &&
          !/^(mailto|javascript|#|tel|fax|sms):/.test(anchor.href)
        );
      })
      .map((anchor) => {
        let cleanedText = anchor.textContent?.trim();
        const imgTags = anchor.querySelectorAll("img");

        imgTags.forEach((img) => {
          const altText = img.alt.trim();
          if (altText) {
            cleanedText = cleanedText?.replace(img.outerHTML, altText);
          }
        });

        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = cleanedText as string;
        cleanedText = tempDiv.textContent || tempDiv.innerText || "";
        cleanedText = cleanedText.replace(/\s+/g, " ").trim();

        return {
          href: anchor.href,
          text: cleanedText,
        };
      });

    const uniqueLinkData = Array.from(
      new Set(linkData.map((link) => link.href))
    ).map((href) => linkData.find((link) => link.href === href));
    return uniqueLinkData;
  });

  return rawLinks;
}

async function scrapePublicPage(
  browser: any,
  queue: IQueueItem[]
): Promise<void> {
  while (queue.length > 0) {
    const queueItem: IQueueItem = queue.shift() as IQueueItem;
    console.log(queueItem);
    const identifier = queueItem.identifier;

    const context = browser.defaultBrowserContext();
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(config.timeout);

    const domain = identifier.identifier;
    let response: any = null;
    let error: any = null;
    let success = false;
    const data: any = {};

    await asyncForEach(config.protocols, async (protocol: string) => {
      if (!success) {
        const url = `${protocol}${domain}`;
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

    if (!success) {
      if (error) data["error"] = error.message;
    } else {
      if (response) data["responseCode"] = response.status();
      await page.bringToFront();

      data["finalUrl"] = await page.evaluate(() => document.location.href);
      data["title"] = await page.evaluate(() => document.title);
      const contactInfo = await extractContactInfo(page);
      data["contactEmail"] = contactInfo.emails;
      data["contactPhone"] = contactInfo.phones;
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
