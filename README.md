# Karthikesan Agencies

Responsive FMCG distribution website for Karaikal and TR Pattinam, built with React, TypeScript and Vite.

## Local development

Use Node.js 20 or newer and npm. `package-lock.json` is the project's single lockfile.

```sh
npm ci
npm run dev
```

Open http://localhost:8080. Changes are local until a deployment command is explicitly run.

## Checks and production build

```sh
npm run check
npm run format:check
npm run preview
```

`check` runs TypeScript, ESLint and the production build. `preview` serves the resulting `dist` directory. The build generates `404.html` for static-host routing.

## Deployment

Push changes to `main` to deploy automatically through `.github/workflows/deploy.yml`. The workflow installs locked dependencies, checks formatting and code, builds the site, and publishes the `dist` artifact with GitHub Pages. It can also be started manually from the repository's Actions tab.

GitHub Pages must use **GitHub Actions** as its publishing source. The existing custom domain is `karthikesanagency.in`; keep its DNS and Pages domain settings. No separate build push to `gh-pages` is needed.

## Project layout

- `src/components`: the active website, brand slider and product sections.
- `src/components/ui`: the reusable slider and geographic map.
- `src/assets`: images used by the site, including the Nabati collection.
- `src/data`: Nabati product data.
- `src/lib/translations.ts`: English and Tamil content.
- `src/index.css`: shared responsive styles.
- `public`: favicon, crawler rules and the existing custom-domain configuration.

The geographic map uses OpenStreetMap tiles and needs internet access. Keep its visible attribution. Location markers represent localities; animated arcs illustrate distribution coverage, not driving directions.

Run `npm run format` to format source files. Generated output and dependencies are ignored by Git.

## Responsive browser audit

With the local server running, use `npm run check:layout` with Node.js 22 or newer and an installed Chrome or Edge browser. The audit checks nine viewport widths from 320px to 1440px, image loading, the mobile menu and product previews. Screenshots are saved to the operating system's temporary directory.

Set `CHROME_PATH` if the browser is installed outside the standard locations, or `PREVIEW_URL` to check a production preview server instead of localhost:8080.
