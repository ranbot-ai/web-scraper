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
env TEST_IDS=lvmh.com node build/index.js
```

## Response

```json
{
  "initialUrl": "https://lvmh.com",
  "responseCode": 200,
  "finalUrl": "https://www.lvmh.com/",
  "title": "LVMH, world leader in high-quality products",
  "contactEmail": [],
  "metadata": [
    {
      "viewport": "width=device-width, initial-scale=1"
    },
    {
      "robots": "index,follow"
    },
    {
      "google-site-verification": "wnwFO2IRyFWWLgIicMipiBijTDunagD3x8wc-CWUGko"
    },
    {
      "description": "As the world leader in luxury, LVMH has been setting an example through its dynamic growth since its creation in 1987. Learn more about our prestigious Houses."
    },
    {
      "twitter:card": "summary"
    },
    {
      "twitter:description": "As the world leader in luxury, LVMH has been setting an example through its dynamic growth since its creation in 1987. Learn more about our prestigious Houses."
    },
    {
      "twitter:title": "LVMH, world leader in high-quality products"
    },
    {
      "msapplication-TileColor": "#121426"
    },
    {
      "msapplication-TileImage": "https://r.lvmh-static.com/themes/lvmh/icons/mstile-144x144.png"
    },
    {
      "msapplication-config": "https://r.lvmh-static.com/themes/lvmh/icons/browserconfig.xml"
    },
    {
      "theme-color": "#ffffff"
    }
  ],
  "socialLinks": [
    "https://www.instagram.com/lvmh/",
    "https://www.linkedin.com/company/lvmh",
    "https://www.facebook.com/lvmh",
    "https://twitter.com/LVMH/",
    "https://www.tiktok.com/@lvmh",
    "https://www.pinterest.com/lvmhofficial/"
  ]
}
```

## Contributors

- Encore
