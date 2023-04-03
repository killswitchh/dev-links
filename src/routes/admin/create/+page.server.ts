import { error, fail } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { superValidate } from 'sveltekit-superforms/server';
import {
  CreateLinkRequestSchema,
  type CreateLinkRequest,
  type Link,
} from '../../../core/models/link.dto';
import type { Page } from '../../../core/models/page.dto';
import LinkService from '../../../service/api/link.service';
import PageService from '../../../service/api/page.service';
import { pageStore } from '../../../stores';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
  console.log('Im Running');
  const session = await event.locals.getSession();
  if (!session) {
    throw error(401, { message: 'Unauthorized' });
  }
  const storePage = get(pageStore);
  const page: Page = await PageService.getPageById(storePage.id);
  const links: Link[] = await LinkService.getLinks(page.id);
  page.links = links;
  pageStore.set(page);
  const form = await superValidate(event, CreateLinkRequestSchema);
  console.log(form);
  return {
    form: form,
    page: page,
    session: event.locals.getSession(),
  };
}) satisfies PageServerLoad;

export const actions = {
  link: async (event) => {
    const form = await superValidate(event, CreateLinkRequestSchema);
    if (!form.valid) {
      return fail(400, {
        form,
      });
    }
    const page = get(pageStore);
    const createlinkRequest: CreateLinkRequest = form.data;
    createlinkRequest.pageId = page.id;

    try {
      await LinkService.createLink(form.data);
      return { form };
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
