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
  "initialUrl": "https://github.com",
  "responseCode": 200,
  "finalUrl": "https://github.com/",
  "title": "GitHub: Let’s build from here · GitHub",
  "contactEmail": [],
  "contactPhone": [],
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
      "request-id": "B59E:172E16:AD767E:CBEE0C:6677EFC3"
    },
    {
      "html-safe-nonce": "2c8c558ed1f4c54fc1ce4db4782175ccf3f61387a7532b21621d61bb1ce58af3"
    },
    {
      "visitor-payload": "eyJyZWZlcnJlciI6IiIsInJlcXVlc3RfaWQiOiJCNTlFOjE3MkUxNjpBRDc2N0U6Q0JFRTBDOjY2NzdFRkMzIiwidmlzaXRvcl9pZCI6IjQwNDI2MjYwMjQ3NzUwODYwMTkiLCJyZWdpb25fZWRnZSI6ImphcGFuZWFzdCIsInJlZ2lvbl9yZW5kZXIiOiJqYXBhbmVhc3QifQ=="
    },
    {
      "visitor-hmac": "5aa2752edec8a09b2fcc3e5dd0051840d0a13530769b56253192bffd8fb762ea"
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
    },
    {
      "color-scheme": "light dark"
    }
  ],
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
