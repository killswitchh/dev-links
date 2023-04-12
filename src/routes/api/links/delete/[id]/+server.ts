import { error, json, type RequestHandler } from '@sveltejs/kit';
import LinkService from '../../../../../service/api/link.service';

export const DELETE = (async ({ locals: { getSession }, params }) => {
  const session = await getSession();
  if (!params) {
    throw error(404, { message: 'URL Param not found' });
  }

  if (!session) {
    throw error(401, { message: 'Unauthorized' });
  }

  const id = params.id;
  if (!id || id === 'null' || id === 'undefined') {
    throw error(401, { message: 'Unauthorized' });
  }
  return json({
    data: await LinkService.deleteLink(id as string),
  });
}) satisfies RequestHandler;
