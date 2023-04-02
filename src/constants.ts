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
    THEMES_BASE_URL: `${PUBLIC_API_URL}/themes`,
  },
};

export const ERROR_MESSAGES = {
  DEFAULT: 'Something Went Wrong!, Please try again later',
};

export const API_URLS = {
  GET_PAGES_URL: (userId: string) => `${CONSTANTS.API_URL.PAGES_BASE_URL}users/${userId}`,
  GET_PAGE_BY_ID_URL: (userId: string) => `${CONSTANTS.API_URL.PAGES_BASE_URL}users/${userId}`,
  GET_LINKS_URL: (pageId: string) => `${CONSTANTS.API_URL.PAGES_BASE_URL}links/${pageId}`,
  CREATE_LINK_URL: () => `${CONSTANTS.API_URL.LINKS_BASE_URL}/`,
  CREATE_PAGE_URL: () => `${CONSTANTS.API_URL.LINKS_BASE_URL}/`,
  UPDATE_PAGE_DESCRIPTION_URL: () => `${CONSTANTS.API_URL.LINKS_BASE_URL}/`,
  UPDATE_BUTTON_URL: (themeId: string, buttonSettigsId: string) =>
    `${CONSTANTS.API_URL.THEMES_BASE_URL}buttons/${themeId}/${buttonSettigsId}`,
  UPDATE_BACKGROUND_URL: (themeId: string, backgroundId: string) =>
    `${CONSTANTS.API_URL.THEMES_BASE_URL}backgrounds/${themeId}/${backgroundId}`,
};
