# Single-screen timer and content pages

Date: 2026-11-13

## Goal

The homepage is the timer and nothing else: one screen, with the footer just
below the fold linking to new pages that hold the reference content. Then
tune SEO and GEO (citation by AI answer engines) for the new structure.

## Decisions

- **Pages:** `/how-it-works` (intro, usage, presets, music sources, sharing),
  `/faq` (nine questions with `FAQPage` data) and `/privacy` (what is
  collected). Each targets a distinct search intent.
- **Layout:** side by side on wide screens (clock left; music, player and
  Share right), one compact column on phones. Chosen from mockups on a
  Claude Design canvas over a roomy phone stack, one compact column
  everywhere, and Synth by default on phones.
- **Share** sits below the video, with the common three-node share icon next
  to its label. The subtitle is gone; the visit count sits under the title.
- **YouTube player** keeps at least 200 × 200 px everywhere, as YouTube's
  embed rules require.

## Fit, measured locally

| Viewport | Result |
| --- | --- |
| 1024×768, 1280×720, 1280×800, 1440×900 | Fits; footer below the fold |
| 390×664 (iPhone in Safari), 390×844, 414×715 | Fits; footer below the fold |
| 360×640 | Share runs 50 px past the fold |
| 375×548 (iPhone SE in Safari) | Share runs 142 px past; the 200 px player cannot fit with the clock |

## SEO and GEO

- Each page: its own title, description, canonical URL, Open Graph and
  Twitter tags.
- Structured data: `WebApplication` and `WebSite` on the homepage; `FAQPage`
  on `/faq`; `WebPage` with `BreadcrumbList` on the others, all linked by
  `@id`.
- Answer-first copy: each page opens with a plain statement of what the
  timer is, which answer engines can quote whole.
- `sitemap.xml` lists all four pages; `llms.txt` summarizes the site and its
  pages for language models.
- A real `404.html` (`noindex`), so unknown paths return 404 instead of a
  copy of the homepage.
- The homepage footer carries a one-sentence description for crawlers,
  below the fold.

## Revision: sunset scene and wide-screen scaling

Reviewed as row D on the Claude Design canvas before building.

- **Background:** `public/scene.svg`, original artwork in one 5 KB SVG: a
  striped sun on a neon horizon, mountains, a grid floor, a road into the
  sun, and a generic 80s wedge sports car from behind (no badges, not a real
  model). It replaces the CSS horizon grid. Stacked layouts show it at 45%.
- **Composition:** on wide screens the column gap grows to 260 px
  (`clamp(56px, 40vw - 252px, 260px)`) so the clock and the music card frame
  the sun, road and car instead of covering them.
- **Readability:** every button, chip and the source switch sits on a dark
  backing (`--backing`), and the music card is 78% opaque.
- **Title** sits 10% down the screen on wide layouts, not pinned to the top.
- **Visitor line:** "You're the 12,345th rocker", larger and brighter, with
  the rank in yellow. "Rocker" nods to the song's glam-rock roots.
- **Wide screens scale the app** with `zoom`, only where the scaled app
  still fits one screen: 1.15× from 1440 × 880, 1.3× from 1680 × 980, 1.45×
  from 1920 × 1050, 1.8× from 2400 × 1300. Measured fits: 1024×768 through
  2560×1440, footer below the fold at each.

## Revision: count each visitor once a day

The visitor line counted page loads, so a reload showed the next rank. It
now counts each visitor once per UTC day, without cookies or device storage.

- **Key:** `HMAC(HMAC(VISITOR_HASH_SECRET, day), ip + "\n" + userAgent)`
  (`lib/counters/visitor-key.js`). Deriving the key per day means a
  visitor's keys on different days can't be linked, and none can be
  reversed to an IP. The IP comes from `CF-Connecting-IP` and is never
  stored.
- **Store:** `visitor_ranks (visitor_key, day, rank)`. One atomic D1 batch
  deletes earlier days, counts the visit only if the key is new, records
  the rank, and reads it back, so a returning visitor sees the same rank.
- **API:** `POST /api/visits` returns `{ "rank": n, "shares": n }`.
- **Known cost:** a shared network with identical browsers, such as a
  classroom of school laptops, counts as one visitor.
- **Privacy:** `/privacy`, the FAQ answer and its structured data describe
  the hashing and the daily deletion.

Verified locally: repeat visits keep their rank without counting; a new
browser or IP gets the next rank; 40 concurrent new visitors got 40 unique,
consecutive ranks; rows from earlier days are deleted; a page reload keeps
the same rank.
