import { CounterTotal } from './counter-total.js';

const INCREMENT = `
  INSERT INTO site_counters (name, total) VALUES (?1, 1)
  ON CONFLICT (name) DO UPDATE SET total = total + 1
  RETURNING total`;

const READ = 'SELECT total FROM site_counters WHERE name = ?1';

function toTotal(row) {
  return new CounterTotal(row?.total ?? 0);
}

export async function recordVisit(db) {
  const [visited, shared] = await db.batch([
    db.prepare(INCREMENT).bind('visits'),
    db.prepare(READ).bind('shares'),
  ]);
  return { visits: toTotal(visited.results[0]), shares: toTotal(shared.results[0]) };
}

export async function recordShare(db) {
  return toTotal(await db.prepare(INCREMENT).bind('shares').first());
}
