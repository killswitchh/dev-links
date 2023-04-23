import { LeetCode } from 'leetcode-query';
import type {
  LeetcodeProfileDetails,
  ProviderRequest,
} from '../../core/models/providers/provider.dto';

export const LeetCodeService = {
  async getUserProfile(req: ProviderRequest): Promise<LeetcodeProfileDetails | undefined> {
    if (!req.username) return;
    const leetcode = new LeetCode();
    const user = await leetcode.user(req.username);
    if (!user.matchedUser) return;
    return {
      name: user.matchedUser?.username as string,
      problems: {
        easy: user.matchedUser.submitStats.acSubmissionNum.find((x) => x.difficulty === 'Easy')
          ?.count as number,
        medium: user.matchedUser.submitStats.acSubmissionNum.find((x) => x.difficulty === 'Medium')
          ?.count as number,
        hard: user.matchedUser.submitStats.acSubmissionNum.find((x) => x.difficulty === 'Hard')
          ?.count as number,
      },
      ranking: user.matchedUser.profile.ranking,
      profileImage: user.matchedUser?.profile.userAvatar as string,
      linkDetails: req,
    };
  },
};

export default LeetCodeService;
