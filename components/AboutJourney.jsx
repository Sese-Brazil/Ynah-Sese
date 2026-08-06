import SectionHeading from '@/components/SectionHeading';
import { profile } from '@/data/profile';
import { timeline } from '@/data/timeline';

export default function AboutJourney() {
  return (
    <section className="section section-compact" id="about">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading kicker="About" title="Learning by building useful systems.">
          {profile.about}
        </SectionHeading>
        <div className="timeline" aria-label="Engineering journey">
          {timeline.map((item) => (
            <article className="timeline-card" key={`${item.label}-${item.title}`}>
              <span>{item.label}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
