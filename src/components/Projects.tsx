'use client';
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';

interface Project {
  title: string;
  category: string;
  description: string;
  image: string;
  link: string;
  technologies: string[];
  featured?: boolean;
}

const projects: Project[] = [
  {
    title: 'DevXcelerate',
    description: 'DevXcelerate is an online study platform for developers. In this project, I used the YouTube API to fetch video data. The app is still under development.',
    image: '/dummy.png',
    link: 'https://dev-x-mofiz.vercel.app/',
    category: 'Full Stack',
    technologies: ['Next.js', 'React', 'Tailwind CSS'],
    featured: true,
  },
  {
    title: 'DevXcelerate',
    description: 'DevXcelerate is an online study platform for developers. In this project, I used the YouTube API to fetch video data. The app is still under development.',
    image: '/dummy.png',
    link: 'https://dev-x-mofiz.vercel.app/',
    category: 'Full Stack',
    technologies: ['Next.js', 'React', 'Tailwind CSS'],
    featured: true,
  },
  {
    title: 'Basic Portfolio Template',
    description: 'A portfolio website built for developers, which consists of modern UI and experience and modern animations.',
    image: '/github.png',
    link: 'https://github.com/laraibdev1/Basic-Portfolio-Template',
    category: 'Web App',
    technologies: ['Nextjs'],
    featured: false,
  },
  {
    title: 'Ecommerce App.',
    description: 'An e-commerce app made with React for affiliate marketers.',
    image: '/github.png',
    link: 'https://github.com/laraibdev1/basic-ecommerceApp',
    category: 'Real-time',
    technologies: ['React', 'Vite'],
    featured: false,
  },
  {
    title: 'Blog App.',
    description: 'A Blog App made with just Flask and Jinja Template.',
    image: '/github.png',
    link: 'https://github.com/laraibdev1/blog-app',
    category: 'Real-time',
    technologies: ['Flask', 'HTML', 'PostgreSQL'],
    featured: false,
  },
  {
    title: 'Course App',
    description: 'A course app for teachers who want to teach online. It is a highly customizable and responsive app.',
    image: '/github.png',
    link: 'https://github.com/laraibdev1/CourseApp-Template',
    category: 'Real-time',
    technologies: ['Next', 'Flask'],
    featured: false,
  },
  {
    title: 'Analytical Dashboard',
    description: 'The admin analytical dashboard for businesses.',
    image: '/github.png',
    link: 'https://github.com/laraibdev1/Analytical-Dashboard-Template',
    category: 'Real-time',
    technologies: ['Next'],
    featured: false,
  },
  {
    title: 'Snake Game ',
    description: 'Snake game made with Python.',
    image: '/github.png',
    link: 'https://github.com/laraibdev1/snake-game-python',
    category: 'Real-time',
    technologies: ['Python'],
    featured: false,
  },
];

export default function Projects() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', ...new Set(projects.map((p) => p.category))];
  const featuredProject = projects.find((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  const filteredProjects =
    selectedCategory === 'All' ? otherProjects : otherProjects.filter((p) => p.category === selectedCategory);

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="py-20 bg-slate-950 text-white min-h-screen">
      <div className="container mx-auto px-4">
        <motion.div style={{ y }} className="flex justify-between items-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-purple-400"
          >
            
            My Projects
          </motion.h2>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="bg-gray-800 text-purple-400 hover:bg-gray-700"
          >
            {theme === 'dark' ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
          </Button>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? 'default' : 'outline'}
              className={selectedCategory === category ? 'bg-purple-600 text-white' : 'bg-gray-800 text-purple-400 hover:bg-gray-700'}
            >
              {category}
            </Button>
          ))}
        </div>

        {featuredProject && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold mb-4 text-purple-400">Featured Project</h3>
            <FeaturedProjectCard project={featuredProject} />
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedProjectCard({ project }: { project: Project }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-gray-900 text-white rounded-lg overflow-hidden shadow-lg hover:shadow-purple-500/20 transition duration-300">
      <div className="md:flex">
        <div className="md:flex-shrink-0 w-full md:w-2/5">
          <Image src={project.image} alt={project.title} width={400} height={300} className="w-full h-64 md:h-full object-cover" />
        </div>
        <div className="p-8 md:w-3/5">
          <div className="uppercase tracking-wide text-sm text-purple-400 font-semibold">{project.category}</div>
          <Link href={project.link} passHref>
            {/* Removed <a> tag, now Link directly wraps the content */}
            <span className="block mt-1 text-lg leading-tight font-medium text-white hover:text-purple-400 transition duration-300">
              {project.title}
            </span>
          </Link>
          <p className="mt-2 text-gray-300">{project.description}</p>

          {isExpanded && (
            <div className="mt-4">
              <h4 className="font-bold text-purple-400">Technologies used:</h4>
              <div>
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="mr-2 mb-2 bg-gray-800 text-purple-400">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="mt-4 space-x-2">
            <Button
              variant="outline"
              className="bg-gray-800 text-purple-400 hover:bg-gray-700"
              onClick={toggleExpanded}
            >
              {isExpanded ? 'View Less' : 'View More'}
            </Button>
            <Link href={project.link} passHref>
              <Button variant="outline" className="bg-gray-800 text-purple-400 hover:bg-gray-700">
                View Project
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-gray-900 text-white rounded-lg overflow-hidden shadow-lg hover:shadow-purple-500/20 transition duration-300"
    >
      <div className="relative h-48">
        <Image src={project.image} alt={project.title} layout="fill" objectFit="cover" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-purple-400">{project.title}</h3>
        <p className="mb-4 text-gray-300">{project.description}</p>
        <div className="mb-4">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="secondary" className="mr-2 mb-2 bg-gray-800 text-purple-400">
              {tech}
            </Badge>
          ))}
        </div>
        <div className="space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="bg-gray-800 text-purple-400 hover:bg-gray-700">
                View Details
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{project.title}</DialogTitle>
                <DialogDescription>{project.description}</DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Link href={project.link} passHref>
            <Button variant="outline" className="bg-gray-800 text-purple-400 hover:bg-gray-700">
              View Project
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

