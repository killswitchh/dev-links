import type { Session } from '@supabase/supabase-js'
import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import type { Page } from './../../core/models/page.dto'
import { PageService } from './../../service/api/page.service'

export const load = (async ({ locals: { getSession } }) => {
  const session: Session = await getSession()
  console.log('running')
  if (!session) {
    throw error(401, { message: 'Unauthorized' })
  }

  const pages: Page[] = await PageService.getUserPages(session.user.id)
  const pageLimit: number = await PageService.getAvailablePages(session.user.id)

  return {
    session: getSession(),
    pages: pages,
    pageLimit: pageLimit,
  }
}) satisfies PageServerLoad
