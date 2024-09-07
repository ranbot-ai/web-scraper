# Web Scraper | 2024

- A Nodejs script that scrapes metadata & social links from public webpages.

## Technology

- Node
  - Scraper running node version: (v14, v18, v20)
  - Node Version Manager [nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- [Puppeteer](https://pptr.dev/)
  - Node library which provides a high-level API to control Chrome
- Typescript
  - TypeScript is JavaScript with syntax for types. [Doc](https://www.typescriptlang.org/)
  - [Node.Js With TypeScript](https://nodejs.dev/en/learn/nodejs-with-typescript/)

## Structure

```
  build
    └── index.js
    └── ...
  config
    └── config.json
  src
    └── pages
        ├── index.ts
        ├── identifiers.ts
    └── environment
        ├── config.ts
    └── utils
        ├── index.ts
    └── index.ts
  types
    └── index.d.ts
```

- `build`: The latest generated javascript code.
- `config`: Deployment and proxy configuration.
- `src`: The main coding part of the scraper, written by typescript.
- `types`: Type or Interface definition.

## Scripts Overview

```NodeJS
npm run start:dev
```

Starts the application in development using nodemon and ts-node to do cold reloading.

```NodeJS
npm run build
```

Builds the app at build, cleaning the folder first.

```NodeJS
npm run start
```

Starts the app in production by first building the project with `npm run build`, and then executing the compiled JavaScript at `build/index.js`.

## Usage Examples

```NodeJS
env DOMAINS=github.com node build/index.js
```

## Response

```
>> Starting Web Scraper ......
┌─────────┬───────┬─────────────────────────────────────┐
│ (index) │ tries │             identifier              │
├─────────┼───────┼─────────────────────────────────────┤
│    0    │   0   │ { id: 0, identifier: 'github.com' } │
└─────────┴───────┴─────────────────────────────────────┘
>> Queue Size: 1
{ tries: 0, identifier: { id: 0, identifier: 'github.com' } }
// Visiting: https://github.com
// -> Page Loaded
// Data: {
{
  "sourceUrl": "https://github.com",
  "responseCode": 200,
  "finalUrl": "https://github.com/",
  "title": "GitHub: Let’s build from here · GitHub",
  "contactEmail": [],
  "contactPhone": [],
  "metadata": {
    "routePattern": "/",
    "routeController": "dashboard",
    "routeAction": "index",
    "currentCatalogServiceHash": "40dc28bd654b20f337468a532ff456ed5863889cfbb4e982b793597321d48d3f",
    "requestId": "82A0:389E53:37BF987:3EC2874:66DC3F38",
    "htmlSafeNonce": "cf51c823dd62a6e74d014fa70066a0f9b962ee46d1eea99c74f0f7b41e21d532",
    "visitorPayload": "eyJyZWZlcnJlciI6IiIsInJlcXVlc3RfaWQiOiI4MkEwOjM4OUU1MzozN0JGOTg3OjNFQzI4NzQ6NjZEQzNGMzgiLCJ2aXNpdG9yX2lkIjoiMjU5MDk0OTc2NDc1MDkxNzQzMiIsInJlZ2lvbl9lZGdlIjoiamFwYW5lYXN0IiwicmVnaW9uX3JlbmRlciI6ImphcGFuZWFzdCJ9",
    "visitorHmac": "b06089a4d6e23b2dfa0fba9c651e7eb6f9a468dc000033244ec33dd7f12ddc34",
    "pageSubject": "GitHub",
    "githubKeyboardShortcuts": "dashboards,copilot",
    "googleSiteVerification": "Apib7-x98H0j5cPqHWwSMm6dNU4GmODRoqxLiDzdx9I",
    "octolyticsUrl": "https://collector.github.com/github/collect",
    "viewport": "width=device-width",
    "description": "GitHub is where over 100 million developers shape the future of software, together. Contribute to the open source community, manage your Git repositories, review code like a pro, track bugs and features, power your CI/CD and DevOps workflows, and secure code before you commit it.",
    "appleItunesApp": "app-id=1477376905, app-argument=https://github.com/",
    "twitterImageSrc": "https://github.githubassets.com/assets/campaign-social-031d6161fa10.png",
    "twitterSite": "@github",
    "twitterCard": "summary_large_image",
    "twitterTitle": "GitHub: Let’s build from here",
    "twitterDescription": "GitHub is where over 100 million developers shape the future of software, together. Contribute to the open source community, manage your Git repositories, review code like a pro, track bugs and fea...",
    "hostname": "github.com",
    "expectedHostname": "github.com",
    "turboCacheControl": "no-preview",
    "isLoggedOutPage": "true",
    "turboBodyClasses": "logged-out env-production page-responsive header-overlay home-campaign",
    "browserStatsUrl": "https://api.github.com/_private/browser/stats",
    "browserErrorsUrl": "https://api.github.com/_private/browser/errors",
    "themeColor": "#1e2327",
    "colorScheme": "light dark"
  },
  "youtubeLinks": [],
  "socialLinks": [
    "https://www.linkedin.com/company/github",
    "https://www.facebook.com/GitHub",
    "https://x.com/github",
    "https://www.tiktok.com/@github",
    "https://github.com/github"
  ]
}
```

## Contributors

- Encore
