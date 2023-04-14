import {
  BackgroundType,
  ButtonShape,
  ButtonTheme,
  type Background,
  type Button,
  type GradientStop,
  type Prisma,
  type Theme,
} from '@prisma/client';
import type { BackgroundOptional, RTheme } from '../../core/models/theme.dto';
import { prisma } from './prisma.service';

export const ThemeService = {
  async getThemeByLinkGroupId(id: string): Promise<Theme | null> {
    const theme = await prisma.theme.findFirst({
      where: {
        linkGroupId: {
          equals: id,
        },
      },
      include: {
        button: true,
        background: {
          select: {
            gradientStops: true,
            id: true,
            backgroundColor: true,
            backgroundType: true,
            imageUrl: true,
            themeId: true,
          },
        },
      },
      take: 1,
    });
    return theme || null;
  },

  populateTheme(data: Prisma.LinkGroupUncheckedCreateInput) {
    data.theme = {
      create: {
        button: {
          create: {
            buttonShape: ButtonShape.PILL,
            buttonTheme: ButtonTheme.FILL,
            buttonColor: '#FFFFFF',
            fontColor: '#000000',
            outlineColor: '#000000',
          },
        },
        background: {
          create: {
            backgroundColor: '#000FFF',
            backgroundType: BackgroundType.FILL,
            gradientStops: {
              create: [
                {
                  color: '#F3F3F3',
                  position: '0%',
                },
                {
                  color: '#000FFF',
                  position: '50%',
                },
              ],
            },
            imageUrl: undefined,
          },
        },
      },
    };
  },

  getDefaultTheme(): RTheme {
    return {
      id: 'T1',
      linkGroupId: 'L1',
      button: {
        id: '1',
        themeId: 'T1',
        buttonShape: ButtonShape.PILL,
        buttonTheme: ButtonTheme.FILL,
        buttonColor: '#F3F3F3',
        fontColor: '#000000',
        outlineColor: '#000000',
      },
      background: {
        backgroundColor: '#000FFF',
        id: 'B1',
        themeId: 'T1',
        backgroundType: BackgroundType.GRADIENT,
        gradientStops: [
          {
            color: '#F3F3F3',
            id: '1',
            backgroundId: 'B1',
            position: '0%',
          },
          {
            color: '#000FFF',
            id: '2',
            backgroundId: 'B1',
            position: '50%',
          },
        ],
        imageUrl: null,
      },
    };
  },

  updateButtonForTheme(buttonId: string, button: Button): Promise<Button> {
    console.log('button ID', buttonId, 'button', button);
    return prisma.button.update({
      where: {
        id: buttonId,
      },
      data: {
        buttonColor: button.buttonColor,
        buttonShape: button.buttonShape,
        buttonTheme: button.buttonTheme,
        fontColor: button.fontColor,
        outlineColor: button.outlineColor,
      },
    });
  },

  async updateBackgroundForTheme(
    backgroundId: string,
    data: BackgroundOptional,
  ): Promise<Background> {
    console.log('background ID', backgroundId, 'background', data);
    const gradientStops: GradientStop[] = data.gradientStops as GradientStop[];
    const promises: Promise<any>[] = [];
    gradientStops.forEach((g) => {
      const updatePromise = prisma.gradientStop.update({
        where: {
          id: g.id,
        },
        data: {
          position: g.position,
          color: g.color,
        },
      });
      promises.push(updatePromise);
    });
    await Promise.all(promises);
    return prisma.background.update({
      where: {
        id: backgroundId,
      },
      data: {
        backgroundColor: data.backgroundColor,
        backgroundType: data.backgroundType,
        imageUrl: data.imageUrl,
      },
    });
  },
};

export default ThemeService;
