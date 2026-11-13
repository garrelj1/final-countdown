# Final Countdown Timer

## Site structure

- `public/index.html` is the timer. It must fit one screen (clock, controls,
  YouTube player, Share) at 1280×720 and up and on a 390×664 phone viewport;
  only the footer sits below the fold. The YouTube player must stay visible
  and at least 200×200 px (YouTube's embed rules).
- `how-it-works.html`, `faq.html` and `privacy.html` hold the reference
  content, served at `/how-it-works`, `/faq` and `/privacy`. Every page shares
  `/site.css` and `/analytics.js` and repeats the same footer nav.
- The FAQ's `FAQPage` structured data must say exactly what the visible
  answers say; edit both together.
- `/privacy` describes what the site collects. Change it in the same commit as
  any change to analytics events, the counters, or third-party requests.
- New pages go in `sitemap.xml` and `llms.txt`.
- `public/scene.svg` is the timer's background art. On wide screens its sun,
  road and car must stay visible in the gap between the clock and the music
  card; check that whenever the column widths or the scene change.

## Visitor counter

- `/api/visits` needs the `VISITOR_HASH_SECRET` secret: set in Cloudflare
  Pages for production and preview, and in a local `.dev.vars` (gitignored)
  for `wrangler pages dev`. Without it the visitor line stays blank.
- Tests: `node --test tests/*.test.mjs`.

## This repository is public

Everything here is world-readable at github.com/garrelj1/final-countdown:
files, commit messages, branch names, PR titles and descriptions, and review
comments. Treat anything that reaches GitHub as published.

Never put any of these in a commit, commit message, PR, or comment:

- Credentials of any kind: API keys, tokens, service account keys, passwords,
  `.dev.vars` contents. Secrets belong in the Cloudflare dashboard or a local
  `wrangler login`, never in the repo.
- Details of the owner's other projects or business infrastructure: private
  repository names, internal tool names, account or property IDs from other
  accounts, secret-store paths, machine names, local file paths.
- Personal details beyond the commit author identity already in the history.

Public by design and fine to commit: the GA4 measurement ID (`G-...`, shipped
in the page source) and the D1 `database_id` in `wrangler.toml` (useless
without the owner's Cloudflare login).

Removing something after it is pushed does not unpublish it. GitHub keeps a
PR description's edit history visible, and a force-pushed commit stays
reachable by its SHA. Check the diff and the commit messages before every
push:

```
git log -p origin/trunk..HEAD
```
