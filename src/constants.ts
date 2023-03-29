import { PUBLIC_API_URL } from '$env/static/public';

export const CONSTANTS = {
  EMPTY_STRING: '',
  GITHUB_ERROR_MESSAGES: {
    NOT_FOUND: 'User has no repositories',
  },
  API_URL: {
    PAGES_BASE_URL: `${PUBLIC_API_URL}/pages`,
    USERS_BASE_URL: `${PUBLIC_API_URL}/pages`,
    LINKS_BASE_URL: `${PUBLIC_API_URL}/links`,
  },
};

export const ERROR_MESSAGES = {
  DEFAULT: 'Something Went Wrong!, Please try again later',
};

export const API_URLS = {
  GET_PAGES_URL: (userId: string) => `${CONSTANTS.API_URL.PAGES_BASE_URL}users/${userId}`,
  GET_PAGE_BY_ID_URL: (userId: string) => `${CONSTANTS.API_URL.PAGES_BASE_URL}users/${userId}`,
  GET_LINKS_URL: (pageId: string) => `${CONSTANTS.API_URL.PAGES_BASE_URL}links/${pageId}`,
  CREATE_LINK_URL: () => `${CONSTANTS.API_URL.PAGES_BASE_URL}links/`,
  CREATE_PAGE_URL: () => `${CONSTANTS.API_URL.PAGES_BASE_URL}links/`,
  UPDATE_PAGE_DESCRIPTION_URL: () => `${CONSTANTS.API_URL.PAGES_BASE_URL}links/`,
};
