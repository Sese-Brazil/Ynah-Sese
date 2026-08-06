const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
const repoName = 'Ynah-Sese';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubActions ? `/${repoName}` : ''
  },
  images: {
    unoptimized: true
  },
  trailingSlash: true,
  basePath: isGithubActions ? `/${repoName}` : '',
  assetPrefix: isGithubActions ? `/${repoName}/` : ''
};

export default nextConfig;
