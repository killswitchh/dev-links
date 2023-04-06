import { API_URLS } from '../../constants';
import type { LinkGroup } from '../../core/models/link-group.dto';
import { Provider, convertToLink, type Link } from '../../core/models/link.dto';
import type { CreateLinkRequest } from './../../core/models/link.dto';
import { ApiWrapper } from './../api-wrapper.service';

const links: Link[] = [
  {
    id: '1',
    url: 'github.com/killswitchh',
    provider: Provider.GITHUB,
    enrich: true,
    order: 1,
    prioritize: true,
  },
  {
    id: '2',
    url: 'github.com/killswitchh',
    provider: Provider.LEETCODE,
    enrich: false,
    order: 2,
    prioritize: true,
  },
];

export const LinkService = {
  getLinks(linkGroupId: string): Promise<Link[]> {
    console.log('fetching Links for linkGroupId', linkGroupId);
    return Promise.resolve(links);
    //TODO: Remove after backend integration

    const url = API_URLS.GET_LINKS_URL(linkGroupId);
    return ApiWrapper.get(url);
  },

  createLink(createLinkRequest: CreateLinkRequest, linkGroup: LinkGroup): Promise<Link> {
    console.log('creating Link for request', createLinkRequest);
    const linkRequest: Link = convertToLink(createLinkRequest);
    linkRequest.linkGroupId = linkGroup.id;
    linkRequest.order = linkGroup.links ? linkGroup.links.length + 1 : 1;
    const url = API_URLS.CREATE_LINK_URL();
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
    const url = API_URLS.UPDATE_LINK_URL(linkId);
    return ApiWrapper.patch(url, linkReq);
  },

  activateLink(linkId: string) {
    console.log('activating link for ID', linkId);
    const url = API_URLS.ACTIVATE_LINK_URL(linkId);
    return ApiWrapper.patch(url, {});
  },

  inactivateLink(linkId: string) {
    console.log('inactivating link for ID', linkId);
    const url = API_URLS.IN_ACTIVATE_LINK_URL(linkId);
    return ApiWrapper.patch(url, {});
  },

  orderSwap(first: string, second: string) {
    console.log('swapping order for link from ', first, 'to', second);
    const url = API_URLS.ORDER_SWAP_LINK_URL(first, second);
    return ApiWrapper.patch(url, {});
  },
};

export default LinkService;
