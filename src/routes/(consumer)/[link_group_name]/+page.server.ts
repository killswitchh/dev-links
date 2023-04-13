import AppError from '../../../core/models/app-error.dto';
import type { RLinkGroup } from '../../../core/models/link-group.dto';
import LinkGroupService from '../../../service/api/link-group.service';

export const load = async ({ params }) => {
  const linkGroupName = params.link_group_name;
  let linkGroup: RLinkGroup | null = null;
  if (linkGroupName) {
    try {
      linkGroup = (await LinkGroupService.getFilteredLinkGroupByName(linkGroupName)) as RLinkGroup;
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
