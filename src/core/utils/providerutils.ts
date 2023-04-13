export function extractGithubUsername(link: string): string | null {
  const match = link.match(/github\.com\/([^/]+)/);
  return match ? match[1] : null;
}
