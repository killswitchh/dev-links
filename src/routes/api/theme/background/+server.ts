import { error, json, type RequestHandler } from '@sveltejs/kit';
import type { Background } from './../../../../core/models/theme.dto';
import { ThemeService } from './../../../../service/api/theme.service';

export const PATCH = (async ({ locals: { getSession }, request }) => {
  const session = await getSession();

  if (!session) {
    throw error(401, { message: 'Unauthorized' });
  }

  const r: Background = await request.json();
  const updatedTheme = await ThemeService.updateBackgroundForTheme(r.id, r);
  return json({ updatedTheme });
}) satisfies RequestHandler;
