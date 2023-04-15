import { BackgroundType, ButtonShape, ButtonTheme } from '@prisma/client';
import type { RTheme } from '../models/theme.dto';

export const defaultButton = {
  id: '1',
  themeId: 'T1',
  buttonShape: ButtonShape.PILL,
  buttonTheme: ButtonTheme.FILL,
  buttonColor: '#F3F3F3',
  fontColor: '#000000',
  outlineColor: '#000000',
};

export const defaultBackground = {
  backgroundColor: '#f87171',
  id: 'B1',
  themeId: 'T1',
  backgroundType: BackgroundType.GRADIENT,
  gradientStops: [
    {
      color: '#a855f7',
      id: '1',
      backgroundId: 'B1',
      position: '0%',
    },
    {
      color: '#f87171',
      id: '2',
      backgroundId: 'B1',
      position: '50%',
    },
  ],
  imageUrl: null,
};
export const defaultTheme: RTheme = {
  id: 'T1',
  linkGroupId: 'L1',
  button: defaultButton,
  background: defaultBackground,
};
