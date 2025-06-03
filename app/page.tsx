import React from "react";
import AboutMe from "./components/AboutMe";
import MyPlan from "./components/MyPlan";

export default function Home() {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex flex-col items-center justify-center transition-colors duration-300">
      <div className="flex items-center justify-center mt-5">
        <h1 className="text-4xl md:text-5xl font-bold font-hind-madurai text-gray-900 dark:text-white">
          Michael Keller
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-6xl w-full px-4">
        <div className="flex justify-center">
          <AboutMe />
        </div>

        <div className="flex items-stretch justify-center">
          <div className="flex flex-col items-left justify-between p-5 pt-10">
            <MyPlan />
          </div>
        </div>
      </div>
    </div>
  );
}
