import { notFound } from 'next/navigation';
import CaseStudyPage from '@/components/CaseStudyPage';
import { getProject, projects } from '@/data/projects';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }) {
  const project = getProject(params.slug);

  if (!project) {
    return {
      title: 'Project Not Found'
    };
  }

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary
    }
  };
}

export default function WorkDetailRoute({ params }) {
  const project = getProject(params.slug);
  if (!project) notFound();
  return <CaseStudyPage project={project} />;
}
