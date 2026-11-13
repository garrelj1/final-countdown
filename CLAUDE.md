# Final Countdown Timer

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
