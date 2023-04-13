import type { Link } from '@prisma/client';

export type LinkWithProviderDetails = Link & { providerDetails?: GithubAccountDetails };

export type ProviderDetails = GithubAccountDetails;

export type GithubAccountDetails = {
  name: string;
  followers: number;
  company: string;
  repos: number;
  following: number;
  bio: string;
  profileImageUrl: string;
} & { linkDetails: ProviderRequest };

export type ProviderRequest = {
  linkId: string;
  url: string;
  username: string;
};
