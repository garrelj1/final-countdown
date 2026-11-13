import { recordVisit } from '../../lib/counters/d1-counter-store.js';

export async function onRequestPost({ env }) {
  const { visits, shares } = await recordVisit(env.DB);
  return Response.json(
    { visits: visits.value, shares: shares.value },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}
