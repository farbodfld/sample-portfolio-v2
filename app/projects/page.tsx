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
    title: "Portfolio Website",
    description:
      "This is a Next.js project bootstrapped with create-next-app. This project serves as a personal portfolio website to showcase your projects, skills, and contact information.",
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
      "Simple action game with tank and enemies. The player must kill all the enemies to win the game.",
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

export default function ProjectsPage() {
  return (
    <div className="min-h-screen pt-24 p-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50 transition-colors duration-300">
      <h1 className="text-3xl font-bold mb-8">My Projects</h1>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <Link key={index} href={`/projects/${project.title}`} passHref>
            <ProjectCard {...project} />
          </Link>
        ))}
      </section>

      <section className="text-center">
        <p className="mt-12 text-gray-700 dark:text-gray-100 italic font-bold">
          Visit my GitHub account for{" "}
        </p>
        <a
          href="https://github.com/farbodfld"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors duration-300 my-10"
          target="_blank"
        >
          More projects
        </a>
      </section>
    </div>
  );
}
