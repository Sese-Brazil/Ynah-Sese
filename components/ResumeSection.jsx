import SectionHeading from '@/components/SectionHeading';
import { profile } from '@/data/profile';
import { assetPath } from '@/data/site';

export default function ResumeSection() {
  const resumeUrl = assetPath(profile.resume.path);

  return (
    <section className="section" id="resume">
      <div className="resume-layout">
        <div>
          <SectionHeading kicker="Resume" title="A overview of my software work.">
            Download or open the PDF resume for coursework, project responsibilities, and technical experience.
          </SectionHeading>
          <div className="mt-6 tag-list">
            <span className="tag">{profile.resume.fileType}</span>
            <span className="tag">Updated {profile.resume.updated}</span>
          </div>
          <div className="action-row mt-6">
            <a className="button button-primary" href={resumeUrl} download>Download Resume</a>
            <a className="button button-secondary" href={resumeUrl} target="_blank" rel="noreferrer">Open in New Tab</a>
          </div>
        </div>
        <div className="resume-frame">
          <object data={resumeUrl} type="application/pdf" className="h-full w-full">
            <div className="resume-panel">
              <p>Resume preview is unavailable in this browser. Use the open or download buttons.</p>
            </div>
          </object>
        </div>
      </div>
    </section>
  );
}
