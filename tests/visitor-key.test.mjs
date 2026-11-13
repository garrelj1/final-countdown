import { test } from 'node:test';
import assert from 'node:assert/strict';
import { utcDay, visitorKey } from '../lib/counters/visitor-key.js';
import { VisitorRank } from '../lib/counters/visitor-rank.js';

const base = { secret: 'test-secret', day: '2026-11-13', ip: '203.0.113.7', userAgent: 'Mozilla/5.0 Test' };

test('the same visitor on the same day gets the same key', async () => {
  assert.equal(await visitorKey(base), await visitorKey({ ...base }));
});

test('a new day gives the same visitor an unlinkable new key', async () => {
  assert.notEqual(await visitorKey(base), await visitorKey({ ...base, day: '2026-11-14' }));
});

test('a different browser on the same network is a different visitor', async () => {
  assert.notEqual(await visitorKey(base), await visitorKey({ ...base, userAgent: 'Mozilla/5.0 Other' }));
});

test('the key is a SHA-256 hex digest that does not contain the IP', async () => {
  const key = await visitorKey(base);
  assert.match(key, /^[0-9a-f]{64}$/);
  assert.ok(!key.includes('203.0.113.7'));
});

test('a different secret gives a different key', async () => {
  assert.notEqual(await visitorKey(base), await visitorKey({ ...base, secret: 'other-secret' }));
});

test('a missing secret is refused rather than hashed without one', async () => {
  await assert.rejects(visitorKey({ ...base, secret: '' }), /VISITOR_HASH_SECRET/);
});

test('days are UTC calendar days', () => {
  assert.equal(utcDay(new Date('2026-11-13T23:59:59-05:00')), '2026-11-14');
  assert.equal(utcDay(new Date('2026-11-13T00:00:00Z')), '2026-11-13');
});

test('a visitor rank is a positive integer', () => {
  assert.equal(new VisitorRank(1).value, 1);
  assert.throws(() => new VisitorRank(0), RangeError);
  assert.throws(() => new VisitorRank(undefined), RangeError);
});
