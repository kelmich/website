"use client";

import React from "react";
import { IconMail, IconSend, IconHeart } from "@tabler/icons-react";

function Socials() {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl dark:shadow-gray-900/20 p-8 border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4 shadow-lg">
          <IconMail className="text-white" size={28} />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Let&apos;s Connect
        </h3>
        <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
      </div>

      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 text-center">
        Have a question or want to collaborate? I&apos;d love to hear from you!
      </p>

      {/* Contact Button */}
      <a
        href="mailto:mail@kellermichael.com"
        className="group relative block w-full text-center py-4 px-6 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative flex items-center justify-center gap-2">
          <IconSend size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
          <span>Send Message</span>
        </div>
      </a>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center gap-1 text-sm text-gray-500 dark:text-gray-400">
          <span>Made with</span>
          <IconHeart size={16} className="text-red-500 animate-pulse" />
          <span>by Michael</span>
        </div>
      </div>
    </div>
  );
}

export default Socials;
