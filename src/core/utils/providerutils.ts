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

export function extractLeetCodeUsername(link: string): string | null {
  let pathParts = link.split('/');
  pathParts = pathParts.filter((x) => x !== '');
  return pathParts[pathParts.length - 1];
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
    case 'www.github.com': {
      const urlParts = url.split('/');
      const lastPart = urlParts[urlParts.length - 1];
      if (lastPart === '') {
        return Provider.GITHUB_PROFILE;
      } else if (urlParts.length === 4) {
        return Provider.GITHUB_PROFILE;
      } else {
        return Provider.GITHUB_REPOSITORY;
      }
    }
    case 'leetcode.com':
    case 'www.leetcode.com': {
      let pathParts = url.split('/');
      pathParts = pathParts.filter((x) => x !== '');
      const username = pathParts[pathParts.length - 1];
      if (pathParts.length === 3 && username !== '') {
        return Provider.LEETCODE;
      }
      break;
    }
    default:
      return Provider.OTHER;
  }
  return Provider.OTHER;
}

export function generateProviderRequestFromLink(l: LinkWithProviderDetails) {
  switch (l.provider) {
    case Provider.GITHUB_PROFILE:
    case Provider.GITHUB_REPOSITORY: {
      return {
        username: extractGithubUsername(l.url) as string,
        linkId: l.id,
        url: l.url,
        repository: extractGithubRepository(l.url) as string,
        provider: l.provider,
      };
    }
    case Provider.LEETCODE: {
      const username = extractLeetCodeUsername(l.url) as string;
      return {
        username: username,
        linkId: l.id,
        url: l.url,
        repository: '',
        provider: l.provider,
      };
    }
    default:
      return {
        username: '',
        linkId: l.id,
        url: l.url,
        repository: '',
        provider: l.provider,
      };
  }
}
