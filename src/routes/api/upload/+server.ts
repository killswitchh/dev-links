import { error, json, type RequestHandler } from '@sveltejs/kit';
import UploadService from '../../../service/api/upload.service';

export const PATCH = (async ({ locals: { getSession }, request }) => {
  const session = await getSession();

  if (!session) {
    throw error(401, { message: 'Unauthorized' });
  }
  if (!request.body) {
    throw error(404, { message: 'File not found' });
  }
  const data = JSON.parse((await request.body.getReader().read()).toString());
  const file = data.image;
  //writeFileSync(`static/avatar.png`, file, 'base64');

  const uploadedFile = await UploadService.uploadImage(file);
  return json({ uploadedFile });
}) satisfies RequestHandler;
