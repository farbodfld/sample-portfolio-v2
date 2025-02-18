"use client"; // Mark this file as a client component

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  // const { theme, setTheme } = useTheme(); // Access the theme and toggle function

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-16" // Add padding to the top
    >
      {/* Hero Section */}
      <section
        className="flex flex-col md:flex-row items-center justify-center min-h-screen p-8 md:p-16 bg-cover bg-center relative dark:bg-gray-800"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4)), url('/assets/hero-banner.jpg')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Content */}
        <div className="relative z-10 text-center md:text-left">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Hi, I’m Farbod Fooladi
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-200 mb-6 max-w-prose"
          >
            A passionate developer specializing in building modern web
            applications with Next.js, TypeScript, and Tailwind CSS and other
            technologies.
          </motion.p>
          <motion.a
            href="/projects"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors duration-300"
          >
            View My Projects
          </motion.a>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="p-8 md:p-16 dark:bg-gray-800">
        <h2 className="text-3xl font-bold mb-8 text-center dark:text-white">
          Featured Projects on my GitHub
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Example Project Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-lg shadow-md overflow-hidden dark:bg-gray-700"
          >
            <Image
              src="/assets/project1.jpg"
              alt="Project 1"
              className="w-full h-96 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold dark:text-white">Hive Game</h3>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                It simiulate the Hive board game which has two player. The
                player which siege the queen pawn of second player is wiiner.
              </p>
              <Link
                href="https://github.com/farbodfld/Hive_Game"
                className="mt-4 inline-block text-blue-600 hover:underline dark:text-blue-400"
                target="_blank"
              >
                View Project
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-lg shadow-md overflow-hidden dark:bg-gray-700"
          >
            <Image
              src="/assets/project2.jpg"
              alt="Project 2"
              className="w-full h-96 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold dark:text-white">
                Kill or Die - UnityProject
              </h3>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                Simple action game with tank and enemies.
              </p>
              <Link
                href="https://github.com/farbodfld/Kill_Or_Die--UnityProject"
                className="mt-4 inline-block text-blue-600 hover:underline dark:text-blue-400"
                target="_blank"
              >
                View Project
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-lg shadow-md overflow-hidden dark:bg-gray-700"
          >
            <Image
              src="/assets/project3.jpg"
              alt="Project 3"
              className="w-full h-72 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold dark:text-white">
                Informed and Uninformed Search Algorithms
              </h3>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                This program contains three method (A*, BFS, DFS) and also
                pygame for finding the shortest path from start point to end
                point by using these methodes.
              </p>
              <Link
                href="https://github.com/farbodfld/Informed-and-Uninformed-Search"
                className="mt-4 inline-block text-blue-600 hover:underline dark:text-blue-400"
                target="_blank"
              >
                View Project
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-lg shadow-md overflow-hidden dark:bg-gray-700"
          >
            <Image
              src="/assets/project4.jpg"
              alt="Project 4"
              className="w-full h-96 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold dark:text-white">
                Coursera Recommender System
              </h3>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                At this project we implemented a course-recommendation system
                for coursera web-site.
              </p>
              <Link
                href="/projects/ecommerce"
                className="mt-4 inline-block text-blue-600 hover:underline dark:text-blue-400"
                target="_blank"
              >
                View Project
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-lg shadow-md overflow-hidden dark:bg-gray-700"
          >
            <Image
              src="/assets/project5.jpg"
              alt="Project 2"
              className="w-full h-96 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold dark:text-white">
                Portfolio Web Application
              </h3>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                This is a Next.js project bootstrapped with create-next-app.
                This project serves as a personal portfolio website to showcase
                your projects, skills, and contact information.
              </p>
              <Link
                href="/projects/task-management"
                className="mt-4 inline-block text-blue-600 hover:underline dark:text-blue-400"
                target="_blank"
              >
                View Project
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Me */}
      <section className="p-8 md:p-16 bg-gray-50 dark:bg-gray-800">
        <h2 className="text-3xl font-bold mb-8 text-center dark:text-white">
          About Me
        </h2>
        <div className="max-w-3xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-700 mb-6 dark:text-gray-300"
          >
            I am a passionate developer with experience in building modern web
            applications using Next.js, TypeScript, and Tailwind CSS. I love
            solving real-world problems and crafting intuitive, user-friendly
            interfaces.
          </motion.p>
          <motion.a
            href="/about"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors duration-300"
          >
            Learn More About Me
          </motion.a>
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="p-8 md:p-16 bg-blue-600 text-white text-center dark:bg-gray-900">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl font-bold mb-4"
        >
          Let’s Build Something Together
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-lg mb-6"
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
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors duration-300"
        >
          Contact Me
        </motion.a>
      </section>
    </motion.div>
  );
}
