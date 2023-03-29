import { API_URLS } from '../../constants';
import type { Page } from '../../core/models/page.dto';
import { ApiWrapper } from '../api-wrapper.service';
import type { CreatePageRequest } from './../../core/models/page.dto';

const mockPage: Page = {
  id: '1',
  name: 'Page1',
  createdTs: new Date(),
  updatedTs: new Date(),
  ownerId: '12345678',
  active: true,
  underCreation: false,
};

const pages: Page[] = [
  mockPage,
  {
    id: '2',
    name: 'Page2',
    createdTs: new Date(),
    updatedTs: new Date(),
    ownerId: '12345678',
    active: false,
    underCreation: true,
  },
];

export const PageService = {
  getUserPages(userId: string): Promise<Page[]> {
    console.log('fetching pages for user', userId);
    return Promise.resolve(pages);
    const url = API_URLS.GET_PAGES_URL(userId);
    return ApiWrapper.get(url);
  },

  getAvailablePages(userId: string): Promise<number> {
    console.log('fetching pages for user', userId);
    return Promise.resolve(10);
  },

  getPageById(pageId: string): Promise<Page> {
    console.log('fetching pages for ID', pageId);
    const page = pages.find((x) => x.id === pageId);
    if (page) {
      return Promise.resolve(page);
    }
    return Promise.resolve(mockPage);
    const url = API_URLS.GET_PAGE_BY_ID_URL(pageId);
    return ApiWrapper.get(url);
  },

  createPage(createPageRequest: CreatePageRequest): Promise<Page> {
    console.log('creating page', createPageRequest);
    const createdPage: Page = {
      id: pages[pages.length - 1]?.id + 1,
      name: createPageRequest.name,
      createdTs: new Date(),
      updatedTs: new Date(),
      ownerId: createPageRequest.ownerId,
      underCreation: createPageRequest.underCreation,
      active: createPageRequest.active,
    };
    pages.push(createdPage);
    return Promise.resolve(createdPage);
    const url = API_URLS.CREATE_PAGE_URL();
    return ApiWrapper.post(url, createPageRequest);
  },

  updatePageDescription(pageId: string, description: string) {
    console.log('updating description for ID', pageId, 'to', description);
    const page = pages.find((x) => x.id === pageId);
    if (page) {
      page.description = description;
      return Promise.resolve(page);
    } else {
      return Promise.resolve(mockPage);
    }
    const url = API_URLS.UPDATE_PAGE_DESCRIPTION_URL();
    return ApiWrapper.patch(url, { description });
  },
};

export default PageService;
