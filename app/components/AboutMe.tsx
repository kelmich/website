"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FiGithub, FiLinkedin } from "react-icons/fi";

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
      {/* Notification Toast */}
      <div
        className={`fixed top-4 right-4 z-50 transition-all duration-300 ${
          showNotification
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full"
        }`}
      >
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 max-w-sm border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
            Welcome
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            This website is still a work in progress, but have a look!
          </p>
        </div>
      </div>

      <div className="w-[340px] m-5">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-colors duration-300">
          <div className="relative h-[300px] w-full">
            <Image
              src="/images/me-frontal.jpeg"
              alt="Image of Michael Keller"
              width={340}
              height={300}
              className="object-cover"
              priority
            />
          </div>

          <div className="p-6">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                That's me
              </h2>
              <div className="flex gap-3">
                <a
                  href="https://github.com/kelmich"
                  title="Michael's Github"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <FiGithub size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/kelmich/"
                  title="Michael's LinkedIn"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <FiLinkedin size={20} />
                </a>
              </div>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
              I'm a student at ETH Zürich completing my Masters in Computer
              Science. My interests are in hard algorithmic problems and using
              computers to make my life easier.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutMe;
