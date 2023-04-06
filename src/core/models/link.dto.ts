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
  name?: string;
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
  code: z.nativeEnum(Provider),
  name: z.string(),
  index: z.number().optional(),
});

export const CreateLinkRequestSchema = z.object({
  url: z.string().url(),
  provider: ProviderSelectValueSchema.optional().nullable(),
  prioritize: z.boolean(),
  enrich: z.boolean(),
  linkGroupId: z.string().nullable(),
  name: z.string().max(50),
  active: z.boolean().default(true),
});

export type CreateLinkRequest = z.infer<typeof CreateLinkRequestSchema>;

export type SelectValue = z.infer<typeof ProviderSelectValueSchema>;

export function convertToLink(createLinkRequest: CreateLinkRequest): Link {
  return {
    name: createLinkRequest.name as string,
    prioritize: createLinkRequest.prioritize,
    enrich: createLinkRequest.enrich,
    provider: createLinkRequest.provider?.code as Provider,
    active: createLinkRequest.active,
    url: createLinkRequest.url,
    linkGroupId: createLinkRequest.linkGroupId as string,
  };
}

export function convertToCreateLinkRequest(link: Link, provider: SelectValue): CreateLinkRequest {
  return {
    name: link.name as string,
    prioritize: link.prioritize,
    enrich: !!link.enrich,
    provider: provider,
    active: !!link.active,
    url: link.url,
    linkGroupId: link.linkGroupId as string,
  };
}

export type CodeName<T> = {
  name: string;
  code: T;
  index: number;
};
