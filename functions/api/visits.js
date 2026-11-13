import { recordVisit } from '../../lib/visits/d1-visit-store.js';

export async function onRequestPost({ env }) {
  const count = await recordVisit(env.DB);
  return Response.json(
    { visits: count.total },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}
