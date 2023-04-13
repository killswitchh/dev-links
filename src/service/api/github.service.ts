import { GITHUB_API_URLS } from '../../constants';
import type { GithubRepository, GithubUser } from '../../core/models/providers/github.dto';
import type {
  GithubAccountDetails,
  ProviderRequest,
} from '../../core/models/providers/provider.dto';
import { ApiWrapper } from './../api-wrapper.service';

export const GithubService = {
  async getUserRepos(req: ProviderRequest): Promise<GithubRepository[]> {
    const url = GITHUB_API_URLS.GITHUB_GET_REPOS_URL(req.username);
    const repos = await ApiWrapper.get(url);
    return repos;
  },
  async getUser(req: ProviderRequest): Promise<GithubAccountDetails> {
    const url = GITHUB_API_URLS.GITHUB_GET_USER_URL(req.username);
    const user: GithubUser = await ApiWrapper.get(url);
    return {
      name: user.name,
      repos: user.public_repos,
      bio: user.bio,
      followers: user.followers,
      following: user.following,
      profileImageUrl: user.avatar_url,
      company: user.company,
      linkDetails: req,
    };
  },
};

export default GithubService;
