import { Provider, type Link, type Prisma } from '@prisma/client';
import { z } from 'zod';

export const ProviderSelectValueSchema = z.object({
  code: z.nativeEnum(Provider),
  name: z.string(),
  index: z.number().optional(),
});

export const CreateLinkRequestSchema = z.object({
  url: z.string().url(),
  provider: z.nativeEnum(Provider).optional(),
  prioritize: z.boolean(),
  enrich: z.boolean(),
  linkGroupId: z.string().nullable(),
  name: z.string().max(50),
  active: z.boolean().default(true),
});

export type CreateLinkRequest = z.infer<typeof CreateLinkRequestSchema>;

export type SelectValue = z.infer<typeof ProviderSelectValueSchema>;

export function convertToLink(
  createLinkRequest: CreateLinkRequest,
): Prisma.LinkUncheckedCreateInput {
  return {
    name: createLinkRequest.name as string,
    prioritize: createLinkRequest.prioritize,
    enrich: createLinkRequest.enrich,
    provider: createLinkRequest.provider as Provider,
    active: createLinkRequest.active,
    url: createLinkRequest.url,
    linkGroupId: createLinkRequest.linkGroupId as string,
    order: 0,
  };
}

export function convertToCreateLinkRequest(link: Link, provider: Provider): CreateLinkRequest {
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
