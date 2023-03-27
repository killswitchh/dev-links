export type Link = {
  id: string;
  url: string;
  provider: Provider;
  enrich: boolean | null;
  order: number;
  prioritize: boolean;
  pageId?: string;
};

export const enum Provider {
  GITHUB = 'GITHUB',
  STACK_OVERFLOW = 'STACK_OVERFLOW',
  BITBUCKET = 'BITBUCKET',
  LEETCODE = 'LEETCODE',
  CODEFORCES = 'CODEFORCES',
  HACKERRANK = 'HACKERRANK',
  HACKEREARTH = 'HACKEREARTH',
  MEDIUM = 'MEDIUM',
  DEV_TO = 'DEV_TO',
  TWITTER = 'TWITTER',
  LINKEDIN = 'LINKEDIN',
  OTHER = 'OTHER',
}
