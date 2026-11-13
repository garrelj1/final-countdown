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
