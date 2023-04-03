import AppError from '../../../../../../Code/dev-linktree/dev-tree-dashboard/src/core/models/app-error.dto';
import type { LinkGroup } from '../../core/models/link-group.dto';
import { LinkGroupService } from './../../service/api/link-group.service';
export const load = async ({ params }) => {
  const linkGroupName = params.link_group_name;
  let linkGroup: LinkGroup | null = null;
  if (linkGroupName) {
    try {
      linkGroup = await LinkGroupService.getPageByName(linkGroupName);
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
