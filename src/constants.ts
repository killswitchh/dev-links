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
