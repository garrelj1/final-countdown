import { recordShare } from '../../lib/counters/d1-counter-store.js';

export async function onRequestPost({ env }) {
  const shares = await recordShare(env.DB);
  return Response.json(
    { shares: shares.value },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}
