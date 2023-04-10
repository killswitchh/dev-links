import { API_URLS } from '../../constants';
import type { CreateLinkGroupRequest, LinkGroup } from '../../core/models/link-group.dto';
import { ApiWrapper } from '../api-wrapper.service';

export const LinkGroupService = {
  getUserPages(userId: string): Promise<LinkGroup[]> {
    console.log('fetching linkGroups for user', userId);
    const url = API_URLS.LINK_GROUPS.GET_BY_USER_ID(userId);
    return ApiWrapper.get(url);
  },

  getAvailablePages(userId: string): Promise<number> {
    console.log('fetching linkGroups for user', userId);
    return Promise.resolve(10);
  },

  getPageByName(name: string): Promise<LinkGroup> {
    console.log('fetching linkGroups for name', name);
    const url = API_URLS.LINK_GROUPS.GET_BY_NAME(name);
    return ApiWrapper.get(url);
  },

  getFilteredPageByName(name: string): Promise<LinkGroup> {
    console.log('fetching filtered linkGroups for name', name);
    const url = API_URLS.LINK_GROUPS.FILTERED_GET_BY_NAME(name);
    return ApiWrapper.get(url);
  },

  createPage(createPageRequest: CreateLinkGroupRequest): Promise<LinkGroup> {
    console.log('creating linkGroup', createPageRequest);
    const url = API_URLS.LINK_GROUPS.CREATE();
    return ApiWrapper.post(url, createPageRequest);
  },

  updatePageDescription(linkGroupId: string, description: string) {
    console.log('updating description for ID', linkGroupId, 'to', description);
    const url = API_URLS.LINK_GROUPS.UPDATE_PAGE_DESCRIPTION(linkGroupId);
    return ApiWrapper.patch(url, { description });
  },

  updateLinkGroupImage(linkGroupId: string, imageURL: string) {
    console.log('updating image for link group with ID', linkGroupId, 'URL: ', imageURL);
    const url = API_URLS.LINK_GROUPS.UPDATE_IMAGE_URL(linkGroupId);
    return ApiWrapper.patch(url, { imageURL: imageURL });
  },

  activateLink(linkGroupId: string) {
    console.log('activating link-group with ID', linkGroupId);
    const url = API_URLS.LINK_GROUPS.ACTIVATE(linkGroupId);
    return ApiWrapper.patch(url, {});
  },

  inactivateLink(linkGroupId: string) {
    console.log('inactivating link-group with ID', linkGroupId);
    const url = API_URLS.LINK_GROUPS.INACTIVATE(linkGroupId);
    return ApiWrapper.patch(url, {});
  },
};

export default LinkGroupService;
