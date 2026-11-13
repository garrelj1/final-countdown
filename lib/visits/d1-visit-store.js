import { VisitCount } from './visit-count.js';

const RECORD_VISIT = `
  INSERT INTO visit_counter (id, total) VALUES (1, 1)
  ON CONFLICT (id) DO UPDATE SET total = total + 1
  RETURNING total`;

export async function recordVisit(db) {
  const row = await db.prepare(RECORD_VISIT).first();
  return new VisitCount(row.total);
}
