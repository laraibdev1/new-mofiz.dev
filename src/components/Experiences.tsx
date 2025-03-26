import React from 'react';
import { Code, Layers, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

// Define Icons object
const Icons = {
  Code,
  Layers,
  GraduationCap,
};

const experiences = [
  {
    title: 'Freelance Web Developer',
    company: 'Freelance / Agency',
    period: '2024 - Present',
    description: 'Currently working as a part-time web developer with a freelance agency, building and maintaining websites for various clients. Focused primarily on frontend development using React.js and Tailwind CSS.',
    icon: <Icons.Code className="h-6 w-6" />,
  },
  {
    title: 'Personal Projects Developer',
    company: 'Self-Initiated',
    period: '2024 - Present',
    description: 'Dedicated to building personal projects to improve my skills in web development. Focused on modern JavaScript frameworks like React.js and Next.js, as well as enhancing knowledge of frontend technologies.',
    icon: <Icons.Layers className="h-6 w-6" />,
  },
  
  // {
  //   title: 'Intern Web Developer',
  //   company: 'Agency Internship',
  //   period: '2021 - 2022',
  //   description: 'Assisted in the development of web applications and websites for clients, gaining experience in HTML, CSS, and JavaScript.',
  //   icon: <Icons.GraduationCap className="h-6 w-6" />,
  // },
];

export default function Experience() {
  return (
    <section id="experience" className="py-20 bg-black text-white relative ove  rflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl font-bold mb-12 text-center text-purple-400">
          Work Experience
        </h2>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-purple-400" />
          {experiences.map((exp, index) => (
            <TimelineCard key={exp.title} experience={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ExperienceProps {
  title: string;
  company: string;
  period: string;
  description: string;
  icon?: React.ReactNode;
}

function TimelineCard({ experience, index }: { experience: ExperienceProps; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className={`flex items-center justify-between mb-8 transition-all duration-500 ease-in-out ${
        isEven ? 'flex-row-reverse' : ''
      }`}
    >
      <div className={`w-5/12 ${isEven ? 'text-right' : 'text-left'}`}>
        <h3 className="text-xl font-semibold">{experience.title}</h3>
        <p className="text-purple-400">{experience.company}</p>
        <p className="text-gray-500">{experience.period}</p>
      </div>

      <div className="z-10 flex items-center justify-center w-8 h-8 bg-purple-600 rounded-full">
        {experience.icon}
      </div>

      <div className={`w-5/12 p-4 bg-gray-800 rounded-lg shadow-lg ${isEven ? 'text-right' : 'text-left'}`}>
        <p className="text-gray-300">{experience.description}</p>
      </div>
    </motion.div>
  );
}
