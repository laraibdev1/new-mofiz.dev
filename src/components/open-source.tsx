"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink } from "lucide-react"

const contributions = [
  {
    id: 1,
    title: "Authentication System",
    description: "Implemented OAuth 2.0 authentication with multiple providers and JWT token management.",
    image: "/placeholder.svg?height=400&width=600",
    prLink: "https://github.com/mofyzy/forge/pull/123",
    demoLink: "https://mofyzy.com/features/auth",
  },
  {
    id: 2,
    title: "Real-time Collaboration",
    description: "Built a real-time collaboration feature using WebSockets for simultaneous editing.",
    image: "/placeholder.svg?height=400&width=600",
    prLink: "https://github.com/mofyzy/forge/pull/456",
    demoLink: "https://mofyzy.com/features/collaboration",
  },
  {
    id: 3,
    title: "Performance Optimization",
    description:
      "Reduced bundle size by 40% and improved page load times by implementing code splitting and lazy loading.",
    image: "/placeholder.svg?height=400&width=600",
    prLink: "https://github.com/mofyzy/forge/pull/789",
    demoLink: "https://mofyzy.com/features/performance",
  },
]

export default function OpenSource() {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <img src="/placeholder.svg?height=40&width=40" alt="Mofyzy Logo" className="w-8 h-8" />
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-4">Mofyzy Forge</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My contributions to the Mofyzy open-source ecosystem, helping build tools that developers love.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {contributions.map((contribution, index) => (
            <motion.div
              key={contribution.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={contribution.image || "/placeholder.svg"}
                    alt={contribution.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{contribution.title}</h3>
                  <p className="text-muted-foreground mb-4">{contribution.description}</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href={contribution.prLink} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        View PR
                      </a>
                    </Button>
                    <Button size="sm" variant="secondary" asChild>
                      <a href={contribution.demoLink} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Demo
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

