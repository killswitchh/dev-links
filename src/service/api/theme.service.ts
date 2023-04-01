import { API_URLS } from '../../constants';
import { BackgroundType, ButtonShape, ButtonTheme, type Theme } from '../../core/models/theme.dto';
import { ApiWrapper } from '../api-wrapper.service';

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
    gradientStops: [],
    imageUrl: undefined,
  },
};
export const ThemeService = {
  createThemeForPage(pageId: string): Promise<Theme> {
    console.log('creating Theme for pageId', pageId);
    return Promise.resolve(theme);
    //TODO: Remove after backend integration

    const url = API_URLS.GET_LINKS_URL(pageId);
    return ApiWrapper.get(url);
  },
};

export default ThemeService;
