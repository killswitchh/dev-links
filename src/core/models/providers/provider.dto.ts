import type { Link, Provider } from '@prisma/client';

export type LinkWithProviderDetails = Link & { providerDetails?: ProviderDetails };

export type ProviderDetails = GithubAccountDetails | GithubRepositoryDetails;

export type GithubAccountDetails = {
  name: string;
  followers: number;
  company: string;
  repos: number;
  following: number;
  bio: string;
  profileImageUrl: string;
} & { linkDetails: ProviderRequest };

export type GithubRepositoryDetails = {
  name: string;
  stars: number;
  watchers: number;
  forks: number;
  language: string;
  licenseName: string;
  topics: string[];
  description: string;
  profileImageUrl: string;
} & { linkDetails: ProviderRequest };

export type ProviderRequest = {
  linkId: string;
  url: string;
  username: string;
  repository?: string;
  provider: Provider;
};
