"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TimelineItem {
  date: string
  title: string
  description: string
  details: string[]
}

const experienceData: TimelineItem[] = [
  {
    date: "Month 1",
    title: "Getting Started",
    description: "Started freelancing journey. Set up business structure, created portfolio website, and landed first project.",
    details: [
      "Set up freelance business structure",
      "Created a portfolio website using React and Tailwind CSS",
      "Landed first project: A small business website redesign"
    ]
  },
  {
    date: "Month 2",
    title: "Expanding Skills",
    description: "Focused on skill development. Completed an advanced React course, started a tech blog, and worked on an e-commerce platform.",
    details: [
      "Completed an online course on advanced React techniques",
      "Started a blog to share learning experiences",
      "Worked on an e-commerce platform using Next.js and Stripe"
    ]
  },
  {
    date: "Month 3",
    title: "Growing Network",
    description: "Expanded professional network. Attended local tech meetups, collaborated on an open-source project, and secured a long-term contract.",
    details: [
      "Attended local tech meetups and made valuable connections",
      "Collaborated on an open-source project",
      "Secured a long-term contract for a SaaS application"
    ]
  }
]

const ExperienceTimeline: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<TimelineItem | null>(null)

  return (
    <section className="py-16 bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen text-white">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-12 text-center text-purple-500"
        >
          My Freelance Journey
        </motion.h2>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-purple-500"></div>
          
          {experienceData.map((item, index) => (
            <TimelineItem 
              key={index} 
              item={item} 
              index={index} 
              onClick={() => setSelectedItem(item)}
            />
          ))}
        </div>
      </div>
      <AnimatePresence>
        {selectedItem && (
          <Modal item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}

const TimelineItem: React.FC<{ 
  item: TimelineItem; 
  index: number;
  onClick: () => void;
}> = ({ item, index, onClick }) => {
  return (
    <motion.div 
      className={`mb-8 flex justify-between items-center w-full ${
        index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'
      }`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
    >
      <div className="order-1 w-5/12"></div>
      <div className="z-20 flex items-center order-1 bg-purple-500 shadow-xl w-8 h-8 rounded-full">
        <h1 className="mx-auto font-semibold text-lg text-white">{index + 1}</h1>
      </div>
      <motion.div 
        className="order-1 bg-gray-800 rounded-lg shadow-xl w-5/12 px-6 py-4 cursor-pointer"
        whileHover={{ scale: 1.03, boxShadow: "0 0 15px rgba(139, 92, 246, 0.3)" }}
        transition={{ type: "spring", stiffness: 300 }}
        onClick={onClick}
      >
        <h3 className="mb-3 font-bold text-purple-400 text-xl">{item.date}: {item.title}</h3>
        <p className="text-sm leading-snug tracking-wide text-gray-300 text-opacity-100">{item.description}</p>
      </motion.div>
    </motion.div>
  )
}

const Modal: React.FC<{ item: TimelineItem; onClose: () => void }> = ({ item, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full"
      >
        <h2 className="text-2xl font-bold text-purple-400 mb-4">{item.date}: {item.title}</h2>
        <p className="text-gray-300 mb-4">{item.description}</p>
        <ul className="list-disc pl-5 mb-4">
          {item.details.map((detail, index) => (
            <li key={index} className="text-gray-300 mb-2">{detail}</li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="w-full bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 transition-colors duration-300"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  )
}

export default ExperienceTimeline

