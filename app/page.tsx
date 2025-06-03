import React from "react";
import { ThemeToggle } from "./components/ThemeToggle";

export default function Home() {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex flex-col items-center justify-center transition-colors duration-300">
      <ThemeToggle />
      <main className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4 font-hind-madurai">
          Hey! I&apos;m Michael
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
          Welcome to my personal portfolio website
        </p>
      </main>
    </div>
  );
}
