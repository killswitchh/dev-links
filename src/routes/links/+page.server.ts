import type { Session } from '@supabase/supabase-js';
import { error, fail, redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';
import type { PageServerLoad } from './$types';
import { ERROR_MESSAGES } from './../../constants';
import type { CreatePageRequest, Page } from './../../core/models/page.dto';
import { PageService } from './../../service/api/page.service';
import { appStore, pageStore } from './../../stores';

export const load = (async ({ locals: { getSession } }) => {
  const session: Session = await getSession();
  console.log('running');
  if (!session) {
    throw error(401, { message: 'Unauthorized' });
  }

  const pages: Page[] = await PageService.getUserPages(session.user.id);
  const pageLimit: number = await PageService.getAvailablePages(session.user.id);

  return {
    session: getSession(),
    pages: pages,
    pageLimit: pageLimit,
  };
}) satisfies PageServerLoad;

export const actions = {
  createPage: async ({ request }) => {
    const body = await request.formData();
    const store = get(appStore);

    const createPageRequest: CreatePageRequest = {
      name: body.get('name') as string,
      ownerId: store.user?.user.id as string,
      underCreation: true,
      active: true,
    };
    if (createPageRequest.ownerId === null) {
      return fail(400, { createPageRequest, error: ERROR_MESSAGES.DEFAULT });
    }
    try {
      const page = await PageService.createPage(createPageRequest);
      if (page) {
        pageStore.set(page);
      }
    } catch (e) {
      console.error('ERROR', e);
      return fail(400, { createPageRequest, error: e });
    }
    throw redirect(301, '/create');
  },
};
