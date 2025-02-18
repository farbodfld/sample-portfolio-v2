"use client"; // Required for client-side interactivity

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Project {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

const projects: Project[] = [
  {
    title: "Portfolio Website",
    description:
      "This is a Next.js project bootstrapped with create-next-app.This project serves as a personal portfolio website to showcase your projects, skills, and contact information.",
    imageUrl: "/assets/project5.jpg",
    link: "https://example.com/project5",
  },
  {
    title: "Coursera Recommender System",
    description:
      "At this project we implemented a course-recommendation system for coursera web-site. It uses collaborative filtering to recommend courses to users.",
    imageUrl: "/assets/project4.jpg",
    link: "https://example.com/project4",
  },
  {
    title: "Informed and Uninformed Search Algorithms",
    description:
      "This program contains three method (A*, BFS, DFS) and also pygame for finding the shortest path from start point to end point by using these methodes.",
    imageUrl: "/assets/project3.jpg",
    link: "https://example.com/project3",
  },
  {
    title: "Hive Game",
    description:
      "It simiulate the Hive board game which has two player. The player which siege the queen pawn of second player is wiiner.",
    imageUrl: "/assets/project1.jpg",
    link: "https://example.com/project1",
  },
  {
    title: "Kill or Die - UnityProject",
    description:
      "A personal blog website with Markdown support and SEO optimization.",
    imageUrl: "/assets/project2.jpg",
    link: "https://example.com/project2",
  },
  {
    title: "Java Projects",
    description:
      "You can find all of my Java projects in this repository. For more informtion visit my github page.",
    imageUrl: "/assets/project6.jpg",
    link: "https://example.com/project6",
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
    <div className="min-h-screen pt-24 p-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50 transition-colors duration-300">
      <h1 className="text-3xl font-bold mb-8">{project.title}</h1>
      <Image
        src={project.imageUrl}
        alt={project.title}
        width={500}
        height={400}
        className="w-full h-[35rem] object-contain mb-8"
      />
      <p className="text-lg mb-4">{project.description}</p>
    </div>
  );
}
