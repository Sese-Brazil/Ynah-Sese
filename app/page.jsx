import AboutJourney from '@/components/AboutJourney';
import Capabilities from '@/components/Capabilities';
import ContactSection from '@/components/ContactSection';
import HeroSection from '@/components/HeroSection';
import ResumeSection from '@/components/ResumeSection';
import SelectedProjects from '@/components/SelectedProjects';
import SiteFooter from '@/components/SiteFooter';

export default function HomePage() {
  return (
    <>
      <main id="main">
        <HeroSection />
        <SelectedProjects />
        <Capabilities />
        <AboutJourney />
        <ResumeSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
