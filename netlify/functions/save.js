// netlify/functions/save.js
import { getStore } from '@netlify/blobs';

/**
 * Paprasta autorizacija per ADMIN_TOKEN env (nebūtina).
 * Jei Netlify'e NĖRA ADMIN_TOKEN – rašyti leidžiama visiems (grįžta true).
 */
function isAuthorized(request) {
  const token = process.env.ADMIN_TOKEN;
  if (!token) return true; // be tokeno – nenaudojame auth
  const hdr = request.headers.get('authorization') || '';
  const m = hdr.match(/^Bearer\s+(.+)$/i);
  return !!(m && m[1] === token);
}

/**
 * POST /.netlify/functions/save   (arba /api/save, jei yra redirect'as)
 * Priima JSON: { points, guesses, roundScored, history }
 * Įrašo į Blobs ir grąžina { ok: true }.
 */
export default async (request, context) => {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'method_not_allowed' }), { status: 405 });
  }

  if (!isAuthorized(request)) {
    return new Response(JSON.stringify({ error: 'unauthorized' }), { status: 401 });
  }

  try {
    const data = await request.json(); // tikimės visos būsenos objektą

    // Minimalus patikrinimas – gal norėsi griežtesnio (pvz., ar visur yra objektai/masyvai)
    if (!data || typeof data !== 'object') {
      return new Response(JSON.stringify({ error: 'invalid_payload' }), { status: 400 });
    }

    const store = getStore({ name: 'zalgiris-store', consistency: 'strong' });
    const key = 'league-global-state';

    // Išsaugom kaip JSON; contentType – kad būtų tvarkingai
    await store.set(key, JSON.stringify(data), { contentType: 'application/json' });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'save_failed', detail: String(err) }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    );
  }
};