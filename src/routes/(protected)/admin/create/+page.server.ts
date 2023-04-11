import { error, fail } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { superValidate } from 'sveltekit-superforms/server';

import AppError from '../../../../core/models/app-error.dto';
import {
  CreateLinkRequestSchema,
  type CodeName,
  type CreateLinkRequest,
} from '../../../../core/models/link.dto';
import LinkGroupService from '../../../../service/api/link-group.service';
import LinkService from '../../../../service/api/link.service';
import MetadataService from '../../../../service/api/metadata.service';
import UploadService from '../../../../service/api/upload.service';
import { linkGroupStore } from '../../../../stores';
import type { PageServerLoad } from './$types';
import type { Provider } from '@prisma/client';
import type { RLinkGroup } from '../../../../core/models/link-group.dto';

export const load = (async (event) => {
  console.log('Im Running');
  const session = await event.locals.getSession();
  if (!session) {
    throw error(401, { message: 'Unauthorized' });
  }
  const search = event.url.searchParams;
  const linkGroupName = search.get('name');
  const linkGroup = await LinkGroupService.getLinkGroupByName(linkGroupName as string);
  const providers: CodeName<Provider>[] = await MetadataService.getAllProviders();
  const form = await superValidate(event, CreateLinkRequestSchema);
  return {
    form: form,
    linkGroup: linkGroup as RLinkGroup,
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
    const id = event.url.searchParams.get('id');
    const linkGroup = get(linkGroupStore);
    const linkGroupName = name ? name : linkGroup.name;
    const linkGroupObj = await LinkGroupService.getLinkGroupByName(linkGroupName);
    if (!linkGroupObj) {
      return fail(400, {
        form,
      });
    }
    const createlinkRequest: CreateLinkRequest = form.data;
    createlinkRequest.linkGroupId = linkGroupObj.id;
    try {
      if (id && id != 'null') {
        const res = await LinkService.editLink(form.data, linkGroupObj, id);
        console.log('link edited', res);
      } else {
        const res = await LinkService.createLink(form.data, linkGroupObj);
        console.log('link created', res);
      }
      return { form, id };
    } catch (e) {
      console.error('ERROR', e);
      return fail(400, {
        form,
      });
    }
  },

  updateDescription: async ({ request, url }) => {
    const body = await request.formData();
    const description = body.get('description') as string;
    try {
      const id = url.searchParams.get('id');
      if (!id) {
        throw new AppError('ID not found', 400);
      }
      return await LinkGroupService.updateLinkGroupDescription(id as string, description);
    } catch (e) {
      console.error('ERROR', e);
      return fail(400, { error: e });
    }
  },

  uploadImage: async ({ request, url }) => {
    const body = await request.formData();
    const image: File = body.get('image') as File;
    try {
      const id = url.searchParams.get('id');
      if (!id) {
        throw new AppError('ID not found', 400);
      }
      const fileKey: string = await UploadService.uploadImage(image);
      const tempImageUrlPrefix = 'https://pub-159254b35b7249da9c3647a6615a7643.r2.dev';
      const imageURL = tempImageUrlPrefix + '/' + fileKey;
      return await LinkGroupService.updateLinkGroupImage(id as string, imageURL);
    } catch (e) {
      console.error('ERROR', e);
      return fail(400, { error: e });
    }
  },
};
