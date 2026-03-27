'use client';

import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiDownload } from 'react-icons/fi';
import { TypeAnimation } from 'react-type-animation';
import Image from 'next/image';

const bubbles = [
  { x: -40, y: 20, delay: 0.1 },
  { x: 30, y: -25, delay: 0.2 },
  { x: -15, y: 35, delay: 0.3 },
  { x: 45, y: 15, delay: 0.4 },
  { x: -25, y: -30, delay: 0.5 },
  { x: 20, y: 40, delay: 0.6 },
  { x: -50, y: 5, delay: 0.7 },
  { x: 10, y: -40, delay: 0.8 },
  { x: 35, y: 25, delay: 0.9 },
  { x: -30, y: -20, delay: 0.4 },
  { x: 15, y: 15, delay: 0.3 },
  { x: -10, y: 30, delay: 0.45 },
  { x: 40, y: -10, delay: 0.55 },
  { x: -20, y: 45, delay: 0.65 },
  { x: 25, y: -35, delay: 0.75 },
  { x: -5, y: 10, delay: 0.25 },
  { x: 50, y: -15, delay: 0.85 },
  { x: -35, y: 20, delay: 0.95 },
  { x: 5, y: -32, delay: 0.15 },
  { x: -45, y: -5, delay: 1.05 },
];

export default function Hero() {

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Animated Elements */}
      <div className="absolute inset-0 -z-10">
        {bubbles.map((bubble, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-500 rounded-full"
            animate={{
              x: [0, bubble.x],
              y: [0, bubble.y],
            }}
            transition={{
              duration: 2,
              delay: bubble.delay,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>
      

      <div className="container mx-auto px-6 py-20 text-center">
        {/* Profile Image */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="w-48 h-48 mx-auto mb-8 rounded-full border-4 border-blue-500 overflow-hidden relative"
        >
          {/* Use a reliable photo: public/profile.jpg or fallback avatar */}
          <Image
            src="https://avatars.dicebear.com/api/identicon/war-muzamil.svg"
            alt="War Muzamil"
            fill
            className="object-cover"
            unoptimized
            sizes="(max-width: 1024px) 192px, 192px"
            priority
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            Hi, I&apos;m <span className="text-blue-600 dark:text-blue-400">War Muzamil</span>
          </h1>
          
          <div className="text-2xl md:text-3xl font-semibold mb-6 h-12">
            <TypeAnimation
              sequence={[
                'Full Stack Developer',
                2000,
                'React & Next.js Expert',
                2000,
                '.NET Core Developer',
                2000,
                'Express.js Backend',
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
            Building scalable web applications with modern technologies. 
            Specializing in React, Next.js, Node.js/Express, and .NET Core.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#projects"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              View My Work
            </motion.a>
            
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/resume.html"
              download
              className="px-8 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors flex items-center gap-2"
            >
              <FiDownload />
              Download CV
            </motion.a>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6">
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
                whileHover={{ scale: 1.15, y: -5 }}
                className="text-2xl text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-300 transition-transform"
                aria-label={social.label}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}