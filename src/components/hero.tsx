'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Github, Linkedin, Twitter, Instagram, ChevronDown } from 'lucide-react'
import { StylishText } from '@/components/stylish-text'
import Link from 'next/link'

const socialLinks = [
  { label: 'Github', href: 'https://github.com/laraibdev1', icon: Github },
  { label: 'Linkedin', href: 'https://www.linkedin.com/in/md-mohtasham-mofiz-138bb42ab/', icon: Linkedin },
  { label: 'Twitter', href: 'https://x.com/moh7asham', icon: Twitter },
  { label: 'Instagram', href: 'https://instagram.com/rahmanlaraib', icon: Instagram },
]

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <div className="min-h-screen bg-black bg-cover bg-center bg-fixed pt-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/40" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-4rem)]">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="space-y-2">
              <StylishText text="I'm Mohtasham" className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white" />
              <StylishText
                text="Web Developer"
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary"
              />
            </div>
            <p className="text-xl text-white max-w-md">
              Crafting digital experiences that blend creativity with cutting-edge technology.
            </p>
            <br />
            <Link href="/projects">
            <div className="flex items-center space-x-4">
              <Button size="lg" className="rounded-full text-lg px-8 py-6 bg-primary text-primary-foreground hover:bg-primary/90">
                Explore My Work
              </Button>
            </div>
            </Link>
          </motion.div>

          {/* Right Content with Image and Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
            style={{ y }}
          >
            <div className="relative aspect-[4/5] w-full max-w-xl mx-auto lg:ml-auto">
              <Image
                src="/newImage.png"
                alt="Developer Portrait"
                fill
                className="object-cover rounded-3xl shadow-2xl"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-3xl" />
            </div>

            {/* About Me and My Work Sections */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-black/70 backdrop-blur-md p-6 rounded-2xl shadow-lg"
              >
                <h3 className="font-semibold mb-2 text-primary">ABOUT ME</h3>
                <p className="text-sm text-white">
                  Passionate about creating seamless user experiences and robust web applications.
                </p>
                <Link href="/about" passHref legacyBehavior>
                  <Button variant="link" className="px-0 text-primary mt-2">
                    LEARN MORE →
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-black/70 backdrop-blur-md p-6 rounded-2xl shadow-lg"
              >
                <h3 className="font-semibold mb-2 text-primary">MY WORK</h3>
                <p className="text-sm text-white">
                  Explore my portfolio of innovative web projects and creative solutions.
                </p>
                <Link href="/port-folio" passHref legacyBehavior>
                  <Button variant="link" className="px-0 text-primary mt-2">
                    VIEW PORTFOLIO →
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-8 flex items-center justify-center space-x-6 bg-black/50 backdrop-blur-md py-3 px-6 rounded-full"
        >
          <p className="text-sm font-medium text-white">CONNECT</p>
          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                passHref
                legacyBehavior
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-primary transition-colors duration-200"
                >
                  <social.icon className="h-5 w-5" />
                  <span className="sr-only">{social.label}</span>
                </Button>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <Link href="#projects" passHref legacyBehavior>
            <Button variant="ghost" size="icon" className="animate-bounce">
              <ChevronDown className="h-6 w-6 text-white" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

