import type { Background, Button, GradientStop, Theme } from '@prisma/client';
import type { BackgroundOptional, RTheme } from '../../core/models/theme.dto';
import { defaultTheme } from '../../core/utils/themeutils';
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

  getDefaultTheme(): RTheme {
    return defaultTheme;
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
