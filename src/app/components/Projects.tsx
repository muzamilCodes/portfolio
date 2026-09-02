'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiX, FiChevronRight, FiFolder } from 'react-icons/fi';
import { projects, Project } from '@/app/data/projects';
import Image from 'next/image';
import TiltCard3D from './3d/TiltCard3D';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState('all');

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'react', label: 'React' },
    { id: 'nextjs', label: 'Next.js' },
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'nodejs', label: 'Node.js' }
  ];

  const filteredProjects = projects.filter(project => {
    if (filter === 'all') return true;
    if (filter === 'react') return project.tech.includes('React') || project.tech.includes('React.js');
    if (filter === 'nextjs') return project.tech.includes('Next.js') || project.tech.includes('Next.js 14');
    if (filter === 'fullstack') return project.tech.length >= 4;
    if (filter === 'nodejs') return project.tech.includes('Node.js') || project.tech.includes('Express.js');
    return true;
  });

  return (
    <section id="projects" className="py-20 relative bg-background/50 transition-colors duration-300">
      {/* Background ambient neon glow */}
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-primary/5 dark:bg-primary/10 glow-blur -z-10" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
            Featured Projects
          </h2>
          <div className="h-1.5 w-20 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-6" />
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
            A curated showcase of my engineering work across backend systems, full stack platforms, and interactive interfaces.
          </p>
        </motion.div>

        {/* Dynamic Category Filters */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setFilter(category.id)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide uppercase transition-all duration-300 ${
                filter === category.id
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md shadow-primary/20'
                  : 'bg-white/50 dark:bg-slate-900/50 border border-card-border text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-slate-800'
              }`}
            >
              {category.label}
            </motion.button>
          ))}
        </div>

        {/* Project Showcase Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="h-full"
              >
                <TiltCard3D
                  depth={15}
                  glowColor="rgba(56, 189, 248, 0.25)"
                  className="group flex flex-col h-full bg-white/40 dark:bg-slate-900/40 glass-panel border border-card-border rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-primary/40 transition-all duration-300"
                >
                  {/* Image Cover container */}
                  <div className="relative h-48 w-full overflow-hidden border-b border-card-border">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    
                    {/* Subtle glass layer above image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />
                    
                    {/* Floating folder overlay */}
                    <div className="absolute top-4 left-4 p-2.5 bg-slate-900/70 backdrop-blur-md rounded-2xl text-secondary border border-white/15 shadow-lg">
                      <FiFolder className="text-sm" />
                    </div>
                  </div>

                  {/* Card Info Content */}
                  <div className="p-6 flex flex-col flex-grow text-left space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Primary Tech badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tech.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 bg-primary/10 dark:bg-primary/20 border border-primary/20 text-primary text-[10px] font-bold rounded-lg"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="px-2 py-1 bg-gray-500/10 border border-gray-500/20 text-gray-500 text-[10px] font-bold rounded-lg">
                          +{project.tech.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Flex grow spacer */}
                    <div className="flex-grow" />

                    {/* Card bottom actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-card-border select-none">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="flex items-center text-xs font-bold text-primary hover:text-secondary group-hover:gap-2 transition-all"
                      >
                        <span>Explore Details</span>
                        <FiChevronRight className="ml-0.5" />
                      </button>
                      
                      <div className="flex space-x-2">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 border border-card-border bg-white/50 dark:bg-slate-900/60 hover:bg-white dark:hover:bg-slate-800 rounded-xl text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-all shadow-sm"
                          title="GitHub Repository"
                          aria-label="View on Github"
                        >
                          <FiGithub className="text-sm" />
                        </a>
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 border border-card-border bg-white/50 dark:bg-slate-900/60 hover:bg-white dark:hover:bg-slate-800 rounded-xl text-gray-600 dark:text-gray-400 hover:text-secondary dark:hover:text-secondary transition-all shadow-sm"
                            title="Live Showcase"
                            aria-label="Live Demo"
                          >
                            <FiExternalLink className="text-sm" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </TiltCard3D>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Modal Window implementation */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 15 }}
                transition={{ duration: 0.25 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-slate-950 border border-card-border rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative text-left"
              >
                {/* Header Close button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-5 right-5 z-10 p-2 border border-card-border bg-white/80 dark:bg-slate-900/80 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-300 transition-colors"
                  aria-label="Close modal"
                >
                  <FiX className="text-lg" />
                </button>

                {/* Banner image with deep overlay */}
                <div className="relative h-56 w-full select-none">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-950 via-slate-950/30 to-transparent" />
                  
                  {/* Floating titles over gradient banner */}
                  <div className="absolute bottom-5 left-6 right-6">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-800 dark:text-white leading-tight">
                      {selectedProject.title}
                    </h3>
                  </div>
                </div>

                {/* Core Modal descriptions */}
                <div className="p-6 sm:p-8 space-y-6">
                  {/* Overview */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-primary uppercase tracking-widest">
                      Project Overview
                    </h4>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                      {selectedProject.longDescription}
                    </p>
                  </div>

                  {/* Features grid */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-primary uppercase tracking-widest">
                      Key Highlights & Features
                    </h4>
                    <ul className="grid sm:grid-cols-2 gap-2.5">
                      {selectedProject.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                          <FiChevronRight className="text-secondary mr-2 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech stack badges */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-primary uppercase tracking-widest">
                      Technologies Leveraged
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 bg-gray-500/5 dark:bg-slate-900 border border-card-border text-gray-800 dark:text-gray-300 text-xs font-semibold rounded-lg"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action buttons inside Modal */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-card-border">
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-6 py-3 border border-slate-900 dark:border-white bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-xl font-bold text-xs uppercase tracking-wide flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                    >
                      <FiGithub className="text-sm" />
                      <span>View Source Code</span>
                    </a>
                    {selectedProject.liveUrl && (
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-bold text-xs uppercase tracking-wide flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                      >
                        <FiExternalLink className="text-sm" />
                        <span>Launch Project URL</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* View More actions */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a
            href="https://github.com/muzamilCodes"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 border border-card-border bg-white/80 dark:bg-slate-900/80 hover:border-primary/30 rounded-full font-bold text-sm tracking-wide text-gray-800 dark:text-gray-200 shadow-sm hover:shadow-md transition-all gap-2.5"
          >
            <FiGithub className="text-base text-primary" />
            <span>Discover more on GitHub</span>
          </a>
        </motion.div>

      </div>
    </section>
  );
}