import { error, fail } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { superValidate } from 'sveltekit-superforms/server';
import type { LinkGroup } from '../../../core/models/link-group.dto';
import { CreateLinkRequestSchema, type CreateLinkRequest } from '../../../core/models/link.dto';
import LinkGroupService from '../../../service/api/link-group.service';
import LinkService from '../../../service/api/link.service';
import { linkGroupStore } from '../../../stores';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
  console.log('Im Running');
  const session = await event.locals.getSession();
  if (!session) {
    throw error(401, { message: 'Unauthorized' });
  }
  const storePage = get(linkGroupStore);
  const linkGroup: LinkGroup = await LinkGroupService.getPageByName(storePage.name);
  const form = await superValidate(event, CreateLinkRequestSchema);
  return {
    form: form,
    linkGroup: linkGroup,
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
    const linkGroup = get(linkGroupStore);
    const createlinkRequest: CreateLinkRequest = form.data;
    createlinkRequest.linkGroupId = linkGroup.id;

    try {
      const res = await LinkService.createLink(form.data);
      console.log('link created', res);
      return { form };
    } catch (e) {
      console.error('ERROR', e);
      return fail(400, { createlinkRequest, error: e });
    }
  },

  updateDescription: async ({ request }) => {
    const body = await request.formData();
    const description = body.get('description') as string;
    const linkGroup = get(linkGroupStore);
    try {
      return await LinkGroupService.updatePageDescription(linkGroup.id, description);
    } catch (e) {
      console.error('ERROR', e);
      return fail(400, { linkGroup, error: e });
    }
  },

  uploadImage: async ({ request }) => {
    const body = await request.formData();
    const image = body.get('image') as string;
    console.log(image);
  },
};
