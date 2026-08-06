import { profile } from '@/data/profile';

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>&copy; {year} {profile.name}. Designed and built by MYBAS.</p>
        <div className="footer-links">
          <a href={profile.github}>GitHub</a>
          <a href={profile.linkedin}>LinkedIn</a>
          <a href={`mailto:${profile.email}`}>Email</a>
          <a href="#home">Back to top</a>
        </div>
      </div>
    </footer>
  );
}
