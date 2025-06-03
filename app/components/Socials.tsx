'use client'

import React from 'react'

function Socials() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-8 transition-colors duration-300">
      <div className="mb-5">
        <h3 className="font-semibold text-gray-900 dark:text-white">
          Have a question?
        </h3>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
        Please feel free to shoot me an email
      </p>

      <a
        href="mailto:mail@kellermichael.com"
        className="block w-full text-center py-2 px-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-200"
      >
        Reach Out
      </a>
    </div>
  )
}

export default Socials