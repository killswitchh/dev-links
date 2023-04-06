import { error, fail } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { superValidate } from 'sveltekit-superforms/server';
import type { LinkGroup } from '../../../core/models/link-group.dto';
import {
  CreateLinkRequestSchema,
  Provider,
  type CreateLinkRequest,
} from '../../../core/models/link.dto';
import LinkGroupService from '../../../service/api/link-group.service';
import LinkService from '../../../service/api/link.service';
import MetadataService from '../../../service/api/metadata.service';
import { linkGroupStore } from '../../../stores';
import type { PageServerLoad } from './$types';
import type { CodeName } from './../../../core/models/link.dto';

export const load = (async (event) => {
  console.log('Im Running');
  const session = await event.locals.getSession();
  if (!session) {
    throw error(401, { message: 'Unauthorized' });
  }
  const search = event.url.searchParams;
  const linkGroupName = search.get('name');
  const linkGroup: LinkGroup = await LinkGroupService.getPageByName(linkGroupName as string);
  const providers: CodeName<Provider>[] = await MetadataService.getAllProviders();
  const form = await superValidate(event, CreateLinkRequestSchema);
  return {
    form: form,
    linkGroup: linkGroup,
    providers: providers,
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
    const name = event.url.searchParams.get('name');
    const linkGroup = get(linkGroupStore);
    const linkGroupName = name ? name : linkGroup.name;
    const linkGroupObj: LinkGroup = await LinkGroupService.getPageByName(linkGroupName);
    const createlinkRequest: CreateLinkRequest = form.data;
    createlinkRequest.linkGroupId = linkGroupObj.id;
    try {
      const res = await LinkService.createLink(form.data, linkGroupObj);
      console.log('link created', res);
      return { form };
    } catch (e) {
      console.error('ERROR', e);
      return fail(400, {
        form,
      });
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
