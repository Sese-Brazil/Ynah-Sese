import { projects } from '@/data/projects';

const siteUrl = 'https://sese-brazil.github.io/Ynah-Sese';

export const dynamic = 'force-static';

export default function sitemap() {
  return [
    {
      url: siteUrl,
      lastModified: new Date()
    },
    ...projects.map((project) => ({
      url: `${siteUrl}/work/${project.slug}/`,
      lastModified: new Date()
    }))
  ];
}
