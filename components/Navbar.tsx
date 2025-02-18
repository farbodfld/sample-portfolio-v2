"use client"; // Required for client-side interactivity

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-4 bg-white shadow-md dark:bg-gray-800 transition-colors duration-300 rounded-b-[40px]">
      <div className="container mx-auto flex justify-between items-center">
        {/* Profile Picture and Text */}
        <Link href="/" className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full overflow-hidden shadow-md transition-transform duration-300 hover:scale-110">
            <Image
              src="/assets/profile.jpg" // Path to your profile picture
              alt="Profile Picture"
              width={48} // Width in pixels
              height={48} // Height in pixels
              className="object-cover w-full h-full"
            />
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Farbod Fooladi
          </h1>
        </Link>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            {isOpen ? (
              <FaTimes className="text-gray-900 dark:text-gray-100" size={24} />
            ) : (
              <FaBars className="text-gray-900 dark:text-gray-100" size={24} />
            )}
          </button>
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-4 items-center">
          <li>
            <Link
              href="/"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/projects"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
            >
              Contact
            </Link>
          </li>
          <li>
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="focus:outline-none"
            >
              {theme === "light" ? (
                <FaMoon
                  className="text-gray-900 dark:text-gray-100"
                  size={24}
                />
              ) : (
                <FaSun className="text-gray-900 dark:text-gray-100" size={24} />
              )}
            </button>
          </li>
        </ul>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 right-0 bottom-0 w-64 bg-white dark:bg-gray-800 shadow-lg z-50 p-4"
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 focus:outline-none"
          >
            <FaTimes className="text-gray-900 dark:text-gray-100" size={24} />
          </button>
          <ul className="space-y-4 mt-12">
            <li>
              <Link
                href="/"
                className="block text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="block text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/projects"
                className="block text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="block text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  setTheme(theme === "light" ? "dark" : "light");
                  setIsOpen(false);
                }}
                className="focus:outline-none w-full text-left"
              >
                {theme === "light" ? (
                  <FaMoon
                    className="text-gray-900 dark:text-gray-100"
                    size={24}
                  />
                ) : (
                  <FaSun
                    className="text-gray-900 dark:text-gray-100"
                    size={24}
                  />
                )}
              </button>
            </li>
          </ul>
        </motion.div>
      )}
    </nav>
  );
}
