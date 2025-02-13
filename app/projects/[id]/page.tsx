"use client"; // Required for client-side interactivity

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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

export default function ProjectPage() {
  const pathname = usePathname();
  const [project, setProject] = useState<Project | undefined>(undefined);

  useEffect(() => {
    const projectId = decodeURIComponent(pathname.split("/").pop() || "");
    if (projectId) {
      const projectData = projects.find(
        (project) => project.title === projectId
      );
      setProject(projectData);
    }
  }, [pathname]);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8 pt-24">
      <h1 className="text-3xl font-bold mb-8">{project.title}</h1>
      <img
        src={project.imageUrl}
        alt={project.title}
        className="w-full h-[35rem] object-contain mb-8"
      />
      <p className="text-lg mb-4">{project.description}</p>
    </div>
  );
}
