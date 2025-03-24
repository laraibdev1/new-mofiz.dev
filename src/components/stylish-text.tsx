'use client'

import { motion } from 'framer-motion'

interface StylishTextProps {
  text: string
  className?: string
}

export function StylishText({ text, className = '' }: StylishTextProps) {
  return (
    <div className={`overflow-hidden ${className}`}>
      {text.split('').map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.05 }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </div>
  )
}

