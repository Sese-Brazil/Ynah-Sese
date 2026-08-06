import 'devicon/devicon.min.css';
import './globals.css';
import SiteFrame from '@/components/SiteFrame';

export const metadata = {
  metadataBase: new URL('https://sese-brazil.github.io/Ynah-Sese'),
  title: {
    default: 'Mary Ynah Brazil Sese | Professional Portfolio',
    template: '%s | Mary Ynah Brazil Sese'
  },
  description:
    'Portfolio of Mary Ynah Brazil Sese, a Computer Science student and software developer building AI, NLP, full-stack, and data-driven systems.',
  openGraph: {
    title: 'Mary Ynah Brazil Sese | Professional Portfolio',
    description:
      'Engineering-focused portfolio covering AI, NLP, full-stack, backend, retrieval, and data systems.',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mary Ynah Brazil Sese | Professional Portfolio',
    description:
      'Computer Science student building practical AI, NLP, full-stack, and data-driven systems.'
  },
  robots: {
    index: true,
    follow: true
  }
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5
};

const themeScript = `
(() => {
  try {
    const savedTheme = localStorage.getItem('portfolio-theme');
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  } catch (error) {}
})();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SiteFrame>{children}</SiteFrame>
      </body>
    </html>
  );
}
