"use client";

import React from "react";
import { IconSchool, IconBriefcase, IconTool, IconArrowRight } from "@tabler/icons-react";
import Socials from "./Socials";

interface TimelineItemProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  isActive?: boolean;
  isLast?: boolean;
}

function TimelineItem({
  title,
  icon,
  description,
  isActive = false,
  isLast = false,
}: TimelineItemProps) {
  return (
    <div className="relative flex gap-6 group">
      {/* Icon and Line */}
      <div className="flex flex-col items-center">
        <div
          className={`
          relative w-12 h-12 rounded-full flex items-center justify-center z-10 transition-all duration-300 group-hover:scale-110
          ${
            isActive
              ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25"
              : "bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 shadow-md border-2 border-gray-200 dark:border-gray-600"
          }
        `}
        >
          {isActive && (
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse opacity-20"></div>
          )}
          <div className="relative z-10">
            {icon}
          </div>
        </div>
        {!isLast && (
          <div className={`w-0.5 h-24 mt-3 transition-colors duration-300 ${
            isActive 
              ? "bg-gradient-to-b from-blue-500 to-purple-500" 
              : "bg-gray-300 dark:bg-gray-600"
          }`} />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-12">
        <div className={`p-6 rounded-xl transition-all duration-300 group-hover:shadow-lg ${
          isActive
            ? "bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 border border-blue-200 dark:border-blue-800"
            : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
        }`}>
          <div className="flex items-center gap-2 mb-3">
            <h3 className={`font-bold text-lg ${
              isActive 
                ? "text-blue-700 dark:text-blue-300" 
                : "text-gray-900 dark:text-white"
            }`}>
              {title}
            </h3>
            {isActive && (
              <span className="px-2 py-1 text-xs font-medium bg-blue-500 text-white rounded-full animate-pulse">
                Current
              </span>
            )}
          </div>
          <p className={`text-sm leading-relaxed ${
            isActive
              ? "text-blue-600 dark:text-blue-400"
              : "text-gray-600 dark:text-gray-400"
          }`}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

function MyPlan() {
  const timelineItems = [
    {
      title: "ETH Zürich",
      icon: <IconSchool size={24} />,
      description: "Bachelor's in Computer Science completed. Currently pursuing Master's degree with focus on algorithms and computational complexity.",
      isActive: false,
    },
    {
      title: "DeepJudge AG",
      icon: <IconBriefcase size={24} />,
      description: "Currently working part-time as a Software Engineer at DeepJudge, an ETH spinoff developing innovative legal technology solutions.",
      isActive: true,
    },
    {
      title: "Technical Expertise",
      icon: <IconTool size={24} />,
      description: "Experienced in building modern web applications, working with algorithms, and developing scalable software solutions.",
      isActive: false,
    },
  ];

  return (
    <div className="w-full max-w-lg">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          My Journey
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
        <p className="text-gray-600 dark:text-gray-400 mt-3">
          Academic and professional milestones
        </p>
      </div>

      {/* Timeline */}
      <div className="mb-8">
        {timelineItems.map((item, index) => {
          const { title, icon, description, isActive } = item;
          return (
            <TimelineItem
              key={index}
              title={title}
              icon={icon}
              description={description}
              isActive={isActive}
              isLast={index === timelineItems.length - 1}
            />
          );
        })}
      </div>
      
      <Socials />
    </div>
  );
}

export default MyPlan;
