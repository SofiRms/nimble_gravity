export function isValidGithubUrl(url) {
  if (!url) return false;

  const sanitizedUrl = url.trim();

  const githubRegex = /^https:\/\/github\.com\/[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+(\.git)?\/?$/;
  return githubRegex.test(sanitizedUrl);
}