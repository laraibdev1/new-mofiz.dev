"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Code,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Moon,
  Sun,
  Terminal,
  Twitter,
  Zap,
  Briefcase,
  Award,
  Globe,
  Cpu,
  Layers,
  BookOpen,
} from "lucide-react"
import { useEffect, useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export default function PortfolioPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [projectCount, setProjectCount] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [activeSkill, setActiveSkill] = useState<string | null>(null)
  const [showEasterEgg, setShowEasterEgg] = useState(false)

  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"])

  // Handle initial mount
  useEffect(() => {
    setMounted(true)
    // Check system preference for dark mode
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkMode(true)
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
  }

  const handleSkillHover = (skill: string) => {
    setActiveSkill(skill)
  }

  const handleSkillLeave = () => {
    setActiveSkill(null)
  }

  const triggerEasterEgg = () => {
    setShowEasterEgg(true)
    setTimeout(() => setShowEasterEgg(false), 3000)
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  }

  if (!mounted) return null

  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "A full-stack e-commerce solution with payment integration, user authentication, and inventory management.",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      icon: <Layers className="h-10 w-10 text-emerald-500" />,
    },
    {
      title: "AI Content Generator",
      description: "An application that leverages machine learning to generate content for marketing and social media.",
      tags: ["Python", "TensorFlow", "Next.js", "OpenAI"],
      icon: <Cpu className="h-10 w-10 text-purple-500" />,
    },
    {
      title: "Portfolio Analytics",
      description: "Dashboard for tracking and visualizing portfolio performance with real-time data integration.",
      tags: ["TypeScript", "D3.js", "Firebase", "REST API"],
      icon: <Globe className="h-10 w-10 text-blue-500" />,
    },
  ]

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`} ref={ref}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background/0 opacity-60 dark:from-primary/10 dark:to-background/0 pointer-events-none z-0"
        style={{ y: backgroundY }}
      />

      <div className="relative bg-background text-foreground min-h-screen transition-all duration-300 z-10">
        {showEasterEgg && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 0] }}
            transition={{ duration: 3 }}
          >
            <div className="text-9xl">✨</div>
          </motion.div>
        )}

        <motion.div
          className="max-w-5xl mx-auto px-6 py-12 md:py-20"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <header className="flex justify-between items-center mb-16">
            <motion.h1
              className="text-3xl font-bold relative group"
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              onClick={triggerEasterEgg}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-violet-600 font-serif">
                M
              </span>
              <span className="font-serif">ohtsham</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-violet-600 group-hover:w-full transition-all duration-300"></span>
            </motion.h1>
            <motion.div
              variants={itemVariants}
              whileHover={{ rotate: darkMode ? -15 : 15, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                variant="outline"
                size="icon"
                onClick={toggleDarkMode}
                className="rounded-full border-primary/20 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
              >
                {darkMode ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5 text-slate-700" />}
              </Button>
            </motion.div>
          </header>

          <main className="space-y-24">
            <motion.section className="space-y-8" variants={itemVariants}>
              <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12">
                <motion.div
                  className="w-28 h-28 rounded-full bg-gradient-to-r from-primary to-violet-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg"
                  whileHover={{ scale: 1.05, rotate: 3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  MM
                </motion.div>
                <div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80 font-serif">
                    Mohammad Mohtsham Mofiz
                  </h1>
                  <p className="text-xl text-muted-foreground mt-3 font-light tracking-wide">
                    Full-Stack Developer & Creative Problem Solver
                  </p>
                </div>
              </div>

              <div className="prose dark:prose-invert max-w-none text-lg">
                <p className="leading-relaxed text-muted-foreground">
                  Welcome to my digital portfolio. I'm a passionate developer focused on creating elegant, efficient
                  solutions to complex problems. With a keen eye for detail and a commitment to clean, maintainable
                  code, I transform ideas into reality.
                </p>
                <p className="leading-relaxed text-muted-foreground">
                  When I'm not crafting code, you'll find me exploring new technologies, contributing to open-source
                  projects, and continuously expanding my knowledge in this ever-evolving field.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 mt-6">
                <Button variant="default" className="gap-2 rounded-full">
                  <Mail className="h-4 w-4" />
                  Contact Me
                </Button>
                <Button variant="outline" className="gap-2 rounded-full">
                  <Download className="h-4 w-4" />
                  Download CV
                </Button>
              </div>

              <motion.div className="flex flex-wrap gap-2 mt-8" variants={containerVariants}>
                {["JavaScript", "React", "Node.js", "TypeScript", "Next.js", "UI/UX"].map((skill) => (
                  <motion.div key={skill} variants={itemVariants}>
                    <Badge
                      variant="outline"
                      className={`text-sm py-1.5 px-3 transition-all duration-300 ${
                        activeSkill === skill
                          ? "bg-primary text-primary-foreground"
                          : "bg-primary/5 text-primary hover:bg-primary/10"
                      }`}
                      onMouseEnter={() => handleSkillHover(skill)}
                      onMouseLeave={handleSkillLeave}
                    >
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>

            <motion.div variants={itemVariants}>
              <Tabs defaultValue="skills" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-12">
                  <TabsTrigger
                    value="skills"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
                  >
                    <Code className="mr-2 h-4 w-4" />
                    Expertise
                  </TabsTrigger>
                  <TabsTrigger
                    value="experience"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
                  >
                    <Briefcase className="mr-2 h-4 w-4" />
                    Experience
                  </TabsTrigger>
                  <TabsTrigger
                    value="projects"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
                  >
                    <Layers className="mr-2 h-4 w-4" />
                    Projects
                  </TabsTrigger>
                  <TabsTrigger
                    value="education"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    Education
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="skills" className="space-y-8 mt-6">
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {[
                      { name: "Frontend Development", value: 92, color: "from-blue-400 to-indigo-600" },
                      { name: "Backend Development", value: 78, color: "from-emerald-400 to-teal-600" },
                      { name: "UI/UX Design", value: 80, color: "from-violet-400 to-purple-600" },
                      { name: "Database Management", value: 50, color: "from-amber-400 to-orange-600" },
                      // { name: "Cloud Services (AWS/Azure)", value: 82, color: "from-cyan-400 to-blue-600" },
                      // { name: "DevOps & CI/CD", value: 78, color: "from-rose-400 to-red-600" },
                      // { name: "Mobile Development", value: 75, color: "from-lime-400 to-green-600" },
                      // { name: "System Architecture", value: 85, color: "from-fuchsia-400 to-pink-600" },
                    ].map((skill) => (
                      <motion.div key={skill.name} variants={itemVariants} whileHover={{ scale: 1.02 }}>
                        <div className="bg-card p-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-border/30">
                          <div className="flex justify-between mb-3">
                            <span className="font-medium">{skill.name}</span>
                            <span className="font-bold text-primary">{skill.value}%</span>
                          </div>
                          <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.value}%` }}
                              transition={{ duration: 1, ease: "easeOut" }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Card className="border border-border/30">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-medium mb-4">Technical Proficiencies</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {[
                            {
                              category: "Languages",
                              items: ["JavaScript", "TypeScript", "Python", "Java", "HTML/CSS"],
                            },
                            { category: "Frameworks", items: ["React", "Next.js", "Node.js"] },
                            { category: "Databases", items: [ "PostgreSQL", "MySQL", ] },
                            { category: "Tools", items: ["Git"] },
                          ].map((group) => (
                            <div key={group.category}>
                              <h4 className="font-medium text-primary mb-2">{group.category}</h4>
                              <ul className="space-y-1 text-sm text-muted-foreground">
                                {group.items.map((item) => (
                                  <li key={item} className="flex items-center">
                                    <span className="mr-2 text-xs">•</span>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>

                <TabsContent value="experience" className="space-y-8 mt-6">
                  <motion.div className="space-y-8" variants={containerVariants} initial="hidden" animate="visible">
                    {[
                      {
                        title: "Part-Time Freelancer Frontend Developer",
                        company: "Private agency",
                        period: "2024 - Present",
                        description:
                          "Working as a partime frontend developer with a agency",
                        icon: <Award className="h-10 w-10 text-primary" />,
                      },
                      // {
                      //   title: "Frontend Developer",
                      //   company: "Digital Dynamics",
                      //   period: "2018 - 2020",
                      //   description:
                      //     "Developed responsive web applications using React and Redux. Collaborated with UX designers to implement pixel-perfect interfaces. Reduced load time by 30% through code optimization and lazy loading techniques.",
                      //   icon: <Layers className="h-10 w-10 text-amber-500" />,
                      // },
                      // {
                      //   title: "Software Engineer Intern",
                      //   company: "InnoTech Labs",
                      //   period: "2017 - 2018",
                      //   description:
                      //     "Assisted in developing RESTful APIs using Node.js and Express. Implemented automated testing that increased code coverage by 25%. Participated in agile development processes and daily stand-ups.",
                      //   icon: <Cpu className="h-10 w-10 text-emerald-500" />,
                      // },
                    ].map((job, index) => (
                      <motion.div key={index} variants={itemVariants} whileHover={{ scale: 1.01 }}>
                        <Card className="overflow-hidden border-border/30 hover:border-primary/30 transition-all duration-300">
                          <CardContent className="p-0">
                            <div className="flex flex-col md:flex-row">
                              <div className="bg-muted p-6 flex items-center justify-center md:w-1/6">{job.icon}</div>
                              <div className="p-6 md:w-5/6">
                                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                                  <div>
                                    <h3 className="font-bold text-xl">{job.title}</h3>
                                    <p className="text-primary font-medium">{job.company}</p>
                                  </div>
                                  <p className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full md:ml-4">
                                    {job.period}
                                  </p>
                                </div>
                                <p className="mt-4 leading-relaxed text-muted-foreground">{job.description}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                </TabsContent>

                {/* <TabsContent value="projects" className="mt-6">
                  <div className="mb-8">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold">Featured Projects</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Projects Completed:</span>
                        <motion.span
                          className="font-bold text-primary"
                          key={projectCount}
                          initial={{ scale: 1.5 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          {projectCount}
                        </motion.span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() => setProjectCount(projectCount + 1)}
                        >
                          <Zap className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <motion.div
                    className="grid grid-cols-1 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {projects.map((project, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        whileHover={{
                          scale: 1.02,
                          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
                        }}
                      >
                        <Card className="overflow-hidden border-border/30 hover:border-primary/30 transition-all duration-300">
                          <CardContent className="p-0">
                            <div className="flex flex-col md:flex-row">
                              <div className="bg-muted p-8 flex items-center justify-center md:w-1/4">
                                {project.icon}
                              </div>
                              <div className="p-6 md:w-3/4">
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                                  <h3 className="font-bold text-xl">{project.title}</h3>
                                  <Button variant="outline" size="sm" className="gap-1 h-8">
                                    <ExternalLink className="h-3.5 w-3.5" />
                                    <span className="text-xs">View Project</span>
                                  </Button>
                                </div>
                                <p className="mt-3 text-muted-foreground">{project.description}</p>
                                <div className="flex flex-wrap gap-2 mt-4">
                                  {project.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary" className="bg-secondary/40">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                </TabsContent> */}

                <TabsContent value="education" className="space-y-8 mt-6">
                  <motion.div className="space-y-8" variants={containerVariants} initial="hidden" animate="visible">
                    <motion.div variants={itemVariants}>
                      <Card className="overflow-hidden border-border/30 hover:border-primary/30 transition-all duration-300">
                        <CardContent className="p-0">
                          <div className="flex flex-col md:flex-row">
                            <div className="bg-muted p-6 flex items-center justify-center md:w-1/6">
                              <BookOpen className="h-10 w-10 text-primary" />
                            </div>
                            <div className="p-6 md:w-5/6">
                              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                                <div>
                                  <h3 className="font-bold text-xl">ICSE</h3>
                                  <p className="text-primary font-medium">Carmel School Madhpur</p>
                                </div>
                                <p className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full md:ml-4">
                                   2022
                                </p>
                              </div>
                              {/* <p className="mt-4 leading-relaxed text-muted-foreground">
                                Specialized in Artificial Intelligence and Machine Learning. Graduated with honors.
                                Research focus on natural language processing and computer vision.
                              </p> */}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <Card className="overflow-hidden border-border/30 hover:border-primary/30 transition-all duration-300">
                        <CardContent className="p-0">
                          <div className="flex flex-col md:flex-row">
                            <div className="bg-muted p-6 flex items-center justify-center md:w-1/6">
                              <BookOpen className="h-10 w-10 text-amber-500" />
                            </div>
                            <div className="p-6 md:w-5/6">
                              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                                <div>
                                  <h3 className="font-bold text-xl">Diploma in CS</h3>
                                  <p className="text-primary font-medium">Madhupur Polytechnic</p>
                                </div>
                                <p className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full md:ml-4">
                                  2022-2025
                                </p>
                              </div>
                              <p className="mt-4 leading-relaxed text-muted-foreground">
                                Dean's List all semesters. Participated in ACM programming competitions. Senior project
                                on distributed systems earned department recognition.
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>

                    {/* <motion.div variants={itemVariants}>
                      <Card className="border-border/30">
                        <CardContent className="p-6">
                          <h3 className="text-xl font-medium mb-4">Certifications & Additional Education</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                              {
                                name: "AWS Certified Solutions Architect",
                                issuer: "Amazon Web Services",
                                year: "2022",
                              },
                              { name: "Google Cloud Professional Developer", issuer: "Google", year: "2021" },
                              { name: "TensorFlow Developer Certificate", issuer: "Google", year: "2020" },
                              { name: "Advanced React Patterns", issuer: "Frontend Masters", year: "2019" },
                            ].map((cert) => (
                              <div key={cert.name} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                                <Award className="h-5 w-5 text-primary mt-0.5" />
                                <div>
                                  <p className="font-medium">{cert.name}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {cert.issuer} • {cert.year}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div> */}
                  </motion.div>
                </TabsContent>
              </Tabs>
            </motion.div>

            <motion.section className="pt-8 border-t border-border/20" variants={itemVariants}>
              <h2 className="text-2xl font-bold mb-8 flex items-center">
                <Mail className="h-5 w-5 mr-2 text-primary" />
                Get In Touch
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="border-border/30">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-lg font-medium">Contact Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-primary" />
                        <p className="text-muted-foreground">rahmanlaraib11@gmail.com</p>
                      </div>
                      {/* <div className="flex items-center gap-3">
                        <Globe className="h-5 w-5 text-primary" />
                        <p className="text-muted-foreground">www.mohtsham.dev</p>
                      </div> */}
                      <div className="flex items-center gap-3">
                        <Terminal className="h-5 w-5 text-primary" />
                        <p className="text-muted-foreground">India</p>
                      </div>
                    </div>
                    <div className="pt-4">
                      <p className="text-sm text-muted-foreground">
                        Available for freelance projects and full-time opportunities.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap gap-3">
                    {[
                      {
                        icon: <Mail className="h-4 w-4" />,
                        label: "Email Me",
                        color: "hover:bg-blue-500/10 hover:text-blue-500 hover:border-blue-500/30",
                      },
                      {
                        icon: <Github className="h-4 w-4" />,
                        label: "GitHub",
                        color: "hover:bg-purple-500/10 hover:text-purple-500 hover:border-purple-500/30",
                      },
                      {
                        icon: <Linkedin className="h-4 w-4" />,
                        label: "LinkedIn",
                        color: "hover:bg-sky-500/10 hover:text-sky-500 hover:border-sky-500/30",
                      },
                      {
                        icon: <Twitter className="h-4 w-4" />,
                        label: "Twitter",
                        color: "hover:bg-cyan-500/10 hover:text-cyan-500 hover:border-cyan-500/30",
                      },
                    ].map((item, index) => (
                      <motion.div key={index} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button variant="outline" className={`gap-2 transition-all duration-300 ${item.color}`}>
                          {item.icon}
                          <span>{item.label}</span>
                        </Button>
                      </motion.div>
                    ))}
                  </div>

                  <Card className="border-border/30 bg-muted/30">
                    <CardContent className="p-6">
                      <p className="italic text-muted-foreground">
                        "I'm always open to discussing new projects and opportunities. Feel free to reach out anytime."
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.section>
          </main>

          <motion.footer
            className="mt-24 pt-8 border-t border-border/20 text-center text-muted-foreground"
            variants={itemVariants}
          >
            <p className="text-sm">© {new Date().getFullYear()} Mohammad Mohtsham Mofiz. All rights reserved.</p>
            <p className="text-xs mt-2 italic">Crafted with precision and passion.</p>
            <p className="text-xs mt-4 opacity-50">Click on the logo for a surprise!</p>
          </motion.footer>
        </motion.div>
      </div>
    </div>
  )
}

