import AboutJourney from '@/components/AboutJourney';
import Capabilities from '@/components/Capabilities';
import ContactSection from '@/components/ContactSection';
import HeroSection from '@/components/HeroSection';
import ResumeSection from '@/components/ResumeSection';
import SiteFooter from '@/components/SiteFooter';

export default function HomeContent() {
  return (
    <>
      <main id="main">
        <HeroSection />
        <Capabilities />
        <AboutJourney />
        <ResumeSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
