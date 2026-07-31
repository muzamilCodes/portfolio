'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiMenu, FiX, FiSun, FiMoon, FiCode, 
  FiHome, FiUser, FiTool, FiFolder, FiMail, FiDownload 
} from 'react-icons/fi';
import { FaReact, FaNodeJs } from 'react-icons/fa';
import { SiDotnet, SiNextdotjs } from 'react-icons/si';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Synchronize initial theme state from documentElement class
    const isDark = document.documentElement.classList.contains('dark');
    setDarkMode(isDark);
  }, []);

  const toggleTheme = () => {
    const newDark = !darkMode;
    setDarkMode(newDark);
    if (newDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const navItems = [
    { name: 'Home', icon: <FiHome className="text-lg" />, href: '#home' },
    { name: 'About', icon: <FiUser className="text-lg" />, href: '#about' },
    { name: 'Skills', icon: <FiTool className="text-lg" />, href: '#skills' },
    { name: 'Projects', icon: <FiFolder className="text-lg" />, href: '#projects' },
    { name: 'Contact', icon: <FiMail className="text-lg" />, href: '#contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 glass-panel shadow-sm bg-white/70 dark:bg-slate-950/70 border-b border-card-border backdrop-blur-md transition-colors duration-300">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo with interactive hover */}
          <motion.a
            href="#home"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="p-2 bg-gradient-to-tr from-primary to-secondary rounded-xl text-white shadow-md shadow-primary/20 group-hover:rotate-12 transition-transform duration-300">
              <FiCode className="text-xl" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Muzamil War
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wider uppercase">
                Portfolio
              </span>
            </div>
            
            {/* Tech badges beside logo */}
            <div className="hidden lg:flex items-center space-x-2 ml-4 border-l border-card-border pl-4">
              <FaReact className="text-[#61dafb] hover:scale-125 transition-transform" title="React" />
              <SiNextdotjs className="text-gray-800 dark:text-white hover:scale-125 transition-transform" title="Next.js" />
              <FaNodeJs className="text-[#339933] hover:scale-125 transition-transform" title="Node.js" />
              <SiDotnet className="text-[#512bd4] hover:scale-125 transition-transform" title=".NET Core" />
            </div>
          </motion.a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-1 border border-card-border bg-white/40 dark:bg-slate-900/40 p-1.5 rounded-full">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:bg-gray-100/50 dark:hover:bg-slate-800/50 transition-all duration-300"
                >
                  {item.icon}
                  <span>{item.name}</span>
                </a>
              ))}
            </div>
            
            {/* Dark Mode Toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-3 rounded-full border border-card-border bg-white/80 dark:bg-slate-900/80 text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-primary hover:shadow-lg transition-all duration-300"
              aria-label="Toggle theme"
            >
              {darkMode ? <FiSun className="text-lg text-amber-500 animate-spin-slow" /> : <FiMoon className="text-lg" />}
            </motion.button>

            {/* Premium Download CV Button */}
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="/resume.html"
              download
              className="px-6 py-2.5 bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 text-white rounded-full font-semibold text-sm shadow-md shadow-primary/20 flex items-center gap-2 transition-all duration-300"
            >
              <FiDownload className="text-sm" />
              <span>Download CV</span>
            </motion.a>
          </div>

          {/* Mobile Navigation controls */}
          <div className="flex items-center space-x-4 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full border border-card-border bg-white/80 dark:bg-slate-900/80"
              aria-label="Toggle theme"
            >
              {darkMode ? <FiSun className="text-amber-500" /> : <FiMoon />}
            </button>
            <button
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-800 dark:text-gray-200 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 bg-white/95 dark:bg-slate-950/95 border border-card-border rounded-2xl overflow-hidden p-4 space-y-3"
            >
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-3 p-3 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:bg-gray-100/50 dark:hover:bg-slate-800/50 rounded-xl transition-all font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="text-primary">{item.icon}</div>
                  <span>{item.name}</span>
                </a>
              ))}
              <div className="pt-2 border-t border-card-border">
                <a
                  href="/resume.html"
                  download
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center space-x-2 w-full p-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold shadow-md"
                >
                  <FiDownload />
                  <span>Download CV</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}