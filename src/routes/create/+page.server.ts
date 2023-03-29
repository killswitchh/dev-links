import { error, fail } from '@sveltejs/kit';
import { get } from 'svelte/store';
import PageService from '../../service/api/page.service';
import { pageStore } from '../../stores';
import type { PageServerLoad } from './$types';
import type { CreateLinkRequest, Link, Provider, SelectValue } from './../../core/models/link.dto';
import type { Page } from './../../core/models/page.dto';
import { LinkService } from './../../service/api/link.service';

export const load = (async ({ locals: { getSession } }) => {
  console.log('Im Running');
  const session = await getSession();
  if (!session) {
    throw error(401, { message: 'Unauthorized' });
  }

  const storePage = get(pageStore);
  const page: Page = await PageService.getPageById(storePage.id);
  const links: Link[] = await LinkService.getLinks(page.id);
  page.links = links;
  pageStore.set(page);

  return {
    page: page,
    session: getSession(),
  };
}) satisfies PageServerLoad;

export const actions = {
  link: async ({ request }) => {
    const body = await request.formData();
    const provider: SelectValue = JSON.parse(body.get('provider') as string) as SelectValue;
    const page = get(pageStore);
    const createlinkRequest: CreateLinkRequest = {
      url: body.get('url') as string,
      prioritize: body.get('prioritize') === 'on',
      enrich: body.get('enrich') === 'on',
      pageId: page.id,
      provider: provider.value as Provider,
      active: true,
    };
    try {
      return await LinkService.createLink(createlinkRequest);
    } catch (e) {
      console.error('ERROR', e);
      return fail(400, { createlinkRequest, error: e });
    }
  },

  updateDescription: async ({ request }) => {
    const body = await request.formData();
    const description = body.get('description') as string;
    const page = get(pageStore);
    try {
      return await PageService.updatePageDescription(page.id, description);
    } catch (e) {
      console.error('ERROR', e);
      return fail(400, { page, error: e });
    }
  },

  uploadImage: async ({ request }) => {
    const body = await request.formData();
    const image = body.get('image') as string;
    console.log(image);
  },
};
