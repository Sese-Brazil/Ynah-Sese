const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
const repoName = 'Ynah-Sese';
const buildTime = new Date().toISOString();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubActions ? `/${repoName}` : '',
    NEXT_PUBLIC_BUILD_TIME: buildTime
  },
  images: {
    unoptimized: true
  },
  trailingSlash: true,
  basePath: isGithubActions ? `/${repoName}` : '',
  assetPrefix: isGithubActions ? `/${repoName}/` : ''
};

export default nextConfig;
