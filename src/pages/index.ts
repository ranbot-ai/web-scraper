import { IQueueItem } from '../../types';
import { asyncForEach } from '../utils';
import { config } from './../environment/config';
import { SOCIAL_LINKS, SOCIAL_LINKS_TO_EXCLUDE } from './identifiers';

async function extractMetadata(page: any): Promise<any> {
  const metaData = await page.evaluate(() => {
    const headerMeta: any = Array.from(
      document.getElementsByTagName('meta')
    ).map((meta: any) => meta.attributes);

    return headerMeta.map((a: any) => {
      let obj: any = {};
      let key = a.name?.nodeValue ||
                a.property?.nodeValue ||
                a['http-equiv']?.nodeValue ||
                undefined

      obj[key] = a.content?.nodeValue
      return obj;
    }).filter((obj: any) =>
      Object.keys(obj)[0] !== 'undefined'
    )
  });

  return metaData
}

async function extractSocialLinks(page: any): Promise<any> {
  let links: string[] = [];
  await asyncForEach(SOCIAL_LINKS, async (prefix: string) => {
    let linksForPrefix = await page.evaluate((prefix: string) => {
      //returns array of all hrefs that fit social links
      return Array.from(
        document.querySelectorAll("a[href^='" + prefix + "']")
      ).map((a: any) => a.getAttribute('href'));
    }, prefix);

    links.push(linksForPrefix);
  });

  return Array.from(new Set(links.flat())).filter((link) => {
    let matched = false;

    SOCIAL_LINKS_TO_EXCLUDE.forEach((regexp: any) => { if (link.match(regexp)) matched = true });
    return !matched;
  });
}

// scrape page metadata and social links
async function scrapePublicPage(browser: any, queue: IQueueItem[]): Promise<void>{
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
          data['initial_url'] = url;
          console.log("// Visiting: " + url);

          await context.overridePermissions(url, ['geolocation', 'notifications']);
          response = await page.goto(url, { waitUntil: 'networkidle2' });

          console.log("// -> Loaded");
          success = true;
        } catch (err: any) {
          response = null;
          error = err;
          console.error("// -> Error: " + err.message);
        }
      }
    });

    if (success === false) {
      if (error !== null) data['error'] = error.message;

      console.log(JSON.stringify(data));
    } else {
      if (response !== null) data['response_code'] = response.status()

      data['final_url'] = await page.evaluate(() => document.location.href);
      data['title'] = await page.evaluate(() => document.title);
      data['metadata'] = await extractMetadata(page);
      data['social_links'] = await extractSocialLinks(page);
    }

    console.log(`// Data: ${JSON.stringify(data, null, 2)}`);

    await page.close();
  }

  await browser.close();
}

export { scrapePublicPage }