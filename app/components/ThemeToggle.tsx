"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";
import { IconSun, IconMoon } from "@tabler/icons-react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="fixed top-6 right-6 p-4 rounded-2xl bg-white/80 dark:bg-gray-800/80 shadow-xl hover:shadow-2xl transition-all duration-300 text-gray-800 dark:text-gray-200 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 z-50"
        aria-label="Toggle theme"
      >
        <IconMoon size={22} />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="group fixed top-6 right-6 p-4 rounded-2xl bg-white/80 dark:bg-gray-800/80 shadow-xl hover:shadow-2xl transition-all duration-300 text-gray-800 dark:text-gray-200 hover:scale-110 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 z-50"
      aria-label="Toggle theme"
    >
      <div className="relative">
        {theme === "dark" ? (
          <IconSun 
            size={22} 
            className="text-yellow-500 transition-all duration-300 group-hover:rotate-180 group-hover:scale-110" 
          />
        ) : (
          <IconMoon 
            size={22} 
            className="text-blue-600 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110" 
          />
        )}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
      </div>
    </button>
  );
}
