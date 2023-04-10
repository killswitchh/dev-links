import { API_URLS } from '../../constants';
import type { LinkGroup } from '../../core/models/link-group.dto';
import { convertToLink, type Link } from '../../core/models/link.dto';
import type { CreateLinkRequest } from './../../core/models/link.dto';
import { ApiWrapper } from './../api-wrapper.service';

export const LinkService = {
  getLinks(linkGroupId: string): Promise<Link[]> {
    console.log('fetching Links for linkGroupId', linkGroupId);
    const url = API_URLS.LINKS.GET_FOR_LINK_GROUP(linkGroupId);
    return ApiWrapper.get(url);
  },

  createLink(createLinkRequest: CreateLinkRequest, linkGroup: LinkGroup): Promise<Link> {
    console.log('creating Link for request', createLinkRequest);
    const linkRequest: Link = convertToLink(createLinkRequest);
    linkRequest.linkGroupId = linkGroup.id;
    linkRequest.order = linkGroup.links ? linkGroup.links.length + 1 : 1;
    const url = API_URLS.LINKS.CREATE();
    return ApiWrapper.post(url, linkRequest);
  },

  editLink(
    createLinkRequest: CreateLinkRequest,
    linkGroup: LinkGroup,
    linkId: string,
  ): Promise<Link> {
    console.log('editing Link for request', createLinkRequest);
    const linkReq: Link = convertToLink(createLinkRequest);
    linkReq.id = linkGroup.id;
    linkReq.order = linkGroup.links?.find((x) => x.id === linkId)?.order;
    const url = API_URLS.LINKS.UPDATE(linkId);
    return ApiWrapper.patch(url, linkReq);
  },

  activateLink(linkId: string) {
    console.log('activating link for ID', linkId);
    const url = API_URLS.LINKS.ACTIVATE(linkId);
    return ApiWrapper.patch(url, {});
  },

  inactivateLink(linkId: string) {
    console.log('inactivating link for ID', linkId);
    const url = API_URLS.LINKS.INACTIVATE(linkId);
    return ApiWrapper.patch(url, {});
  },

  orderSwap(first: string, second: string) {
    console.log('swapping order for link from ', first, 'to', second);
    const url = API_URLS.LINKS.ORDER_SWAP(first, second);
    return ApiWrapper.patch(url, {});
  },
};

export default LinkService;
