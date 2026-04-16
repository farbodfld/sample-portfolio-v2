"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Profile, Skill, Experience } from "@/lib/types";

export default function AboutClient({ 
  profile, 
  skills, 
  experiences 
}: { 
  profile: Profile | null, 
  skills: Skill[], 
  experiences: Experience[] 
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="flex flex-col items-center p-7 pt-24 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50 min-h-screen"
    >
      <h1 className="text-4xl font-bold mb-4 text-center">
        Hi, I’m {profile?.full_name || 'Farbod Fooladi'}
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 text-center mb-12 italic font-bold">
        {profile?.headline || 'Passionate & Skilled Developer'}
      </p>

      {profile?.image_url && (
        <div className="w-80 h-80 mb-12 rounded-full overflow-hidden shadow-md transition-transform duration-300 hover:scale-105 relative">
          <Image
            src={profile.image_url}
            alt="Profile Picture"
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
        <div className="text-gray-700 dark:text-gray-300 max-w-prose whitespace-pre-wrap leading-relaxed text-lg">
          {profile?.short_bio || 'I am a passionate developer.'}
        </div>
      </div>

      {skills.length > 0 && (
        <div className="mt-16 mb-12 w-full max-w-4xl">
          <h2 className="text-2xl font-bold mb-8 text-center">My Skills</h2>
          
          <div className="flex flex-wrap justify-center gap-4">
            {skills.map((skill, index) => {
              const colors = [
                'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
                'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
                'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
                'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
                'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
                'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
                'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
                'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
                'bg-lime-100 text-lime-800 dark:bg-lime-900/30 dark:text-lime-300'
              ]
              const colorClass = colors[index % colors.length]
              
              return (
                <div key={skill.id} className={`${colorClass} px-5 py-2.5 rounded-full text-sm font-medium shadow-sm transition-transform hover:scale-105`}>
                  {skill.name}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {experiences.length > 0 && (
        <div className="w-full max-w-4xl mt-12 mb-12">
          <h2 className="text-2xl font-bold mb-10 text-center">My Journey</h2>
          <div className="relative border-l-2 border-gray-200 dark:border-gray-700 ml-4 md:ml-0 md:pl-8 py-2">
            {experiences.map((exp) => (
              <div key={exp.id} className="mb-10 ml-6 md:ml-4 relative">
                <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-[35px] md:-left-[43px] top-1.5 shadow-sm border-2 border-white dark:border-gray-900"></div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 tracking-tight">{exp.role}</h3>
                <p className="text-sm text-blue-600 dark:text-blue-400 font-semibold mb-3">
                  {exp.company} <span className="text-gray-400 mx-2 font-normal">|</span> <span className="text-gray-500 dark:text-gray-400 font-medium">{exp.start_date} - {exp.end_date || 'Present'}</span>
                </p>
                {exp.description && (
                  <p className="mt-2 text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-16 mb-20 text-center">
        <h2 className="text-3xl font-bold mb-6">Let’s Work Together</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
          I’m always open to new opportunities and collaborations.
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          Feel free to reach out!
        </p>
            <div className="flex flex-wrap gap-4 justify-center">
              {(profile?.ctas || []).length > 0 ? (
                profile?.ctas?.map((cta, index) => (
                  <motion.a
                    key={index}
                    href={cta.link}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`${
                      index === 0 
                        ? "bg-blue-600 text-white hover:bg-blue-700" 
                        : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
                    } px-8 py-3 rounded-full font-bold shadow-lg transition-all`}
                  >
                    {cta.text}
                  </motion.a>
                ))
              ) : (
                <motion.a 
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-blue-700 transition-all"
                >
                  Contact Me
                </motion.a>
              )}
            </div>
      </div>
    </motion.div>
  );
}
