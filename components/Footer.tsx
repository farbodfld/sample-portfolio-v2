import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import type { SiteSettings } from "@/lib/types";

export default function Footer({ settings }: { settings?: SiteSettings | null }) {
  return (
    <footer className="p-10 bg-white dark:bg-gray-800 border-t dark:border-gray-700">
      <div className="container mx-auto flex flex-col items-center space-y-6">
        <div className="flex space-x-6">
          {settings?.github_url && (
            <a href={settings.github_url} target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">
              <FaGithub size={24} />
            </a>
          )}
          {settings?.linkedin_url && (
            <a href={settings.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">
              <FaLinkedin size={24} />
            </a>
          )}
          {settings?.email && (
            <a href={`mailto:${settings.email}`} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">
              <FaEnvelope size={24} />
            </a>
          )}
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} {settings?.meta_title || "Farbod Fooladi"}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
