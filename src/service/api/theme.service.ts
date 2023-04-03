import { API_URLS } from '../../constants';
import {
  BackgroundType,
  ButtonShape,
  ButtonTheme,
  type Button,
  type Theme,
} from '../../core/models/theme.dto';
import { ApiWrapper } from '../api-wrapper.service';
import type { Background } from './../../core/models/theme.dto';

export const theme: Theme = {
  id: '1',
  linkGroupId: '123',
  button: {
    id: '1',
    buttonShape: ButtonShape.PILL,
    buttonTheme: ButtonTheme.FILL,
    themeId: 'T123',
    buttonColor: '#FFFFFF',
    fontColor: '#000000',
    outlineColor: '#000000',
  },
  background: {
    id: '1',
    backgroundColor: '#000FFF',
    backgroundType: BackgroundType.FILL,
    themeId: 'T123',
    gradientStops: [
      { id: 'G123', color: '#F3F3F3', position: '0%', backgroundId: '1' },
      { id: 'G124', color: '#000FFF', position: '50%', backgroundId: '1' },
    ],
    imageUrl: undefined,
  },
};
export const ThemeService = {
  updateThemeForPage(linkGroupId: string): Promise<Theme> {
    console.log('creating Theme for linkGroupId', linkGroupId);
    return Promise.resolve(theme);
    //TODO: Remove after backend integration

    const url = API_URLS.GET_LINKS_URL(linkGroupId);
    return ApiWrapper.get(url);
  },

  updateButtonForTheme(themeId: string, buttonId: string, button: Button): Promise<Button> {
    console.log('button ID', buttonId, 'button', button);
    const url = API_URLS.UPDATE_BUTTON_URL(buttonId);
    return ApiWrapper.patch(url, button);
  },

  updateBackgroundForTheme(
    themeId: string,
    backgroundId: string,
    background: Background,
  ): Promise<Background> {
    console.log('updating Background for themeId', themeId, 'button ID', backgroundId);
    return Promise.resolve(Object.assign(theme.background, background));
    //TODO: Remove after backend integration

    const url = API_URLS.UPDATE_BACKGROUND_URL(themeId, backgroundId);
    return ApiWrapper.patch(url);
  },
};

export default ThemeService;
