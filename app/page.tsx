import React from "react";
import AboutMe from "./components/AboutMe";
import MyPlan from "./components/MyPlan";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-slate-900 dark:to-blue-950 transition-all duration-300">
      {/* Hero Section */}
      <div className="relative pt-20 pb-16">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 dark:from-blue-400/5 dark:to-purple-400/5"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4">
          <div className="mb-6">
            <h1 className="text-5xl md:text-7xl font-bold font-hind-madurai bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent mb-4">
              Michael Keller
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
            Computer Science Student & Software Engineer
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="flex justify-center">
            <AboutMe />
          </div>

          <div className="flex justify-center">
            <MyPlan />
          </div>
        </div>
      </div>
    </div>
  );
}
