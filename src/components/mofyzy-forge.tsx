"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import SectionHeading from "./section-heading"

// Sample contributions data
const contributions = [
  {
    id: 1,
    title: "Ecommerce App",
    description: "An Ecommerce App with Clerk Authentication Using Next js .",
    image: "/mofEcom.png",
    prLink: "https://mofyzyforge-rho.vercel.app/templates/ecommerce-app/preview",
  },
  {
    id: 2,
    title: "Frontend Chat App ",
    description: "A Full Stack Chat App Made With Next js .",
    image: "/chatr.png",
    prLink: "https://mofyzyforge-rho.vercel.app/templates/chat-frontend/preview",
  },
  {
    id: 3,
    title: "Backedn Chat App",
    description: "Mofyzy Chat App Backend Made Using Flask .",
    image: "/chat-back.png",
    prLink: "https://mofyzyforge-rho.vercel.app/templates/chat-backend/preview",
  },
  {
    id: 4,
    title: "Quiz App",
    description: "A Full Stack Quiz App Made with Next js And FLask.",
    image: "/quiz.png",
    prLink: "https://mofyzyforge-rho.vercel.app/templates/quiz-app/preview",
  },
]

export default function MofyzySection() {
  return (
    <section id="mofyzy" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Mofyzy Forge Contributions"
          subtitle="My open source contributions to the Mofyzy Forge project, helping build the future of developer tools."
        />

        <div className="flex flex-col items-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="w-32 h-32 mb-6"
          >
            <img
              src="/placeholder.svg?height=128&width=128"
              alt="Mofyzy Logo"
              className="w-full h-full object-contain"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center max-w-2xl mb-8 text-muted-foreground"
          >
            Mofyzy Forge is an open-source platform that empowers developers to build, test, and deploy applications
            with ease. I've been an active contributor since 2022, focusing on performance optimization and user
            experience improvements.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button asChild variant="outline" className="gap-2 bg-primary text-primary-foreground ">
              <a href="https://mofyzyforge-rho.vercel.app/" target="_blank" rel="noopener noreferrer">
                <Github size={18} />
                View Library
              </a>
            </Button>
          </motion.div>
        </div>

        <div className="space-y-16">
          {contributions.map((contribution, index) => (
            <motion.div
              key={contribution.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 items-center`}
            >
              <div className="flex-1">
                <motion.div
                  className="rounded-xl overflow-hidden shadow-lg border border-border/50 bg-white backdrop-blur-sm"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <img
                    src={contribution.image || "/placeholder.svg"}
                    alt={contribution.title}
                    className="w-full h-auto"
                  />
                </motion.div>
              </div>

              <div className="flex-1 space-y-4">
                <h3 className="text-2xl font-bold">{contribution.title}</h3>
                <p className="text-muted-foreground">{contribution.description}</p>
                <Button asChild variant="link" className="p-0 gap-2 text-primary">
                  <a href={contribution.prLink} target="_blank" rel="noopener noreferrer">
                    View In Library
                    <ExternalLink size={16} />
                  </a>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

