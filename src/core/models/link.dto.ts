import { z } from 'zod';

export type Link = {
  provider: Provider | null;
  enrich: boolean | null;
  prioritize: boolean;
  url: string;
  id?: string;
  order?: number;
  linkGroupId?: string;
  active?: boolean;
};

export enum Provider {
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

export const ProviderSelectValueSchema = z.object({
  index: z.number(),
  value: z.nativeEnum(Provider).nullable(),
  label: z.string(),
});

export const CreateLinkRequestSchema = z.object({
  url: z.string().url(),
  provider: ProviderSelectValueSchema,
  prioritize: z.boolean(),
  enrich: z.boolean(),
  linkGroupId: z.string().nullable(),
  active: z.boolean().default(true),
});

export type CreateLinkRequest = z.infer<typeof CreateLinkRequestSchema>;

export type SelectValue = z.infer<typeof ProviderSelectValueSchema>;
