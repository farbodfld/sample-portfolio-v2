import Link from "next/link";
import ProjectCard from "../../components/ProjectCard";

interface Project {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

const projects: Project[] = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce platform built with Next.js, TypeScript, and Stripe for payments.",
    imageUrl: "/assets/project1.jpg",
    link: "https://example.com/project1",
  },
  {
    title: "Task Management App",
    description:
      "A task management app with drag-and-drop functionality using React and Firebase.",
    imageUrl: "/assets/project2.jpg",
    link: "https://example.com/project2",
  },
  {
    title: "Personal Blog",
    description:
      "A personal blog website with Markdown support and SEO optimization.",
    imageUrl: "/assets/project3.jpg",
    link: "https://example.com/project3",
  },
  {
    title: "Personal Blog",
    description:
      "A personal blog website with Markdown support and SEO optimization.",
    imageUrl: "/assets/project1.jpg",
    link: "https://example.com/project3",
  },
  {
    title: "Personal Blog",
    description:
      "A personal blog website with Markdown support and SEO optimization.",
    imageUrl: "/assets/project3.jpg",
    link: "https://example.com/project3",
  },
  {
    title: "Personal Blog",
    description:
      "A personal blog website with Markdown support and SEO optimization.",
    imageUrl: "/assets/project2.jpg",
    link: "https://example.com/project3",
  },
];

export default function ProjectsPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">My Projects</h1>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <Link key={index} href={`/projects/${project.title}`} passHref>
            <ProjectCard {...project} />
          </Link>
        ))}
      </section>
    </div>
  );
}
