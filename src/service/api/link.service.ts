import { API_URLS } from '../../constants';
import { Provider, type Link } from '../../core/models/link.dto';
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
  getLinks(pageId: string): Promise<Link[]> {
    console.log('fetching Links for pageId', pageId);
    return Promise.resolve(links);
    //TODO: Remove after backend integration

    const url = API_URLS.GET_LINKS_URL(pageId);
    return ApiWrapper.get(url);
  },

  createLink(createLinkRequest: CreateLinkRequest): Promise<Link> {
    console.log('creating Link for request', createLinkRequest);
    const createdLink: Link = {
      id: links[links.length - 1].id + '1',
      url: createLinkRequest.url,
      provider: createLinkRequest.provider.value,
      enrich: createLinkRequest.enrich,
      order: links.length + 1,
      prioritize: createLinkRequest.prioritize,
    };
    links.push(createdLink);
    return Promise.resolve(createdLink);
    //TODO: Remove after backend integration
    const url = API_URLS.CREATE_LINK_URL();
    return ApiWrapper.post(url, createLinkRequest);
  },
};

export default LinkService;
