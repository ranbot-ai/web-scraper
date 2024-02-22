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

```json
(base) ➜  web-scraper git:(main) ✗ env DOMAINS=github.com node build/index.js
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
  "initialUrl": "https://github.com",
  "responseCode": 200,
  "finalUrl": "https://github.com/",
  "title": "GitHub: Let’s build from here · GitHub",
  "contactEmail": [],
  "metadata": [
    {
      "route-pattern": "/"
    },
    {
      "route-controller": "dashboard"
    },
    {
      "route-action": "index"
    },
    {
      "current-catalog-service-hash": "40dc28bd654b20f337468a532ff456ed5863889cfbb4e982b793597321d48d3f"
    },
    {
      "request-id": "F6FF:F9E9C:CF823E:DBF5D8:65D748E8"
    },
    {
      "html-safe-nonce": "7d3cfe5667cc74d8bdaf57b9c395a7192a3497b853e6881af24070609ab6e35c"
    },
    {
      "visitor-payload": "eyJyZWZlcnJlciI6IiIsInJlcXVlc3RfaWQiOiJGNkZGOkY5RTlDOkNGODIzRTpEQkY1RDg6NjVENzQ4RTgiLCJ2aXNpdG9yX2lkIjoiMTc2ODcyODY0NzI5MTA2MjUwNCIsInJlZ2lvbl9lZGdlIjoiamFwYW5lYXN0IiwicmVnaW9uX3JlbmRlciI6ImphcGFuZWFzdCJ9"
    },
    {
      "visitor-hmac": "ff2934f005de93982002e1f3cbaf7577095d388191095165c5d69c0cbc725575"
    },
    {
      "page-subject": "GitHub"
    },
    {
      "github-keyboard-shortcuts": "dashboards,copilot"
    },
    {
      "selected-link": ""
    },
    {
      "google-site-verification": "c1kuD-K2HIVF635lypcsWPoD4kilo5-jA_wBFyT4uMY"
    },
    {
      "google-site-verification": "KT5gs8h0wvaagLKAVWq8bbeNwnZZK1r1XQysX3xurLU"
    },
    {
      "google-site-verification": "ZzhVyEFwb7w3e0-uOTltm8Jsck2F5StVihD0exw2fsA"
    },
    {
      "google-site-verification": "GXs5KoUUkNCoaAZn7wPN-t01Pywp9M3sEjnt_3_ZWPc"
    },
    {
      "google-site-verification": "Apib7-x98H0j5cPqHWwSMm6dNU4GmODRoqxLiDzdx9I"
    },
    {
      "octolytics-url": "https://collector.github.com/github/collect"
    },
    {
      "user-login": ""
    },
    {
      "viewport": "width=device-width"
    },
    {
      "description": "GitHub is where over 100 million developers shape the future of software, together. Contribute to the open source community, manage your Git repositories, review code like a pro, track bugs and features, power your CI/CD and DevOps workflows, and secure code before you commit it."
    },
    {
      "apple-itunes-app": "app-id=1477376905, app-argument=https://github.com/"
    },
    {
      "twitter:image:src": "https://github.githubassets.com/assets/campaign-social-031d6161fa10.png"
    },
    {
      "twitter:site": "@github"
    },
    {
      "twitter:card": "summary_large_image"
    },
    {
      "twitter:title": "GitHub: Let’s build from here"
    },
    {
      "twitter:description": "GitHub is where over 100 million developers shape the future of software, together. Contribute to the open source community, manage your Git repositories, review code like a pro, track bugs and fea..."
    },
    {
      "hostname": "github.com"
    },
    {
      "expected-hostname": "github.com"
    },
    {
      "turbo-cache-control": "no-preview"
    },
    {
      "is_logged_out_page": "true"
    },
    {
      "turbo-body-classes": "logged-out env-production page-responsive header-overlay home-campaign"
    },
    {
      "browser-stats-url": "https://api.github.com/_private/browser/stats"
    },
    {
      "browser-errors-url": "https://api.github.com/_private/browser/errors"
    },
    {
      "theme-color": "#1e2327"
    }
  ],
  "socialLinks": [
    "https://www.linkedin.com/company/github",
    "https://www.facebook.com/GitHub",
    "https://www.tiktok.com/@github"
  ]
}
```

## Contributors

- Encore
