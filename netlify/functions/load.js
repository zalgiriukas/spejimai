// netlify/functions/load.js
import { getStore } from '@netlify/blobs';

/**
 * GET /.netlify/functions/load    (arba /api/load, jei yra redirect'as)
 * Grąžina JSON:
 * { points: {...}, guesses: {...}, roundScored: boolean, history: [...] }
 */
export default async (request, context) => {
  try {
    // Blobs „store“ pavadinimas – laisvai parenkamas (naudoju 'zalgiris-store')
    // 'strong' – griežta nuoseklumo politika (saugiau konkurencijos atvejais)
    const store = getStore({ name: 'zalgiris-store', consistency: 'strong' });

    // Vienas „raktas“ (key) visai būsenai – paprasta ir pakanka
    const key = 'league-global-state';

    // type: 'json' – automatiškai parse’ina; jei nėra – grąžina null
    const blob = await store.get(key, { type: 'json' });

    // Pirmo karto atveju arba jei tuščia – grąžinam fallback
    const fallback = {
      points: {},
      guesses: {},
      roundScored: false,
      history: []
    };

    return new Response(JSON.stringify(blob ?? fallback), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'load_failed', detail: String(err) }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    );
  }
};