import { error, json, type RequestHandler } from '@sveltejs/kit';
import type { Button } from '../../../../core/models/theme.dto';
import ThemeService from '../../../../service/api/theme.service';

export const PATCH = (async ({ locals: { getSession }, request }) => {
  const session = await getSession();

  if (!session) {
    throw error(401, { message: 'Unauthorized' });
  }

  const r: Button = await request.json();
  const updatedTheme = await ThemeService.updateButtonForTheme(r.id, r);
  return json({ updatedTheme });
}) satisfies RequestHandler;
