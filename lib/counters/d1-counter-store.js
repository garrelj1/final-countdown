import { CounterTotal } from './counter-total.js';
import { VisitorRank } from './visitor-rank.js';

const INCREMENT = `
  INSERT INTO site_counters (name, total) VALUES (?1, 1)
  ON CONFLICT (name) DO UPDATE SET total = total + 1
  RETURNING total`;

const READ = 'SELECT total FROM site_counters WHERE name = ?1';

const FORGET_EARLIER_DAYS = 'DELETE FROM visitor_ranks WHERE day < ?1';

const COUNT_IF_NEW = `
  INSERT INTO site_counters (name, total)
  SELECT 'visits', 1 WHERE NOT EXISTS (SELECT 1 FROM visitor_ranks WHERE visitor_key = ?1)
  ON CONFLICT (name) DO UPDATE SET total = total + 1`;

const RANK_IF_NEW = `
  INSERT OR IGNORE INTO visitor_ranks (visitor_key, day, rank)
  SELECT ?1, ?2, total FROM site_counters WHERE name = 'visits'`;

const READ_RANK = 'SELECT rank FROM visitor_ranks WHERE visitor_key = ?1';

function toTotal(row) {
  return new CounterTotal(row?.total ?? 0);
}

export async function recordVisitor(db, { visitorKey, day }) {
  const results = await db.batch([
    db.prepare(FORGET_EARLIER_DAYS).bind(day),
    db.prepare(COUNT_IF_NEW).bind(visitorKey),
    db.prepare(RANK_IF_NEW).bind(visitorKey, day),
    db.prepare(READ_RANK).bind(visitorKey),
    db.prepare(READ).bind('shares'),
  ]);
  return {
    rank: new VisitorRank(results[3].results[0]?.rank),
    shares: toTotal(results[4].results[0]),
  };
}

export async function recordShare(db) {
  return toTotal(await db.prepare(INCREMENT).bind('shares').first());
}
