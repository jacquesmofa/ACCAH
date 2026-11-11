# CLAUDE.md: African and Canadian Community Ark of Hope (ACCAH)

Bilingual non-profit advancing equity, opportunity and belonging for women, newcomers, families, persons with disabilities and underserved communities.

- Live domain: https://accah.org (the old code said arkofhope.ca; changed 11 Nov because accah.org is the domain on HostGator).
- Host: HostGator (server `gator3095.hostgator.com`, cPanel user `irineashu`, site folder `/accah.org`).
- Design and audience: see `brand-dna.md`. Placeholders: `PLACEHOLDERS.md` (create it when you find one).

## Studio rules (Jacques' web studio: apply to every task)
- This site must look custom-made for this client, never like a template. Never reuse another client's palette, font pairing, layout rhythm or signature element. No generic AI layout (centered hero + 3 icon cards + testimonial slider + CTA band) unless Jacques asks for it.
- Read `brand-dna.md` in this repo before any design or content change. Items marked ❓ are not confirmed: ask, don't invent.
- Real copy and real photos only. Never invent reviews, testimonials, statistics, people or partner logos. Every placeholder goes in `PLACEHOLDERS.md`.
- Done means: `npm ci && npm run build` passes, you checked desktop and mobile yourself, alt text, AA contrast, page titles/descriptions, compressed images.
- Push to the deploy branch only after the build passes and the change is verified (pushing deploys the live site). Never commit secrets.
- Report to Jacques in plain language, no jargon, with the live link. Anything he must do himself (secrets, DNS, accounts): click-by-click steps.
- Studio stack (zero recurring cost): client's own host via GitHub Actions FTP deploy; Cloudflare free in front; images in Cloudinary or the repo; video on YouTube or Mux (store the public Playback ID, never the Asset ID); forms via Web3Forms; editing via Pages CMS + Sveltia at `/admin`. No Vercel Hobby or Netlify for client sites.

## Stack and build
- Originally a Readdy export: Vite + React + TypeScript + Tailwind + React Router, i18next installed.
- Install and build: `npm ci && npm run build` → output in `out/`.
- Dev preview: `npm run dev`.
- Routes: `/`, `/about`, `/accessibility`, `/contact`, `/credentials-ark`, `/donate`, `/get-involved`, `/impact`, `/news`, `/partners`, `/privacy`, `/work`.

## Deploy
- `.github/workflows/deploy.yml` (studio standard): push to `main` → `npm ci && npm run build` → FTPS upload of `out/` → live check of https://accah.org and every sitemap address.
- Secrets `FTP_SERVER` (= gator3095.hostgator.com), `FTP_USERNAME`, `FTP_PASSWORD`. The workflow finds the site folder itself (FTP account rooted at the site folder → `./`; at the top of the hosting account → `/accah.org/`). Optional variables: `SITE_URL`, `FTP_SERVER_DIR`, `FTP_PROTOCOL`.
- `public/.htaccess`: https, clean addresses (/about.html and /about/ → /about), one share-preview page per address, SPA fallback, caching.

## Share previews and SEO
- `src/content/seo.json` → `scripts/social-pages.mjs` (runs inside `npm run build`): writes one HTML file per page (e.g. `out/about.html`) with that page's title, description, canonical link and 1200×630 picture, plus `sitemap.xml` and the robots.txt sitemap line. Social apps never run JavaScript, so this is what Facebook, WhatsApp, LinkedIn and X show.
- In the browser, `src/lib/seo.ts` (EN + FR) sets the same tags per page and language. Keep the English text in both files the same.
- Share cards: `public/social/<page>.jpg`, made from the site's colours and type (no real photos exist yet; replace with real photos when the client sends them). App icons: `public/icon-*.png`, `apple-touch-icon.png`.

## Where things live
- Pages: `src/pages/<page>/` (one folder per page, sections in `components/`). Routes: `src/router/`.
- Text, images and links are mostly hard-coded inside the page components (`src/pages/<page>/components/*.tsx`) and in `src/mocks/`.
- Next studio step for this site: move client-facing content into `src/content/*.json` and wire up both editors (Pages CMS + Sveltia at `/admin`), exactly like `jacquesmofa/CAWAP` (see its CLAUDE.md and `scripts/studio-tools/` for `extract.mjs`, `snapshot.mjs`, `compare.mjs`). Verify with before/after snapshots that visitors see no change.

## Known issues (found 10 Nov 2026)
- 59 Readdy AI placeholder image URLs (`readdy.ai/api/search-image`) are still in the code. Replace them with real photos and track the rest in `PLACEHOLDERS.md`.
- Some forms post to Readdy's form service (`readdy.ai/api/form`). Move them to Web3Forms with the client's email (studio standard) and test that a message actually arrives.
- Design overlap with other clients: Same font stack as Crowned and NNAYA (same Readdy template). Must diverge.
