import { API_URLS } from '../../constants';
import type { CreateLinkGroupRequest, LinkGroup } from '../../core/models/link-group.dto';
import { ApiWrapper } from '../api-wrapper.service';
import { theme } from './theme.service';

const mockPage: LinkGroup = {
  id: '1',
  name: 'Page1',
  createdTs: new Date(),
  updatedTs: new Date(),
  ownerId: '12345678',
  active: true,
  underCreation: false,
  theme: theme,
};

const linkGroups: LinkGroup[] = [
  mockPage,
  {
    id: '2',
    name: 'Page2',
    createdTs: new Date(),
    updatedTs: new Date(),
    ownerId: '12345678',
    active: false,
    underCreation: true,
    theme: theme,
  },
];

export const LinkGroupService = {
  getUserPages(userId: string): Promise<LinkGroup[]> {
    console.log('fetching linkGroups for user', userId);
    const url = API_URLS.GET_LINK_GROUP_BY_USER_ID(userId);
    return ApiWrapper.get(url);
  },

  getAvailablePages(userId: string): Promise<number> {
    console.log('fetching linkGroups for user', userId);
    return Promise.resolve(10);
  },

  getPageByName(name: string): Promise<LinkGroup> {
    console.log('fetching linkGroups for name', name);
    const url = API_URLS.GET_LINK_GROUP_BY_NAME(name);
    return ApiWrapper.get(url);
  },

  createPage(createPageRequest: CreateLinkGroupRequest): Promise<LinkGroup> {
    console.log('creating linkGroup', createPageRequest);
    const url = API_URLS.CREATE_LINK_GROUP_URL();
    return ApiWrapper.post(url, createPageRequest);
  },

  updatePageDescription(linkGroupId: string, description: string) {
    console.log('updating description for ID', linkGroupId, 'to', description);
    const linkGroup = linkGroups.find((x) => x.id === linkGroupId);
    if (linkGroup) {
      linkGroup.description = description;
      return Promise.resolve(linkGroup);
    } else {
      return Promise.resolve(mockPage);
    }
    const url = API_URLS.UPDATE_PAGE_DESCRIPTION_URL();
    return ApiWrapper.patch(url, { description });
  },
};

export default LinkGroupService;