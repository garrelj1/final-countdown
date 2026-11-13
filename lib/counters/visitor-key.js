const encoder = new TextEncoder();

export function utcDay(date) {
  return date.toISOString().slice(0, 10);
}

async function hmac(keyBytes, message) {
  const key = await crypto.subtle.importKey('raw', keyBytes, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return crypto.subtle.sign('HMAC', key, encoder.encode(message));
}

function toHex(buffer) {
  return [...new Uint8Array(buffer)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Keys a visitor for one UTC day without keeping their IP address. The HMAC
 * key is itself derived from the secret and the day, so a key can't be
 * linked to the same visitor's key on another day or reversed to an IP.
 */
export async function visitorKey({ secret, day, ip, userAgent }) {
  if (!secret) throw new Error('VISITOR_HASH_SECRET is not set');
  const dayKey = await hmac(encoder.encode(secret), day);
  return toHex(await hmac(dayKey, `${ip}\n${userAgent}`));
}
