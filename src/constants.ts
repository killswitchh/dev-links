export const ERROR_MESSAGES = {
  DEFAULT: 'Something Went Wrong!, Please try again later',
};

export const CONSTANTS = {
  EMPTY_STRING: '',
  GITHUB_ERROR_MESSAGES: {
    NOT_FOUND: 'User has no repositories',
  },
  API_URL: {
    GITHUB_BASE_URL: 'https://api.github.com/',
  },
};

export const GITHUB_API_URLS = {
  GITHUB_GET_REPOS_URL: (userName: string, repositoryName: string) =>
    `${CONSTANTS.API_URL.GITHUB_BASE_URL}repos/${userName}/${repositoryName}`,

  GITHUB_GET_USER_URL: (userName: string) =>
    `${CONSTANTS.API_URL.GITHUB_BASE_URL}users/${userName}`,
};
