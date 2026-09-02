'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiDownload, FiArrowRight, FiTerminal, FiBox, FiCode, FiCpu } from 'react-icons/fi';
import { TypeAnimation } from 'react-type-animation';
import Image from 'next/image';

const Hero3D = dynamic(() => import('./3d/Hero3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[360px] flex flex-col items-center justify-center gap-3">
      <div className="w-12 h-12 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
      <span className="text-xs font-mono text-primary/70 animate-pulse">Initializing 3D Canvas...</span>
    </div>
  ),
});

export default function Hero() {
  const [activeTab, setActiveTab] = useState<'3d' | 'code'>('3d');

  return (
    <section id="home" className="min-h-[calc(100vh-80px)] flex items-center justify-center relative overflow-hidden py-12 md:py-20 bg-background transition-colors duration-300">
      {/* Background Animated Ambient Lights */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-primary/10 dark:bg-primary/20 glow-blur -z-10 animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-secondary/10 dark:bg-secondary/15 glow-blur -z-10 animate-pulse-slow" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column - Intro */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 text-left">
            <div className="flex items-center space-x-4">
              {/* Profile image with neon ring */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, delay: 0.05 }}
                className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-primary/45 p-0.5 shadow-lg shadow-primary/10 overflow-hidden flex-shrink-0"
              >
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image
                    src="/muzamil.jpg"
                    alt="Muzamil War Profile"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center space-x-2 px-3 py-1.5 border border-primary/20 bg-primary/5 dark:bg-primary/10 rounded-full w-fit text-primary font-semibold text-xs tracking-wide uppercase"
              >
                <FiTerminal className="text-sm" />
                <span>Available for Hire</span>
              </motion.div>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight"
            >
              Hi, I&apos;m{' '}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Muzamil War
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 min-h-[48px]"
            >
              <TypeAnimation
                sequence={[
                  'Full Stack Developer',
                  2000,
                  'React & Next.js Expert',
                  2000,
                  'Three.js & 3D Web Creator',
                  2000,
                  '.NET Core Developer',
                  2000,
                  'Express.js Backend Specialist',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-xl leading-relaxed"
            >
              I build interactive, scalable, and high-performance digital experiences from Srinagar, Kashmir. Specializing in high-fidelity React/Next.js frontend architectures, 3D WebGL interfaces, and robust backend engineering.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="#projects"
                className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-semibold text-sm shadow-md shadow-primary/10 hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2"
              >
                <span>Explore Work</span>
                <FiArrowRight className="text-sm" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="/resume.html"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-card-border bg-white/80 dark:bg-slate-900/80 text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-primary rounded-full font-semibold text-sm hover:shadow-md transition-all flex items-center gap-2"
              >
                <FiDownload className="text-sm" />
                <span>View & Get CV</span>
              </motion.a>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex items-center space-x-4 pt-4"
            >
              <span className="text-xs text-gray-400 dark:text-gray-500 font-semibold uppercase tracking-wider">
                Follow me:
              </span>
              {[
                { icon: <FiGithub />, label: 'GitHub', href: 'https://github.com/muzamilCodes' },
                { icon: <FiLinkedin />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/muzamilCodes' },
                { icon: <FiTwitter />, label: 'Twitter', href: 'https://x.com/MuzamilCoder' },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -2 }}
                  className="p-2 border border-card-border bg-white/50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-800 rounded-full text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Interactive 3D Cyber Card / Code Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-5 relative"
          >
            {/* Soft backdrop glow behind card */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-3xl blur-xl opacity-30 dark:opacity-40 animate-pulse-slow" />
            
            <div className="relative glass-panel bg-slate-900/90 dark:bg-slate-950/85 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden border border-white/10 text-xs sm:text-sm font-mono text-gray-300">
              {/* Window Header with Tab Switchers */}
              <div className="flex items-center justify-between px-4 py-3 bg-slate-950/80 border-b border-white/10">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>

                {/* Switcher Buttons */}
                <div className="flex items-center bg-slate-800/80 p-0.5 rounded-lg border border-white/10 text-[11px]">
                  <button
                    onClick={() => setActiveTab('3d')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all font-sans font-medium ${
                      activeTab === '3d'
                        ? 'bg-primary text-white shadow-sm'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <FiBox className="text-xs" />
                    <span>3D Cyber Orb</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('code')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all font-sans font-medium ${
                      activeTab === 'code'
                        ? 'bg-primary text-white shadow-sm'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <FiCode className="text-xs" />
                    <span>profile.ts</span>
                  </button>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="hidden sm:inline font-sans font-medium">LIVE</span>
                </div>
              </div>

              {/* Window Body */}
              <div className="relative min-h-[360px] sm:min-h-[400px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {activeTab === '3d' ? (
                    <motion.div
                      key="3d-tab"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="relative w-full h-full flex flex-col items-center justify-center p-2"
                    >
                      {/* Top Overlay Badge */}
                      <div className="absolute top-3 left-4 z-10 flex items-center gap-2 px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] text-sky-300 backdrop-blur-md">
                        <FiCpu className="text-xs" />
                        <span>Interactive Three.js & Fiber</span>
                      </div>

                      {/* 3D Canvas */}
                      <div className="w-full h-[340px] sm:h-[370px]">
                        <Hero3D />
                      </div>

                      {/* Bottom Hint */}
                      <div className="absolute bottom-3 text-center text-[10px] text-gray-400/80 font-sans select-none pointer-events-none">
                        ✦ Move your mouse / touch to interact with 3D Core ✦
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="code-tab"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="p-6 select-none leading-relaxed overflow-x-auto whitespace-pre font-mono text-xs sm:text-sm"
                    >
                      <span className="text-purple-400">const</span>{' '}
                      <span className="text-blue-400">developer</span> = &#123;
                      <br />
                      &nbsp;&nbsp;<span className="text-cyan-400">name</span>:{' '}
                      <span className="text-amber-300">&apos;Muzamil War&apos;</span>,
                      <br />
                      &nbsp;&nbsp;<span className="text-cyan-400">role</span>:{' '}
                      <span className="text-amber-300">&apos;Full Stack & 3D Web Engineer&apos;</span>,
                      <br />
                      &nbsp;&nbsp;<span className="text-cyan-400">location</span>:{' '}
                      <span className="text-amber-300">&apos;Srinagar, Kashmir&apos;</span>,
                      <br />
                      &nbsp;&nbsp;<span className="text-cyan-400">technologies</span>: [
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-amber-300">&apos;React&apos;</span>,{' '}
                      <span className="text-amber-300">&apos;Next.js&apos;</span>,{' '}
                      <span className="text-amber-300">&apos;Three.js / R3F&apos;</span>,
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-amber-300">&apos;TypeScript&apos;</span>,{' '}
                      <span className="text-amber-300">&apos;Node.js&apos;</span>,{' '}
                      <span className="text-amber-300">&apos;.NET Core&apos;</span>
                      <br />
                      &nbsp;&nbsp;],
                      <br />
                      &nbsp;&nbsp;<span className="text-cyan-400">specialty</span>:{' '}
                      <span className="text-amber-300">&apos;Modern 3D & Responsive UI/UX&apos;</span>,
                      <br />
                      &nbsp;&nbsp;<span className="text-cyan-400">status</span>:{' '}
                      <span className="text-emerald-400">&apos;Ready to build something extraordinary&apos;</span>
                      <br />
                      &#125;;
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 hidden md:block"
        >
          <a href="#about" className="flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
            <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Scroll Down</span>
            <div className="w-5 h-9 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center p-1">
              <div className="w-1.5 h-2 bg-gray-400 dark:bg-gray-600 rounded-full mt-1 animate-bounce" />
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}