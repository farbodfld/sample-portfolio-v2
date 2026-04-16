import Link from "next/link";
import ProjectCard from "../../components/ProjectCard";
import { getProjects, getSiteSettings } from "@/lib/data";

export const revalidate = 60

export default async function ProjectsPage() {
  const projects = await getProjects();
  const settings = await getSiteSettings();

  return (
    <div className="min-h-screen pt-24 p-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50 transition-colors duration-300 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-10 text-center md:text-left">My Projects</h1>
      
      {projects.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 dark:text-gray-400 text-lg">No projects to show yet. Check back later!</p>
        </div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Link key={project.id} href={project.live_url || `/projects/${project.slug}`} passHref target={project.live_url ? "_blank" : "_self"} rel={project.live_url ? "noreferrer" : ""}>
              <ProjectCard 
                title={project.title}
                description={project.description || ""}
                imageUrl={project.image_url || ""}
                link={project.live_url || `/projects/${project.slug}`}
              />
            </Link>
          ))}
        </section>
      )}

      <section className="text-center mt-20 mb-10">
        <p className="text-gray-700 dark:text-gray-100 italic font-bold">
          Visit my GitHub account for{" "}
        </p>
        <a
          href={settings?.github_url || "https://github.com/farbodfld"}
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors duration-300 my-6 shadow-sm"
          target="_blank"
          rel="noreferrer"
        >
          More projects on GitHub
        </a>
      </section>
    </div>
  );
}
