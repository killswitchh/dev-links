import { error, json, type RequestHandler } from '@sveltejs/kit';
import LinkGroupService from '../../../../../service/api/link-group.service';

export const PATCH = (async ({ locals: { getSession }, params }) => {
  const session = await getSession();
  if (!params) {
    throw error(404, { message: 'URL Param not found' });
  }

  if (!session) {
    throw error(401, { message: 'Unauthorized' });
  }
  const id = params.id;
  return json({
    data: await LinkGroupService.inactivateLink(id as string),
  });
}) satisfies RequestHandler;
