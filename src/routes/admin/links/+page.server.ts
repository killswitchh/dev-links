import type { Session } from '@supabase/supabase-js';
import { error, fail, redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';
import type { CreateLinkGroupRequest, LinkGroup } from '../../../core/models/link-group.dto';
import LinkGroupService from '../../../service/api/link-group.service';
import { linkGroupStore } from '../../../stores';
import type { PageServerLoad } from './$types';
import { ERROR_MESSAGES } from './../../../constants';
import { userStore } from './../../../stores';
import AppError from '../../../core/models/app-error.dto';

export const load = (async ({ locals: { getSession } }) => {
  const session: Session = await getSession();
  if (!session) {
    throw error(401, { message: 'Unauthorized' });
  }
  const user = get(userStore);
  let linkGroups: LinkGroup[] = [];
  let pageLimit = 3;
  try {
    linkGroups = await LinkGroupService.getUserPages(user.id);
    pageLimit = await LinkGroupService.getAvailablePages(session.user.id);
  } catch (e) {
    if (e instanceof AppError) {
      throw error(400, e.message);
    }
  }

  return {
    session: getSession(),
    linkGroups: linkGroups,
    pageLimit: pageLimit,
  };
}) satisfies PageServerLoad;

export const actions = {
  createPage: async ({ request }) => {
    const body = await request.formData();
    const user = get(userStore);
    if (!user) {
      return fail(400, { error: ERROR_MESSAGES.DEFAULT });
    }

    const createPageRequest: CreateLinkGroupRequest = {
      name: body.get('name') as string,
      ownerId: user?.id as string,
      underCreation: true,
      active: true,
    };
    if (createPageRequest.ownerId === null) {
      return fail(400, { createPageRequest, error: ERROR_MESSAGES.DEFAULT });
    }
    try {
      const linkGroup = await LinkGroupService.createPage(createPageRequest);
      if (linkGroup) {
        linkGroupStore.set(linkGroup);
      }
    } catch (e) {
      console.error('ERROR', e);
      return fail(400, { createPageRequest, error: e });
    }
    throw redirect(301, `/admin/create?name=${createPageRequest.name}`);
  },
};
