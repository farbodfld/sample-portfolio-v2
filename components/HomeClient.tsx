"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Profile, Project } from "@/lib/types";

export default function HomeClient({ profile, projects }: { profile: Profile | null, projects: Project[] }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-16"
    >
      <section
        className="flex flex-col md:flex-row items-center justify-center min-h-screen p-8 md:p-16 bg-cover bg-center relative dark:bg-gray-800"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4)), url('/assets/hero-banner.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        <div className="relative z-10 text-center md:text-left mx-auto max-w-5xl">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            {profile?.full_name ? `Hi, I’m ${profile.full_name}` : 'Welcome to my Portfolio'}
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-200 mb-6 max-w-prose whitespace-pre-wrap"
          >
            {profile?.headline || 'A passionate developer specializing in building modern web applications.'}
          </motion.p>
          <div className="flex flex-wrap gap-4">
            {(profile?.ctas || []).length > 0 ? (
              profile?.ctas?.map((cta, index) => (
                <motion.a
                  key={index}
                  href={cta.link}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + (index * 0.1) }}
                  className={`${
                    index === 0 
                      ? "bg-blue-600 text-white hover:bg-blue-700" 
                      : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
                  } px-6 py-3 rounded-md font-medium transition-colors duration-300`}
                >
                  {cta.text}
                </motion.a>
              ))
            ) : (
              <motion.a
                href="#projects"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors duration-300"
              >
                View My Projects
              </motion.a>
            )}
          </div>
        </div>
      </section>

      <section className="p-8 md:p-16 dark:bg-gray-800 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center dark:text-white">
          Featured Projects
        </h2>
        
        {projects.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-10">No featured projects yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + (i % 2) * 0.2 }}
                className="bg-white rounded-lg shadow-md overflow-hidden dark:bg-gray-700 flex flex-col group"
              >
                {project.image_url ? (
                  <div className="relative w-full h-72 md:h-96 bg-gray-100 dark:bg-gray-800">
                    <Image
                      src={project.image_url}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <div className="w-full h-72 md:h-96 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <span className="text-gray-400">No Image</span>
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold dark:text-white">{project.title}</h3>
                  <p className="mt-2 text-gray-700 dark:text-gray-300 flex-1 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="mt-4">
                    <Link
                      href={project.live_url || `/projects/${project.slug}`}
                      className="inline-block text-blue-600 hover:underline dark:text-blue-400 font-medium"
                      {...(project.live_url ? { target: "_blank", rel: "noreferrer" } : {})}
                    >
                      View Project
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <section className="p-8 md:p-16 bg-gray-50 dark:bg-gray-800/80">
        <h2 className="text-3xl font-bold mb-8 text-center dark:text-white">
          About Me
        </h2>
        <div className="max-w-3xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-700 mb-8 dark:text-gray-300 whitespace-pre-wrap text-lg leading-relaxed"
          >
            {profile?.short_bio || 'I am a passionate developer with experience in building modern web applications.'}
          </motion.p>
          <motion.a
            href="/about"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors duration-300 shadow-sm"
          >
            Learn More About Me
          </motion.a>
        </div>
      </section>

      <section className="p-8 md:p-20 bg-blue-600 text-white text-center dark:bg-gray-900">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold mb-6"
        >
          Let’s Build Something Together
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xl mb-8 text-blue-100 font-medium"
        >
          I’m always open to new opportunities and collaborations. Feel free to
          reach out!
        </motion.p>
        <motion.a
          href="/contact"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="inline-block bg-white text-blue-600 px-8 py-4 rounded-md font-bold hover:bg-gray-100 transition-colors duration-300 shadow-lg"
        >
          Contact Me
        </motion.a>
      </section>
    </motion.div>
  );
}
