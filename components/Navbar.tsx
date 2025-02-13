"use client"; // Required for client-side interactivity

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-4 bg-white shadow-md dark:bg-gray-800 transition-colors duration-300 rounded-b-[40px]">
      <div className="container mx-auto flex justify-between items-center">
        {/* Profile Picture and Text */}
        <a href="/" className="flex items-center space-x-4">
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
            My Portfolio
          </h1>
        </a>

        {/* Navigation Links */}
        <ul className="flex space-x-4 items-center">
          <li>
            <a
              href="/"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/about"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="/projects"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
            >
              Projects
            </a>
          </li>
          <li>
            <a
              href="/contact"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
            >
              Contact
            </a>
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
    </nav>
  );
}
