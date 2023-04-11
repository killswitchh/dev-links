import { Provider, type Link, type Prisma } from '@prisma/client';
import AppError from '../../core/models/app-error.dto';
import type { OLinkGroup } from '../../core/models/link-group.dto';
import { convertToLink } from '../../core/models/link.dto';
import type { CreateLinkRequest } from './../../core/models/link.dto';
import { prisma } from './prisma.service';

export const LinkService = {
  async getLinks(linkGroupId: string): Promise<Link[]> {
    console.log('fetching Links for linkGroupId', linkGroupId);
    return await prisma.link.findMany({
      where: {
        linkGroupId: {
          equals: linkGroupId,
        },
      },
      orderBy: {
        order: 'asc',
      },
    });
  },

  createLink(createLinkRequest: CreateLinkRequest, linkGroup: OLinkGroup): Promise<Link> {
    console.log('creating Link for request', createLinkRequest);
    const linkRequest = convertToLink(createLinkRequest) as Prisma.LinkUncheckedCreateInput;
    linkRequest.linkGroupId = linkGroup.id;
    linkRequest.order = linkGroup.links ? linkGroup.links.length + 1 : 1;
    return prisma.link.create({
      data: linkRequest,
    });
  },

  editLink(
    createLinkRequest: CreateLinkRequest,
    linkGroup: OLinkGroup,
    linkId: string,
  ): Promise<Link> {
    console.log('editing Link for request', createLinkRequest);
    const linkReq = convertToLink(createLinkRequest);
    linkReq.id = linkGroup.id;
    const existingLinkOrder = linkGroup.links?.find((x) => x.id === linkId)?.order;
    if (existingLinkOrder) {
      linkReq.order = existingLinkOrder;
    }
    return prisma.link.update({
      where: {
        id: linkId,
      },
      data: {
        url: linkReq.url,
        provider: linkReq.provider,
        active: linkReq.active,
        enrich: linkReq.provider === Provider.OTHER ? false : linkReq.enrich,
        name: linkReq.name,
        prioritize: linkReq.prioritize,
        order: linkReq.order,
      },
    });
  },

  activateLink(linkId: string) {
    console.log('activating link for ID', linkId);
    return prisma.link.update({
      where: {
        id: linkId,
      },
      data: {
        active: true,
      },
    });
  },

  inactivateLink(linkId: string) {
    console.log('inactivating link for ID', linkId);
    return prisma.link.update({
      where: {
        id: linkId,
      },
      data: {
        active: false,
      },
    });
  },

  async orderSwap(firstLinkId: string, secondLinkId: string) {
    const firstLink: Link = await this.findById(firstLinkId);
    const secondLink: Link = await this.findById(secondLinkId);
    await this.updateOrder(firstLinkId, secondLink.order);
    return await this.updateOrder(secondLinkId, firstLink.order);
  },

  updateOrder(linkId: string, order: number) {
    return prisma.link.update({
      where: {
        id: linkId,
      },
      data: {
        order: order,
      },
    });
  },

  async findById(id: string): Promise<Link> {
    const link = await prisma.link.findFirst({
      where: {
        id: id,
      },
    });
    if (!link) {
      throw new AppError(`Link not found for ID ${id}`, 404);
    }
    return link;
  },

  async getActiveLinksByLinkGroupId(id: string): Promise<Link[]> {
    const links = await prisma.link.findMany({
      where: {
        linkGroupId: {
          equals: id,
        },
        active: true,
      },
      orderBy: {
        order: 'asc',
      },
    });
    return links;
  },
};

export default LinkService;
