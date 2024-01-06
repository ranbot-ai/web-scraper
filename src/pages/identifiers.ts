import { IIdentifier, IQueueItem } from "../../types";
const TEST_IDS =
  process.env.TEST_IDS != null ? process.env.TEST_IDS.split(",") : false;

const SOCIAL_LINKS = [
  "https://instagram.com/",
  "https://www.instagram.com/",
  "http://instagram.com/",
  "http://www.instagram.com/",
  "https://linkedin.com/",
  "https://www.linkedin.com/",
  "http://linkedin.com/",
  "http://www.linkedin.com/",
  "https://facebook.com",
  "https://www.facebook.com",
  "http://facebook.com",
  "http://www.facebook.com",
  "https://twitter.com",
  "https://www.twitter.com",
  "http://twitter.com",
  "http://www.twitter.com",
  "https://g2.com",
  "https://trustpilot.com",
  "https://www.trustpilot.com/",
  "https://discord.com/",
  "https://discord.gg/",
  "https://www.tiktok.com/@",
  "https://www.pinterest.com/",
];

const SOCIAL_LINKS_TO_EXCLUDE = [
  /https\:\/\/(www\.)?instagram\.com\/p\//,
  /https\:\/\/(www\.)?instagram\.com\/explore\/tags/,
  /https\:\/\/twitter\.com\/share/,
  /https\:\/\/www\.facebook\.com\/sharer\/sharer\.php/,
  /https\:\/\/www\.linkedin\.com\/shareArticle/,
  /https\:\/\/twitter\.com\/intent\/tweet/,
  /https\:\/\/www\.pinterest\.com\/\_\/\_\//,
];

async function scrapeIdentifier(): Promise<IQueueItem[]> {
  // Fill up queue
  let queue: IQueueItem[] = [];

  // with test items...
  if (TEST_IDS) {
    for (let i = 0; i < TEST_IDS.length; i++) {
      let identifier: IIdentifier = { id: i, identifier: TEST_IDS[i] };

      queue.push({ tries: 0, identifier });
    }
  }

  console.table(queue);
  return queue;
}

export { scrapeIdentifier, SOCIAL_LINKS, SOCIAL_LINKS_TO_EXCLUDE };
