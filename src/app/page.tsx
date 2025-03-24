'use client'

import React, { useState, useEffect } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import * as RadixTooltip from '@radix-ui/react-tooltip'
// import { Slot } from "@radix-ui/react-slot"
// import { cva, type VariantProps } from "class-variance-authority"
// import * as ProgressPrimitive from "@radix-ui/react-progress"

// import LampDemo from "@/components/ui/lamp"
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
// import Timeline from '@/components/Timeline'
import { CardFooter } from '@/components/ui/card'
import Contact from '@/components/Contact'
import { Navbar } from '@/components/navbar'
import Hero from '@/components/hero'
import MofyzySection from '@/components/mofyzy-forge'
// import AboutMe from '@/components/about'// 
// import About from '@/components/About'
// import { MacbookScroll } from '@/components/ui/macbook-scroll'
import About from '@/components/About'
import Experience from '@/components/Experiences'


// // Main Page Component
export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 text-slate-100">
      <Navbar />
      {/* <LampDemo /> */}
      <Hero />
      {/* <About /> */}
      <main className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Projects />
      <MofyzySection/>
    </main>      
    <Skills />
      <Experience />
      <Contact />
      <CardFooter />
    </main>
  )
}

