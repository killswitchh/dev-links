import { GITHUB_API_URLS } from '../../constants';
import type { GithubRepository, GithubUser } from '../../core/models/providers/github.dto';
import type {
  GithubAccountDetails,
  GithubRepositoryDetails,
  ProviderRequest,
} from '../../core/models/providers/provider.dto';
import { ApiWrapper } from './../api-wrapper.service';

export const GithubService = {
  async getUserRepos(req: ProviderRequest): Promise<GithubRepositoryDetails | undefined> {
    if (!req.repository) return;
    const url = GITHUB_API_URLS.GITHUB_GET_REPOS_URL(req.username, req.repository);
    console.log(url);
    const repos: GithubRepository = await ApiWrapper.get(url, req.provider);
    return {
      name: repos.name,
      description: repos.description,
      language: repos.language,
      stars: repos.stargazers_count,
      forks: repos.forks_count,
      licenseName: repos.license.name,
      watchers: repos.watchers,
      profileImageUrl: repos.owner.avatar_url,
      topics: repos.topics,
      linkDetails: req,
    };
  },
  async getUser(req: ProviderRequest): Promise<GithubAccountDetails | undefined> {
    const url = GITHUB_API_URLS.GITHUB_GET_USER_URL(req.username);
    const user: GithubUser = await ApiWrapper.get(url, req.provider);
    if (!user) return;
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
