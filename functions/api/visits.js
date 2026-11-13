import { recordVisitor } from '../../lib/counters/d1-counter-store.js';
import { utcDay, visitorKey } from '../../lib/counters/visitor-key.js';

export async function onRequestPost({ request, env }) {
  const day = utcDay(new Date());
  const key = await visitorKey({
    secret: env.VISITOR_HASH_SECRET,
    day,
    ip: request.headers.get('CF-Connecting-IP') ?? '',
    userAgent: request.headers.get('User-Agent') ?? '',
  });
  const { rank, shares } = await recordVisitor(env.DB, { visitorKey: key, day });
  return Response.json(
    { rank: rank.value, shares: shares.value },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}
