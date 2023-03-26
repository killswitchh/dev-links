import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import type { Page } from './../../core/models/page.dto'
import { PageService } from './../../service/api/page.service'

export const load = (async ({ locals: { getSession } }) => {
  const session = await getSession()
  console.log('running')
  if (!session) {
    throw error(401, { message: 'Unauthorized' })
  }

  const pages: Page[] = await PageService.getUserPages('test')
  return {
    session: getSession(),
    pages: pages,
  }
}) satisfies PageServerLoad
