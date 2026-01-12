'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMenu, FiX, FiSun, FiMoon, FiCode, FiHome, FiUser, FiTool, FiFolder, FiMail, FiFileText, FiDownload } from 'react-icons/fi';
import { FaReact, FaNodeJs } from 'react-icons/fa';
import { SiDotnet, SiNextdotjs } from 'react-icons/si';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

 const navItems = [
  { name: 'Home', icon: <FiHome />, href: '#home' },
  { name: 'About', icon: <FiUser />, href: '#about' },
  { name: 'Skills', icon: <FiTool />, href: '#skills' },
  { name: 'Projects', icon: <FiFolder />, href: '#projects' },
  
  { name: 'Contact', icon: <FiMail />, href: '#contact' },
];
  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <FiCode className="text-2xl text-blue-600 dark:text-blue-400" />
            <span className="text-xl font-bold">War Muzamil</span>
            <div className="flex space-x-1 ml-4">
              <FaReact className="text-blue-400" title="React" />
              <SiNextdotjs className="text-gray-800 dark:text-white" title="Next.js" />
              <FaNodeJs className="text-green-500" title="Node.js" />
              <SiDotnet className="text-purple-600" title=".NET Core" />
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {item.icon}
                <span>{item.name}</span>
              </a>
            ))}
            
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800"
            >
              {darkMode ? <FiSun /> : <FiMoon />}
            </button>

            {/* Download CV Button */}
             <motion.a
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          href="/resume.html"
                          download
                          className="px-8 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors flex items-center gap-2"
                        >
                          <FiDownload/>
                          Download CV
                        </motion.a>
            {/* <a
              href="/resume.pdf"
              download
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Download CV
            </a> */}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 space-y-4"
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                <span>{item.name}</span>
              </a>
            ))}
          </motion.div>
        )}
      </div>
    </nav>
  );
}