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
    METADATA_BASE_URL: `${PUBLIC_API_URL}metadata`,
  },
};

export const ERROR_MESSAGES = {
  DEFAULT: 'Something Went Wrong!, Please try again later',
};

export const API_URLS = {
  LINKS: {
    GET_FOR_LINK_GROUP: (linkGroupId: string) =>
      `${CONSTANTS.API_URL.LINK_GROUP_BASE_URL}links/${linkGroupId}`,
    CREATE: () => `${CONSTANTS.API_URL.LINKS_BASE_URL}`,
    UPDATE: (linkId: string) => `${CONSTANTS.API_URL.LINKS_BASE_URL}/${linkId}`,
    ACTIVATE: (linkId: string) => `${CONSTANTS.API_URL.LINKS_BASE_URL}/activate/${linkId}`,
    INACTIVATE: (linkId: string) => `${CONSTANTS.API_URL.LINKS_BASE_URL}/inactivate/${linkId}`,
    ORDER_SWAP: (first: string, second: string) =>
      `${CONSTANTS.API_URL.LINKS_BASE_URL}/order-swap/${first}/${second}`,
  },
  LINK_GROUPS: {
    GET_BY_USER_ID: (userId: string) =>
      `${CONSTANTS.API_URL.LINK_GROUP_BASE_URL}/user-id/${userId}`,
    GET_BY_NAME: (name: string) => `${CONSTANTS.API_URL.LINK_GROUP_BASE_URL}/name/${name}`,
    FILTERED_GET_BY_NAME: (name: string) =>
      `${CONSTANTS.API_URL.LINK_GROUP_BASE_URL}/name/${name}/active`,
    CREATE: () => `${CONSTANTS.API_URL.LINK_GROUP_BASE_URL}`,
    UPDATE_PAGE_DESCRIPTION: (linkGroupId: string) =>
      `${CONSTANTS.API_URL.LINK_GROUP_BASE_URL}/${linkGroupId}/description`,
    UPDATE_IMAGE_URL: (linkGroupId: string) =>
      `${CONSTANTS.API_URL.LINK_GROUP_BASE_URL}/${linkGroupId}/image`,
    ACTIVATE: (linkGroupId: string) =>
      `${CONSTANTS.API_URL.LINK_GROUP_BASE_URL}/${linkGroupId}/activate`,
    INACTIVATE: (linkGroupId: string) =>
      `${CONSTANTS.API_URL.LINK_GROUP_BASE_URL}/${linkGroupId}/inactivate`,
  },
  USERS: {
    GET_BY_EMAIL: (email: string) => `${CONSTANTS.API_URL.USERS_BASE_URL}/email/${email}`,
    CREATE: () => `${CONSTANTS.API_URL.USERS_BASE_URL}`,
  },
  METADATA: {
    GET_PROVIDERS: () => `${CONSTANTS.API_URL.METADATA_BASE_URL}/providers`,
  },
  THEME: {
    UPDATE_BUTTON: (buttonId: string) => `${CONSTANTS.API_URL.THEMES_BASE_URL}/button/${buttonId}`,
    UPDATE_BACKGROUND: (backgroundId: string) =>
      `${CONSTANTS.API_URL.THEMES_BASE_URL}/background/${backgroundId}`,
  },
};
