import {
  BackgroundType,
  ButtonShape,
  ButtonTheme,
  type LinkGroup,
  type Prisma,
} from '@prisma/client';
import AppError from '../../core/models/app-error.dto';
import type { LinkGroupOptional, OLinkGroupWithLinks } from '../../core/models/link-group.dto';
import { prisma } from './prisma.service';

export const LinkGroupService = {
  includeTheme() {
    return {
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
    };
  },

  async getLinkGroupByUserId(userId: string): Promise<LinkGroup[]> {
    console.log('fetching linkGroups for user', userId);
    return await prisma.linkGroup.findMany({
      where: {
        ownerId: {
          equals: userId,
        },
      },
    });
  },

  getAvailablePages(userId: string): Promise<number> {
    console.log('fetching linkGroups for user', userId);
    return Promise.resolve(3);
  },

  async getLinkGroupByName(name: string): Promise<OLinkGroupWithLinks | null> {
    console.log('fetching linkGroups for name', name);

    const linkGroup = await prisma.linkGroup.findFirst({
      where: {
        name: {
          equals: name,
        },
      },
      include: {
        links: true,
        theme: {
          include: this.includeTheme(),
        },
      },
    });
    return linkGroup || null;
  },

  async getFilteredLinkGroupByName(name: string): Promise<OLinkGroupWithLinks | null> {
    console.log('fetching filtered linkGroups for name', name);
    const linkGroup = await prisma.linkGroup.findFirst({
      where: {
        name: {
          equals: name,
        },
      },
      include: {
        links: {
          where: {
            active: true,
          },
        },
        theme: {
          include: this.includeTheme(),
        },
      },
    });
    return linkGroup || null;
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

  async createLinkGroup(
    data: Prisma.LinkGroupUncheckedCreateInput,
  ): Promise<LinkGroupOptional | null> {
    console.log('creating linkGroup', data);
    data.name = data.name.toLowerCase();
    const existingLinkGroup = await prisma.linkGroup.findFirst({
      where: {
        name: data.name,
      },
    });
    if (existingLinkGroup) throw new AppError('Link Group Already present with the name', 500);
    this.populateTheme(data);
    const linkGroup = await prisma.linkGroup.create({
      data,
    });
    return await prisma.linkGroup.findFirst({
      where: {
        id: linkGroup.id,
      },
      include: {
        theme: true,
      },
    });
  },

  updateLinkGroupDescriptionAndFont(linkGroupId: string, description: string, fontColor: string) {
    console.log(
      'updating linkgroup',
      linkGroupId,
      'to',
      `description: ${description} - fontColor: ${fontColor}`,
    );
    return prisma.linkGroup.update({
      where: {
        id: linkGroupId,
      },
      data: {
        description: description,
        fontColor: fontColor,
      },
    });
  },

  updateLinkGroupImage(linkGroupId: string, imageURL: string) {
    console.log('updating image for link group with ID', linkGroupId, 'URL: ', imageURL);
    return prisma.linkGroup.update({
      where: {
        id: linkGroupId,
      },
      data: {
        imageURL: imageURL,
      },
    });
  },

  async updateLinkGroupStatus(linkGroupId: string, status: boolean): Promise<LinkGroup> {
    return prisma.linkGroup.update({
      where: {
        id: linkGroupId,
      },
      data: {
        active: status,
      },
    });
  },

  activateLink(linkGroupId: string) {
    console.log('activating link-group with ID', linkGroupId);
    return this.updateLinkGroupStatus(linkGroupId, true);
  },

  inactivateLink(linkGroupId: string) {
    console.log('inactivating link-group with ID', linkGroupId);
    return this.updateLinkGroupStatus(linkGroupId, false);
  },

  async deleteLinkGroup(linkGroupId: string) {
    return await prisma.linkGroup.delete({
      where: {
        id: linkGroupId,
      },
    });
  },
};

export default LinkGroupService;
