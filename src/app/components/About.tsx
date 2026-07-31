'use client';

import { motion } from 'framer-motion';
import { FiAward, FiBriefcase, FiUsers, FiCode, FiCalendar, FiBookOpen } from 'react-icons/fi';
import Image from 'next/image';

export default function About() {
  const stats = [
    { icon: <FiBriefcase className="text-xl" />, value: '1+', label: 'Years Experience', color: 'from-blue-500 to-indigo-500' },
    { icon: <FiCode className="text-xl" />, value: '7+', label: 'Projects Completed', color: 'from-emerald-500 to-teal-500' },
    { icon: <FiUsers className="text-xl" />, value: '10+', label: 'Happy Clients', color: 'from-purple-500 to-pink-500' },
    { icon: <FiAward className="text-xl" />, value: '2+', label: 'Certifications', color: 'from-amber-500 to-orange-500' },
  ];

  const experience = [
    {
      title: 'Full Stack Developer',
      company: 'ILS (Institute of Language & Software)',
      period: '2024 - Present',
      description: 'Building and maintaining React, Next.js, Node.js, and .NET applications. Collaborated on web apps with responsive styles and modular architectures.'
    },
    {
      title: 'Frontend Developer',
      company: 'ILS (Institute of Language & Software)',
      period: '2024',
      description: 'Developed modern React layouts with fluid animations and customized design layouts. Integrated REST APIs and worked closely with backend teams.'
    }
  ];

  const education = [
    {
      degree: '12th Standard Pass',
      institution: 'Government Boys Higher Secondary School Qalamabad',
      period: 'Completed in 2024',
      description: 'Specialized in Science and Mathematics. Built local projects and learned HTML, CSS, JavaScript fundamentals.'
    }
  ];

  const profileImageUrl = "/muzamil.jpg";

  return (
    <section id="about" className="py-20 relative bg-background/50 transition-colors duration-300">
      {/* Subtle Grid overlay background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10" />

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image with gradient background frame */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 flex justify-center relative"
          >
            <div className="relative w-[280px] h-[280px] sm:w-[340px] sm:h-[340px]">
              {/* Offset glowing background box */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent rounded-3xl rotate-6 scale-95 opacity-20 dark:opacity-35 blur-sm" />
              
              {/* Picture frame */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden glass-panel border-2 border-card-border shadow-2xl">
                <Image
                  src={profileImageUrl}
                  alt="Muzamil War"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 280px, 340px"
                  unoptimized
                  priority
                />
                
                {/* Visual Glass overlays on image */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                
                {/* Floating badge inside image */}
                <div className="absolute bottom-4 left-4 right-4 p-3 bg-white/10 dark:bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-xl">
                  <p className="text-sm font-bold text-white">Muzamil War</p>
                  <p className="text-xs text-secondary font-medium">Full Stack Engineer</p>
                </div>
              </div>

              {/* Floating tech nodes */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-3 -left-3 px-3 py-1.5 bg-white dark:bg-slate-900 border border-card-border rounded-xl shadow-lg text-xs font-bold text-gray-700 dark:text-gray-300"
              >
                ⚛️ React
              </motion.div>

              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 -right-6 px-3 py-1.5 bg-white dark:bg-slate-900 border border-card-border rounded-xl shadow-lg text-xs font-bold text-gray-700 dark:text-gray-300"
              >
                ⚡ Next.js
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: Bio summary & stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 space-y-8 text-left"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
                About Me
              </h2>
              <div className="h-1.5 w-20 bg-gradient-to-r from-primary to-secondary rounded-full mb-6" />
              
              <div className="space-y-4 text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed">
                <p>
                  I am a passionate <strong className="text-gray-800 dark:text-white">Full Stack Developer</strong> who loves turning ideas into high-quality code. Specializing in modern javascript environments, I create fast and secure web applications using React, Next.js, Express, and Microsoft .NET platforms.
                </p>
                <p>
                  I believe in writing clean, modular, and self-documenting code. Over the past year, I have built web applications ranging from dynamic landing pages to complete e-commerce platforms, always aiming for accessibility, SEO best practices, and elegant UI interfaces.
                </p>
              </div>
            </div>

            {/* Premium Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ y: -5 }}
                  className="p-4 rounded-2xl glass-panel border border-card-border text-center shadow-md relative overflow-hidden group"
                >
                  {/* Subtle top indicator hover lines */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-350" />
                  
                  <div className="inline-flex p-2.5 rounded-xl bg-primary/5 dark:bg-primary/10 text-primary mb-3">
                    {stat.icon}
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight mb-1">{stat.value}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* Experience & Education Timelines */}
        <div className="grid md:grid-cols-2 gap-12 mt-20">
          
          {/* Experience Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2.5 bg-primary/10 dark:bg-primary/20 text-primary rounded-xl">
                <FiBriefcase className="text-xl" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight">Work Experience</h3>
            </div>

            <div className="relative border-l-2 border-primary/20 dark:border-primary/30 pl-6 ml-3 space-y-8">
              {experience.map((exp, index) => (
                <div key={index} className="relative group">
                  {/* Timeline bullet node */}
                  <div className="absolute -left-[31px] top-1.5 w-4.5 h-4.5 rounded-full border-2 border-primary bg-background group-hover:bg-primary transition-colors duration-300" />
                  
                  <div className="p-5 glass-panel border border-card-border rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <h4 className="font-bold text-gray-800 dark:text-white text-lg">{exp.title}</h4>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/5 dark:bg-primary/15 text-primary text-xs font-semibold rounded-full">
                        <FiCalendar />
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">{exp.company}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Education Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2.5 bg-secondary/10 dark:bg-secondary/20 text-secondary rounded-xl">
                <FiBookOpen className="text-xl" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight">Education</h3>
            </div>

            <div className="relative border-l-2 border-secondary/20 dark:border-secondary/30 pl-6 ml-3 space-y-8">
              {education.map((edu, index) => (
                <div key={index} className="relative group">
                  {/* Timeline bullet node */}
                  <div className="absolute -left-[31px] top-1.5 w-4.5 h-4.5 rounded-full border-2 border-secondary bg-background group-hover:bg-secondary transition-colors duration-300" />
                  
                  <div className="p-5 glass-panel border border-card-border rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <h4 className="font-bold text-gray-800 dark:text-white text-lg">{edu.degree}</h4>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary/5 dark:bg-secondary/15 text-secondary text-xs font-semibold rounded-full">
                        <FiCalendar />
                        {edu.period}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">{edu.institution}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{edu.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}