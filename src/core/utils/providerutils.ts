import { Provider } from '@prisma/client';
import type { LinkWithProviderDetails } from '../models/providers/provider.dto';

export function extractGithubUsername(link: string): string | null {
  const match = link.match(/github\.com\/([^/]+)/);
  return match ? match[1] : null;
}

export function extractGithubRepository(link: string): string | null {
  const match = link.match(/github\.com\/([^/]+)\/([^/]+)/);
  return match ? match[2] : null;
}

export function getProvider(url: string): Provider {
  let hostname: string;
  try {
    hostname = new URL(url).hostname;
  } catch (e) {
    return Provider.OTHER;
  }
  switch (hostname) {
    case 'github.com':
    case 'www.github.com':
      // eslint-disable-next-line no-case-declarations
      const urlParts = url.split('/');
      // eslint-disable-next-line no-case-declarations
      const lastPart = urlParts[urlParts.length - 1];
      if (lastPart === '') {
        return Provider.GITHUB_PROFILE;
      } else if (urlParts.length === 4) {
        return Provider.GITHUB_PROFILE;
      } else {
        return Provider.GITHUB_REPOSITORY;
      }
    default:
      return Provider.OTHER;
  }
}

export function generateProviderRequestFromLink(l: LinkWithProviderDetails) {
  return {
    username: extractGithubUsername(l.url) as string,
    linkId: l.id,
    url: l.url,
    repository: extractGithubRepository(l.url) as string,
    provider: l.provider,
  };
}
