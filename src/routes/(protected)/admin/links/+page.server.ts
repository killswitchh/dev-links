import type { Session } from '@supabase/supabase-js';
import { error, fail, redirect } from '@sveltejs/kit';
import { ERROR_MESSAGES } from '../../../../constants';
import AppError from '../../../../core/models/app-error.dto';
import type { CreateLinkGroupRequest, LinkGroup } from '../../../../core/models/link-group.dto';
import { linkGroupStore } from '../../../../stores';
import type { PageServerLoad } from './$types';
import { LinkGroupService } from './../../../../service/api/link-group.service';

export const load = (async ({ locals: { getSession, user } }) => {
  const session: Session = await getSession();
  if (!session) {
    throw error(401, { message: 'Unauthorized' });
  }
  let linkGroups: LinkGroup[] = [];
  let pageLimit = 3;
  try {
    if (!user) {
      throw new AppError('UNAUTHORIZED', 404);
    }
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
  createPage: async ({ request, locals }) => {
    const body = await request.formData();
    if (!locals.user) {
      return fail(400, { error: ERROR_MESSAGES.DEFAULT });
    }

    const id = '123';
    const createPageRequest: CreateLinkGroupRequest = {
      name: body.get('name') as string,
      ownerId: id as string,
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
