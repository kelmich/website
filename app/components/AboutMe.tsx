"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IconBrandGithub, IconBrandLinkedin, IconSparkles } from "@tabler/icons-react";

function AboutMe() {
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 4000);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Enhanced Notification Toast */}
      <div
        className={`fixed top-4 right-4 z-50 transition-all duration-500 ${
          showNotification
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 -translate-y-full scale-95"
        }`}
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-4 max-w-sm border border-gray-100 dark:border-gray-700 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            <IconSparkles className="text-blue-500" size={18} />
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Welcome!
            </h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Thanks for visiting my portfolio
          </p>
        </div>
      </div>

      <div className="w-full max-w-sm">
        <div className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-gray-900/20 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] border border-gray-100 dark:border-gray-700">
          {/* Decorative gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 dark:from-blue-400/5 dark:to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Image Section */}
          <div className="relative h-80 w-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
            <Image
              src="/images/me-frontal.jpeg"
              alt="Image of Michael Keller"
              width={400}
              height={320}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
              priority
            />
          </div>

          {/* Content Section */}
          <div className="relative p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  About Me
                </h2>
                <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              </div>
              <div className="flex gap-3">
                <a
                  href="https://github.com/kelmich"
                  title="Michael's Github"
                  className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-white hover:bg-gray-900 dark:hover:text-black dark:hover:bg-white transition-all duration-200 transform hover:scale-110"
                >
                  <IconBrandGithub size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/kelmich/"
                  title="Michael's LinkedIn"
                  className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-white hover:bg-blue-600 dark:hover:text-white dark:hover:bg-blue-600 transition-all duration-200 transform hover:scale-110"
                >
                  <IconBrandLinkedin size={20} />
                </a>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              I&apos;m a student at <span className="font-semibold text-blue-600 dark:text-blue-400">ETH Zürich</span> completing my Masters in Computer Science. My interests are in hard algorithmic problems and using computers to make my life easier.
            </p>

            {/* Skills badges */}
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full">
                Computer Science
              </span>
              <span className="px-3 py-1 text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full">
                Algorithms
              </span>
              <span className="px-3 py-1 text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full">
                Software Engineering
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutMe;
