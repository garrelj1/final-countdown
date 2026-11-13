# Analytics and public counters

Date: 2026-11-13

## Goal

Know how people use the timer, especially sharing, and show a public visit
count and share count on the page.

## Decisions

- **Google Analytics 4 with region-based consent defaults.** `analytics_storage`
  is denied by default in the EEA, UK and Switzerland and granted elsewhere;
  Google resolves the visitor's region. No consent banner. Ad consent types are
  denied everywhere because the site runs no ads. Cost: EU/UK/CH visitors
  mostly do not appear in reports.
- **Public counter counts visits** (page loads). No cookies, device storage or
  IP processing, so it needs no consent anywhere. Reloads inflate it.
- **D1, not a Durable Object.** Pages Functions cannot host a Durable Object
  class without a second Worker; D1 binds to Pages directly and a single
  upsert with `RETURNING` is atomic.

## Analytics

The gtag bootstrap in `<head>` sets consent defaults, then config, then loads
the library. It runs only when `GA_MEASUREMENT_ID` is set, so local
development and an unconfigured deploy send nothing.

One `track(name, params)` function owns every event call and is a no-op when
gtag is absent.

| Event | When | Params |
| --- | --- | --- |
| `share` | Link handed off | `method`: `native`, `clipboard` or `prompt`; `content_type`: `timer`; `duration_seconds` |
| `share_dismissed` | Native share sheet closed without sharing | |
| `shared_link_open` | Page opened with a valid `?t=` | `duration_seconds` |
| `timer_start` | Start pressed with a valid duration | `duration_seconds`, `source` |
| `timer_pause` | Pause pressed | |
| `timer_finish` | Countdown reached zero | `duration_seconds` |
| `timer_reset` | Reset pressed | |
| `music_source` | Audio source changed | `source` |

The footer discloses Google Analytics use, as Google's terms require.

## Public counters

Two public totals: visits, shown under the subtitle, and shares, shown as a
caption under the Share button. A share is counted at the same moments as
the GA `share` event. The caption counts shares, not people, so it reads
"Shared 1,204 times" ("Shared once", "Shared twice"), and "Be the first" at
zero.

| Role | Home |
| --- | --- |
| Fact | D1 table `site_counters`, one row per counter name |
| Mechanism | Atomic upsert in `lib/counters/d1-counter-store.js` |
| Core entity | `CounterTotal` in `lib/counters/counter-total.js` (non-negative integer) |
| Inbound adapters | `POST /api/visits` returns `{ "rank": n, "shares": n }` (see the daily dedupe in the single-screen design doc); `POST /api/shares` returns `{ "shares": n }` |
| Presentation | Page formats the numbers and words the share caption |
| View state | Each line reserves its height and stays blank until a valid total arrives |

The page posts to `/api/visits` once per load and to `/api/shares` after
each share. Any failure leaves the line blank rather than showing a wrong
number. The reserved height means totals arriving after first paint never
shift the layout.

Known limit: anyone can call the endpoints to inflate the counts. Not
addressed until it happens.

## Setup outside the repo

1. Done: `final-countdown` D1 database created and its id is in
   `wrangler.toml`.
2. Done: migration applied with `npx wrangler d1 migrations apply final-countdown --remote`.
3. Done: GA4 web stream `G-XDC8NYV5WF`, set as `GA_MEASUREMENT_ID` in
   `public/index.html`.

## Verification

- `wrangler pages dev` with a local D1: `curl -X POST /api/visits` increments.
- Browser: counter renders; GA requests to `/g/collect` carry the events when
  an ID is set.
