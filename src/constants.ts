import { PUBLIC_API_URL } from '$env/static/public';

export const CONSTANTS = {
  EMPTY_STRING: '',
  GITHUB_ERROR_MESSAGES: {
    NOT_FOUND: 'User has no repositories',
  },
  API_URL: {
    LINK_GROUP_BASE_URL: `${PUBLIC_API_URL}link-groups`,
    USERS_BASE_URL: `${PUBLIC_API_URL}users`,
    LINKS_BASE_URL: `${PUBLIC_API_URL}links`,
    THEMES_BASE_URL: `${PUBLIC_API_URL}themes`,
  },
};

export const ERROR_MESSAGES = {
  DEFAULT: 'Something Went Wrong!, Please try again later',
};

export const API_URLS = {
  GET_LINK_GROUP_BY_USER_ID: (userId: string) =>
    `${CONSTANTS.API_URL.LINK_GROUP_BASE_URL}/user-id/${userId}`,
  GET_PAGE_BY_ID_URL: (userId: string) => `${CONSTANTS.API_URL.LINK_GROUP_BASE_URL}users/${userId}`,
  GET_LINK_GROUP_BY_NAME: (name: string) => `${CONSTANTS.API_URL.LINK_GROUP_BASE_URL}/name/${name}`,

  GET_LINKS_URL: (linkGroupId: string) =>
    `${CONSTANTS.API_URL.LINK_GROUP_BASE_URL}links/${linkGroupId}`,
  CREATE_LINK_URL: () => `${CONSTANTS.API_URL.LINKS_BASE_URL}`,
  CREATE_LINK_GROUP_URL: () => `${CONSTANTS.API_URL.LINK_GROUP_BASE_URL}`,
  UPDATE_PAGE_DESCRIPTION_URL: () => `${CONSTANTS.API_URL.LINKS_BASE_URL}/`,
  UPDATE_BUTTON_URL: (buttonId: string) =>
    `${CONSTANTS.API_URL.THEMES_BASE_URL}/button/${buttonId}`,
  UPDATE_BACKGROUND_URL: (themeId: string, backgroundId: string) =>
    `${CONSTANTS.API_URL.THEMES_BASE_URL}backgrounds/${themeId}/${backgroundId}`,
  GET_USERS_BY_EMAIL_URL: (email: string) => `${CONSTANTS.API_URL.USERS_BASE_URL}/email/${email}`,
  CREATE_USER_URL: () => `${CONSTANTS.API_URL.USERS_BASE_URL}`,
};
