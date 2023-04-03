import { get } from 'svelte/store';
import { API_URLS } from '../../constants';
import { Provider, type Link } from '../../core/models/link.dto';
import type { CreateLinkRequest } from './../../core/models/link.dto';
import { linkGroupStore } from './../../stores';
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

  createLink(createLinkRequest: CreateLinkRequest): Promise<Link> {
    console.log('creating Link for request', createLinkRequest);
    const linkGroup = get(linkGroupStore);
    const linkReq: Link = {
      url: createLinkRequest.url,
      provider: createLinkRequest.provider.value,
      enrich: createLinkRequest.enrich,
      order: linkGroup.links ? linkGroup.links.length + 1 : 1,
      prioritize: createLinkRequest.prioritize,
      linkGroupId: linkGroup.id,
    };
    const url = API_URLS.CREATE_LINK_URL();
    return ApiWrapper.post(url, linkReq);
  },
};

export default LinkService;
