"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { IconType } from "react-icons";
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaDocker,
  FaJsSquare,
  FaGitAlt,
  FaAws,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiFlask,
  SiFastapi,
  SiPostgresql,
  SiKubernetes,
  SiMysql,
  SiTypescript,
  SiMongodb,
  SiRedis,
  SiTailwindcss,
} from "react-icons/si";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface Skill {
  name: string;
  icon: IconType;
  category: string;
  proficiency: number;
  description: string;
}

const skills: Skill[] = [
  { 
    name: "React", 
    icon: FaReact, 
    category: "Frontend", 
    proficiency: 90,
    description: "Extensive experience building complex UIs and state management with React and its ecosystem."
  },
  { 
    name: "Next.js", 
    icon: SiNextdotjs, 
    category: "Frontend", 
    proficiency: 85,
    description: "Proficient in server-side rendering, static site generation, and API routes with Next.js."
  },
  { 
    name: "TypeScript", 
    icon: SiTypescript, 
    category: "Languages", 
    proficiency: 80,
    description: "Strong typing skills, interfaces, and advanced TypeScript features for robust application development."
  },
  { 
    name: "Node.js", 
    icon: FaNodeJs, 
    category: "Backend", 
    proficiency: 85,
    description: "Experienced in building scalable server-side applications and RESTful APIs with Node.js."
  },
  { 
    name: "Python", 
    icon: FaPython, 
    category: "Languages", 
    proficiency: 75,
    description: "Proficient in Python for data analysis, scripting, and backend development."
  },
  { 
    name: "Flask", 
    icon: SiFlask, 
    category: "Backend", 
    proficiency: 70,
    description: "Capable of creating lightweight web applications and APIs using Flask."
  },
  { 
    name: "FastAPI", 
    icon: SiFastapi, 
    category: "Backend", 
    proficiency: 75,
    description: "Experienced in building high-performance APIs with FastAPI and its async capabilities."
  },
  { 
    name: "PostgreSQL", 
    icon: SiPostgresql, 
    category: "Databases", 
    proficiency: 80,
    description: "Skilled in designing and optimizing relational databases with PostgreSQL."
  },
  // { 
  //   name: "MongoDB", 
  //   icon: SiMongodb, 
  //   category: "Databases", 
  //   proficiency: 75,
  //   description: "Proficient in working with NoSQL databases and document-based data models using MongoDB."
  // },
  // { 
  //   name: "Redis", 
  //   icon: SiRedis, 
  //   category: "Databases", 
  //   proficiency: 70,
  //   description: "Experienced in using Redis for caching and real-time data storage."
  // },
  // { 
  //   name: "Docker", 
  //   icon: FaDocker, 
  //   category: "DevOps", 
  //   proficiency: 80,
  //   description: "Skilled in containerizing applications and managing multi-container environments with Docker."
  // },
  // { 
  //   name: "Kubernetes", 
  //   icon: SiKubernetes, 
  //   category: "DevOps", 
  //   proficiency: 70,
  //   description: "Capable of orchestrating and scaling containerized applications with Kubernetes."
  // },
  { 
    name: "JavaScript", 
    icon: FaJsSquare, 
    category: "Languages", 
    proficiency: 90,
    description: "Expert-level knowledge of JavaScript, including ES6+ features and asynchronous programming."
  },
  { 
    name: "Git", 
    icon: FaGitAlt, 
    category: "Tools", 
    proficiency: 85,
    description: "Proficient in version control, branching strategies, and collaborative development using Git."
  },
  // { 
  //   name: "AWS", 
  //   icon: FaAws, 
  //   category: "Cloud", 
  //   proficiency: 75,
  //   description: "Experienced in deploying and managing applications on AWS, including EC2, S3, and Lambda."
  // },
  { 
    name: "Tailwind CSS", 
    icon: SiTailwindcss, 
    category: "Frontend", 
    proficiency: 85,
    description: "Skilled in rapidly building custom user interfaces using Tailwind CSS utility classes."
  },
];

const categories = Array.from(new Set(skills.map((skill) => skill.category)));

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const filteredSkills = selectedCategory
    ? skills.filter((skill) => skill.category === selectedCategory)
    : skills;

  return (
    <section id="skills" ref={sectionRef} className="py-20 bg-slate-950 text-white">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-12 text-center text-purple-400"
        >
          My Skills
        </motion.h2>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          <Button
            onClick={() => setSelectedCategory(null)}
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            className={selectedCategory === null ? "bg-purple-600 text-white" : "bg-gray-800 text-purple-400 hover:bg-gray-700"}
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              className={selectedCategory === category ? "bg-purple-600 text-white" : "bg-gray-800 text-purple-400 hover:bg-gray-700"}
            >
              {category}
            </Button>
          ))}
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredSkills.map((skill, index) => (
            <SkillCard 
              key={skill.name} 
              skill={skill} 
              index={index} 
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCard({ skill, index, isInView }: { skill: Skill; index: number; isInView: boolean }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.05 }}
          className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-purple-500/20 transition duration-300 transform hover:scale-105 cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex items-center justify-center mb-3">
            <skill.icon
              className="text-4xl text-purple-400"
              aria-label={skill.name}
            />
          </div>
          <h3 className="text-sm font-semibold text-center text-purple-400 mb-3">
            {skill.name}
          </h3>
          <div className="w-16 h-16 mx-auto">
            <CircularProgressbar
              value={skill.proficiency}
              text={`${skill.proficiency}%`}
              styles={buildStyles({
                textSize: '28px',
                pathTransitionDuration: 1,
                pathColor: isHovered ? '#8B5CF6' : '#A78BFA',
                textColor: '#A78BFA',
                trailColor: '#1F2937',
              })}
            />
          </div>
        </motion.div>
      </DialogTrigger>
      <SkillModal skill={skill} />
    </Dialog>
  );
}

function SkillModal({ skill }: { skill: Skill }) {
  return (
    <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 text-2xl text-purple-400">
          <skill.icon className="text-3xl text-purple-400" />
          {skill.name}
        </DialogTitle>
        <DialogDescription className="text-lg text-gray-300">
          {skill.description}
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="flex items-center justify-between">
          <span className="text-purple-400 font-semibold">Proficiency:</span>
          <div className="w-20 h-20">
            <CircularProgressbar
              value={skill.proficiency}
              text={`${skill.proficiency}%`}
              styles={buildStyles({
                textSize: '28px',
                pathColor: '#8B5CF6',
                textColor: '#A78BFA',
                trailColor: '#1F2937',
              })}
            />
          </div>
        </div>
        <div>
          <span className="text-purple-400 font-semibold">Category:</span>
          <Badge variant="secondary" className="ml-2 bg-gray-800 text-purple-400">
            {skill.category}
          </Badge>
        </div>
      </div>
    </DialogContent>
  );
}

