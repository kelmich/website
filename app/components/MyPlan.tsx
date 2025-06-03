'use client'

import React from 'react'
import { TbSchool, TbBriefcase } from 'react-icons/tb'
import { FiTool } from 'react-icons/fi'
import Socials from './Socials'

interface TimelineItemProps {
  title: string
  icon: React.ReactNode
  description: string
  isActive?: boolean
  isLast?: boolean
}

function TimelineItem({ title, icon, description, isActive = false, isLast = false }: TimelineItemProps) {
  return (
    <div className="relative flex gap-4">
      {/* Icon and Line */}
      <div className="flex flex-col items-center">
        <div className={`
          w-8 h-8 rounded-full flex items-center justify-center
          ${isActive ? 'bg-blue-500 text-white' : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300'}
          transition-colors duration-300
        `}>
          {icon}
        </div>
        {!isLast && (
          <div className="w-[2px] h-20 bg-gray-300 dark:bg-gray-600 mt-2" />
        )}
      </div>
      
      {/* Content */}
      <div className="flex-1 pb-8">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </div>
    </div>
  )
}

function MyPlan() {
  const timelineItems = [
    {
      title: "ETH Zürich",
      icon: <TbSchool size={20} />,
      description: "BSc Computer Science",
      isActive: false,
    },
    {
      title: "DeepJudge AG",
      icon: <TbBriefcase size={20} />,
      description: "I currently work part time at DeepJudge, an ETH spinoff, as a Software Engineer.",
      isActive: true,
    },
    {
      title: "Experience",
      icon: <FiTool size={20} />,
      description: "I have experience building modern web applications.",
      isActive: false,
    },
  ]

  return (
    <div className="w-[300px]">
      <div className="mb-8">
        {timelineItems.map((item, index) => {
          const { title, icon, description, isActive } = item
          return (
            <TimelineItem
              key={index}
              title={title}
              icon={icon}
              description={description}
              isActive={isActive}
              isLast={index === timelineItems.length - 1}
            />
          )
        })}
      </div>
      <Socials />
    </div>
  )
}

export default MyPlan