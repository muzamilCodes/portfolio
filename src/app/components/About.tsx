'use client';

import { motion } from 'framer-motion';
import { FiAward, FiBriefcase, FiUsers, FiCode } from 'react-icons/fi';
import Image from 'next/image';

export default function About() {
  const stats = [
    { icon: <FiBriefcase />, value: '1', label: 'Years Experience' },
    { icon: <FiCode />, value: '3', label: 'Projects Completed' },
    { icon: <FiUsers />, value: '10', label: 'Happy Clients' },
    { icon: <FiAward />, value: '2', label: 'Certifications' },
  ];

  // Square image URLs
  const squareImageUrls = {
    dicebear: "https://scontent.fsxr1-2.fna.fbcdn.net/v/t39.30808-1/298218688_587014296434298_4248133431627928893_n.jpg?stp=c0.0.612.612a_dst-jpg_s200x200_tt6&_nc_cat=107&ccb=1-7&_nc_sid=1d2534&_nc_ohc=xhKiF-xQejMQ7kNvwHqYwwd&_nc_oc=AdnbcszYSRbYrj5RvOX7rJJiNVlK0WTv7KAozEczL18h-V7qK28B84D3Wl235781QJ9hbtN9KKbfIUM7gpJy2SJz&_nc_zt=24&_nc_ht=scontent.fsxr1-2.fna&_nc_gid=5zn5SHts2iIjhhaU-laHYA&oh=00_Afm7qWHMBCARUZBcUchy38wjeVhpVYlUw-Pl7DfT52Gf2Q&oe=695887D8",
  };

  // Choose any image URL
  const profileImageUrl = squareImageUrls.dicebear;

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column with SQUARE Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative w-full max-w-md mx-auto">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                {/* SQUARE Image Container */}
                <div className="relative w-72 h-72 md:w-80 md:h-80 mx-auto">
                  {/* Image Border/Frame */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-20"></div>
                  
                  {/* Main SQUARE Image */}
                  <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800">
                    <Image
                      src={profileImageUrl}
                      alt="Muzamil War - Full Stack Developer"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 288px, 320px"
                      unoptimized={true}
                      priority
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  
                  {/* Name Badge */}
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-900 px-6 py-3 rounded-full shadow-xl border border-gray-200 dark:border-gray-700">
                    <div className="text-center">
                      <h3 className="font-bold text-lg text-gray-800 dark:text-white">Muzamil War</h3>
                      <p className="text-sm text-blue-600 dark:text-blue-400">Full Stack Developer</p>
                    </div>
                  </div>
                </div>

                {/* Tech Icons around image */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="absolute -top-4 -left-4 bg-white dark:bg-gray-800 p-3 rounded-xl shadow-lg"
                >
                  <div className="text-blue-600 dark:text-blue-400 font-bold">React</div>
                </motion.div>
                
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 p-3 rounded-xl shadow-lg"
                >
                  <div className="text-green-600 dark:text-green-400 font-bold">Next.js</div>
                </motion.div>
                
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 p-3 rounded-xl shadow-lg"
                >
                  <div className="text-purple-600 dark:text-purple-400 font-bold">.NET</div>
                </motion.div>
                
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 p-3 rounded-xl shadow-lg"
                >
                  <div className="text-orange-600 dark:text-orange-400 font-bold">Node.js</div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column with Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">About Me</h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-400">
                <p>
                  I'm a passionate Full Stack Developer with expertise in modern web technologies. 
                  I specialize in building scalable applications using React, Next.js, .NET Core, and Express.
                </p>
                <p>
                  With 1 year of experience, I've worked on various projects ranging from 
                  enterprise applications to startup MVPs. I believe in writing clean, maintainable 
                  code and following best practices.
                </p>
                <p>
                  When I'm not coding, I enjoy learning new technologies, contributing to open-source 
                  projects, and sharing knowledge through blog posts and tutorials.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition-shadow"
                >
                  <div className="text-2xl text-blue-600 dark:text-blue-400 mb-2">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold">{stat.value}+</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Experience & Education Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <FiBriefcase className="text-blue-500" />
                  Experience
                </h3>
                <div className="space-y-4">
                  {[
                    { title: 'Full Stack Developer', company: 'ILS', period: '2024' },
                    { title: 'Frontend Developer', company: 'ILS', period: '2024' },
                  ].map((exp, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="border-l-2 border-blue-500 pl-4"
                    >
                      <h4 className="font-bold text-lg">{exp.title}</h4>
                      <p className="text-gray-600 dark:text-gray-400">{exp.company}</p>
                      <p className="text-sm text-gray-500">{exp.period}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <FiAward className="text-green-500" />
                  Education
                </h3>
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="border-l-2 border-green-500 pl-4"
                  >
                    <h4 className="font-bold text-lg">12th Pass</h4>
                    <p className="text-gray-600 dark:text-gray-400">BHSSchool Qalamabad</p>
                    <p className="text-sm text-gray-500">2024</p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}