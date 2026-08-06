export const dynamic = 'force-static';

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/'
    },
    sitemap: 'https://sese-brazil.github.io/Ynah-Sese/sitemap.xml'
  };
}
