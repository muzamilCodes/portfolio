'use client';

import { motion } from 'framer-motion';
import { 
  FaReact, FaNodeJs, FaGitAlt, 
  FaHtml5, FaCss3Alt, FaJsSquare 
} from 'react-icons/fa';
import { 
  SiNextdotjs, SiDotnet, SiExpress, SiMongodb, 
  SiPostgresql, SiTypescript, SiTailwindcss, 
  SiGraphql, SiRedux, 
  SiCloudinary,
  SiGithub
} from 'react-icons/si';

const skills = [
  {
    category: "Frontend",
    items: [
      { name: "React", icon: <FaReact />, level: 95, color: "text-blue-400" },
      { name: "Next.js", icon: <SiNextdotjs />, level: 90, color: "text-gray-800 dark:text-white" },
      { name: "TypeScript", icon: <SiTypescript />, level: 85, color: "text-blue-600" },
      { name: "Tailwind CSS", icon: <SiTailwindcss />, level: 90, color: "text-cyan-500" },
      { name: "Redux", icon: <SiRedux />, level: 80, color: "text-purple-600" },
    ]
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js/Express", icon: <FaNodeJs />, level: 90, color: "text-green-500" },
      { name: ".NET Core", icon: <SiDotnet />, level: 85, color: "text-purple-600" },
      { name: "REST APIs", icon: <SiExpress />, level: 95, color: "text-gray-500" },
      { name: "GraphQL", icon: <SiGraphql />, level: 75, color: "text-pink-600" },
    ]
  },
  {
    category: "Database & Tools",
    items: [
      { name: "MongoDB", icon: <SiMongodb />, level: 85, color: "text-green-600" },
      { name: "PostgreSQL", icon: <SiPostgresql />, level: 80, color: "text-blue-700" },
      { name: "Cloudinary", icon: <SiCloudinary />, level: 75, color: "text-blue-500" },
      { name: "GitHub", icon: <SiGithub />, level: 70, color: "text-orange-500" },
      { name: "Git", icon: <FaGitAlt />, level: 95, color: "text-orange-600" },
    ]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Technical Skills</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Proficient in modern web development technologies and frameworks
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {skills.map((skillCategory, index) => (
            <motion.div
              key={skillCategory.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
            >
              <h3 className="text-2xl font-bold mb-6 text-center text-blue-600 dark:text-blue-400">
                {skillCategory.category}
              </h3>
              
              <div className="space-y-6">
                {skillCategory.items.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className={`text-2xl ${skill.color}`}>
                          {skill.icon}
                        </div>
                        <span className="font-medium">{skill.name}</span>
                      </div>
                      <span className="text-sm font-semibold">{skill.level}%</span>
                    </div>
                    
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className={`h-full bg-gradient-to-r from-blue-500 to-purple-600`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Skills Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold mb-8 text-center">Tools & Technologies</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: "HTML5", icon: <FaHtml5 className="text-orange-500" /> },
              { name: "CSS3", icon: <FaCss3Alt className="text-blue-500" /> },
              { name: "JavaScript", icon: <FaJsSquare className="text-yellow-400" /> },
              { 
                name: "VS Code", 
                icon: <span className="text-blue-500 font-bold text-2xl">VSC</span> 
              },
              { 
                name: "VS 2022", 
                icon: <span className="text-purple-500 font-bold text-2xl">VS</span> 
              },
            ].map((tech, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex flex-col items-center justify-center hover:shadow-lg transition-shadow"
              >
                <div className="text-3xl mb-2">{tech.icon}</div>
                <span className="font-medium text-sm text-center">{tech.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}