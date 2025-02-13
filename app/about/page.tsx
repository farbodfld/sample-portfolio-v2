"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="flex flex-col items-center p-7 pt-24 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50" // Add padding to the top and dark mode styles
    >
      {/* Header */}
      <h1 className="text-4xl font-bold mb-4 text-center">
        Hi, I’m [Your Name]
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 text-center px-[476] mb-8">
        A passionate developer specializing in building modern web applications
        with Next.js, TypeScript, and Tailwind CSS.
      </p>

      {/* Profile Picture and Bio */}
      <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
        <div className="w-48 h-48 rounded-full overflow-hidden shadow-md transition-transform duration-300 hover:scale-105">
          <Image
            src="/assets/profile.jpg"
            alt="Profile Picture"
            width={192}
            height={192}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="text-gray-700 dark:text-gray-300 max-w-prose">
          <p className="mb-4">
            Hi! I’m [Your Name], a passionate developer with experience in
            building web applications using modern technologies like Next.js,
            TypeScript, and Tailwind CSS.
          </p>
          <p>
            I enjoy creating user-friendly and responsive websites that solve
            real-world problems. When I’m not coding, you can find me exploring
            new technologies, reading, or working on personal projects.
          </p>
        </div>
      </div>

      {/* Skills */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4 text-center">My Skills</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
            Next.js
          </div>
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
            TypeScript
          </div>
          <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium">
            Tailwind CSS
          </div>
          <div className="bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-medium">
            React
          </div>
          <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
            Node.js
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4 text-center">My Journey</h2>
        <div className="relative border-l border-gray-200 dark:border-gray-700">
          <div className="ml-6">
            <div className="mb-8">
              <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-2 top-2"></div>
              <h3 className="text-xl font-semibold mb-1">Frontend Developer</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Company XYZ | Jan 2022 - Present
              </p>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                Developed responsive web applications using Next.js and Tailwind
                CSS.
              </p>
            </div>
            <div className="mb-8">
              <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-2 top-2"></div>
              <h3 className="text-xl font-semibold mb-1">
                Freelance Developer
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Self-Employed | Jun 2020 - Dec 2021
              </p>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                Built custom websites and web apps for clients using React and
                Firebase.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call-to-Action */}
      <div className="mt-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Let’s Work Together</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          I’m always open to new opportunities and collaborations. Feel free to
          reach out!
        </p>
        <a
          href="/contact"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors duration-300"
        >
          Contact Me
        </a>
      </div>
    </motion.div>
  );
}
