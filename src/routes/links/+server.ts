import { error, json, type RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async ({ locals: { supabase, getSession } }) => {
  const session = await getSession()

  if (!session) {
    throw error(401, { message: 'Unauthorized' })
  }

  const { data } = await supabase.from('test').select('*')

  return json({ data })
}

export const POST = (async ({ request }) => {
  const { a, b } = await request.json()
  return json(a + b)
}) satisfies RequestHandler
