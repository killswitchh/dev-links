import { error, json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals: { supabase, getSession } }) => {
  const session = await getSession();

  if (!session) {
    throw error(401, { message: 'Unauthorized' });
  }

  const { data } = await supabase.from('test').select('*');

  return json({ data });
};

export const PATCH = (async ({ locals: { getSession }, request }) => {
  const session = await getSession();

  if (!session) {
    throw error(401, { message: 'Unauthorized' });
  }

  const r = request.json();
  return json({ r });
}) satisfies RequestHandler;
