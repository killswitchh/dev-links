import type { LinkGroup } from '@prisma/client';
import type { Session } from '@supabase/supabase-js';
import { error, fail, redirect } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { ERROR_MESSAGES } from '../../../../constants';
import AppError from '../../../../core/models/app-error.dto';
import type { CreateLinkGroupRequest } from '../../../../core/models/link-group.dto';
import { linkGroupStore } from '../../../../stores';
import type { PageServerLoad } from './$types';
import { LinkGroupNameSchema } from './../../../../core/models/link-group.dto';
import { LinkGroupService } from './../../../../service/api/link-group.service';

export const load = (async ({ locals: { getSession, user }, request }) => {
  const session: Session = await getSession();
  if (!session) {
    throw error(401, { message: 'Unauthorized' });
  }
  let linkGroups: LinkGroup[] = [];
  let pageLimit = 3;
  let form;
  try {
    if (!user) {
      throw new AppError('User not found', 404);
    }
    linkGroups = await LinkGroupService.getLinkGroupByUserId(user.id);
    pageLimit = await LinkGroupService.getAvailablePages(session.user.id);
    form = await superValidate(request, LinkGroupNameSchema);
  } catch (e) {
    if (e instanceof AppError) {
      throw error(400, e.message);
    }
  }

  return {
    session: getSession(),
    linkGroups: linkGroups,
    pageLimit: pageLimit,
    form,
  };
}) satisfies PageServerLoad;

export const actions = {
  createPage: async ({ request, locals }) => {
    const form = await superValidate(request, LinkGroupNameSchema);

    if (!form.valid) {
      return fail(400, {
        form,
      });
    }
    if (!locals.user) {
      return fail(400, { error: ERROR_MESSAGES.DEFAULT });
    }
    const createPageRequest: CreateLinkGroupRequest = {
      name: form.data.name,
      ownerId: locals.user.id,
      underCreation: true,
      active: true,
    };
    if (createPageRequest.ownerId === null) {
      return fail(400, { createPageRequest, error: ERROR_MESSAGES.DEFAULT });
    }
    try {
      const linkGroup = await LinkGroupService.createLinkGroup(createPageRequest);
      if (linkGroup) {
        linkGroupStore.set(linkGroup);
      }
    } catch (e) {
      console.error('ERROR', e);
      if (e instanceof AppError) {
        console.log('im here');
        return setError(form, 'name', e.message);
      }
      return setError(form, 'name', ERROR_MESSAGES.DEFAULT);
    }
    throw redirect(301, `/admin/create?name=${createPageRequest.name}`);
  },
};
