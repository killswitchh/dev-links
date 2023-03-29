export type Link = {
  provider: Provider;
  enrich: boolean | null;
  prioritize: boolean;
  url: string;
  id?: string;
  order?: number;
  pageId?: string;
  active?: boolean;
};

export type CreateLinkRequest = {
  url: string;
  provider: Provider;
  prioritize: boolean;
  enrich: boolean;
  pageId: string;
  active: boolean;
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

export type SelectValue = { index: number; value: string; label: string };
