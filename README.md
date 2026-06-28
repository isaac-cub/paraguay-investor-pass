# Paraguay Investor Pass

SEO microsite for the **Paraguay Investor Pass** (residency by investment), built for Lincoln Global Partners.

- **Astro 6** static multi-page site (one indexable URL per page) → deploys to **Vercel**
- **Keystatic** (open-source, Git-based CMS) for editing text/images — local now, GitHub browser mode after deploy
- Per-page SEO: title/description/canonical/OpenGraph + JSON-LD (`Organization`, `WebSite`, `BreadcrumbList`, `FAQPage`, `Service`/`Offer`, `AboutPage`, `ContactPage`), `sitemap-index.xml`, `robots.txt`, `llms.txt`

## Pages
`/` · `/real-estate/` · `/financial-instruments/` · `/tourism/` · `/suace/` · `/film/` · `/about/` · `/contact/`

## Commands
| Command | Action |
| :-- | :-- |
| `npm install` | Install dependencies |
| `npm run dev` | Dev server at `localhost:4321` (CMS at `/keystatic`) |
| `npm run build` | Production build to `./dist/` (+ `.vercel/output`) |
| `npm run preview` | Preview the build locally |

## Editing content (CMS)
Run `npm run dev` and open **http://localhost:4321/keystatic**. Edits write to `src/content/` and are committed to Git.
To enable browser editing on the live site, switch `storage` in `keystatic.config.ts` to GitHub mode and set the OAuth env vars (see plan).

## Content accuracy
This is YMYL (financial/legal) content. Claims were fact-checked against primary sources (MIC Resolution N° 0283/2026, S&P/Moody's, INE, PwC). Route minimums, timelines, and the INAP film-pathway regulation should be verified with qualified Paraguayan counsel before any change to the figures.

## Clone a new microsite (e.g. Panama)
1. Copy this repo to `~/repos/<new-site>` and re-init git; create a new GitHub repo.
2. Swap content: edit the page files in `src/pages/` (or, once bound, the entries in `src/content/`).
3. Re-theme: change the palette tokens at the top of `src/styles/site.css` (`--navy`, `--gold`, etc.) and the fonts in `src/layouts/Base.astro`.
4. Update `site` in `astro.config.mjs`, the nav in `src/components/Header.astro`, and `public/robots.txt` / `public/llms.txt`.
5. New Vercel project → point it at the new repo.
