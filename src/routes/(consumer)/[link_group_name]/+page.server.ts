import type { Provider } from '@prisma/client';
import AppError from '../../../core/models/app-error.dto';
import type { RLinkGroup } from '../../../core/models/link-group.dto';
import type { ProviderDetails, ProviderRequest } from '../../../core/models/providers/provider.dto';
import { extractGithubUsername } from '../../../core/utils/providerutils';
import GithubService from '../../../service/api/github.service';
import LinkGroupService from '../../../service/api/link-group.service';

export const load = async ({ params }) => {
  const linkGroupName = params.link_group_name;
  let linkGroup: RLinkGroup | null = null;
  if (linkGroupName) {
    try {
      linkGroup = (await LinkGroupService.getFilteredLinkGroupByName(linkGroupName)) as RLinkGroup;
      const providerMap: Map<Provider, ProviderRequest[]> = new Map();
      const enrichedLinks = linkGroup.links?.filter((x) => x.enrich === true);
      enrichedLinks?.forEach((l) =>
        providerMap.set(l.provider, [
          ...[
            {
              username: extractGithubUsername(l.url) as string,
              linkId: l.id,
              url: l.url,
            },
          ],
          ...(providerMap.get(l.provider) || []),
        ]),
      );
      const promises: Promise<ProviderDetails>[] = [];
      providerMap.forEach((value: ProviderRequest[], key: Provider) => {
        switch (key) {
          case 'GITHUB':
            value.map((v) => promises.push(GithubService.getUser(v)));
            break;
          case 'STACK_OVERFLOW':
          case 'BITBUCKET':
          case 'LEETCODE':
          case 'CODEFORCES':
          case 'HACKERRANK':
          case 'HACKEREARTH':
          case 'MEDIUM':
          case 'DEV_TO':
          case 'TWITTER':
          case 'LINKEDIN':
          case 'OTHER':
        }
      });
      const providerDetails: ProviderDetails[] = await Promise.all(promises);
      linkGroup.links?.map(
        (li) => (li.providerDetails = providerDetails.find((x) => x.linkDetails.linkId === li.id)),
      );
    } catch (e) {
      if (e instanceof AppError) {
        console.log('ERROR:', e);
      }
    }
  }
  return {
    link_group_name: params.link_group_name,
    link_group: linkGroup,
  };
};
