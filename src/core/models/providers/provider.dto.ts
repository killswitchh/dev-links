import type { Link, Provider } from '@prisma/client';

export type LinkWithProviderDetails = Link & { providerDetails?: ProviderDetails };

export type ProviderDetails =
  | GithubAccountDetails
  | GithubRepositoryDetails
  | LeetcodeProfileDetails;

export type GithubAccountDetails = {
  name: string;
  followers: string;
  company: string;
  repos: string;
  following: number;
  bio: string;
  profileImageUrl: string;
  profileUrl: string;
} & { linkDetails: ProviderRequest };

export type GithubRepositoryDetails = {
  name: string;
  stars: string;
  watchers: string;
  forks: string;
  language: string;
  licenseName: string;
  topics: string[];
  description: string;
  profileImageUrl: string;
  profileUrl: string;
} & { linkDetails: ProviderRequest };

export type ProviderRequest = {
  linkId: string;
  url: string;
  username: string;
  repository?: string;
  provider: Provider;
};

export type LeetcodeProfileDetails = {
  name: string;
  profileImage: string;
  problems: {
    easy: number;
    medium: number;
    hard: number;
  };
  ranking: number;
} & { linkDetails: ProviderRequest };
