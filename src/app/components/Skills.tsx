'use client';

import dynamic from 'next/dynamic';
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
import TiltCard3D from './3d/TiltCard3D';

const Skills3D = dynamic(() => import('./3d/Skills3D'), {
  ssr: false,
  loading: () => <div className="h-64 sm:h-80 flex items-center justify-center text-xs text-gray-500">Loading 3D Visualizer...</div>,
});

const skills = [
  {
    category: "Frontend Dev",
    items: [
      { name: "React", icon: <FaReact />, level: 95, color: "text-[#61dafb]", barColor: "from-[#61dafb] to-[#1d4ed8]" },
      { name: "Next.js", icon: <SiNextdotjs />, level: 90, color: "text-gray-800 dark:text-white", barColor: "from-gray-500 to-gray-950 dark:from-slate-400 dark:to-white" },
      { name: "TypeScript", icon: <SiTypescript />, level: 85, color: "text-[#3178c6]", barColor: "from-[#3178c6] to-blue-800" },
      { name: "Tailwind CSS", icon: <SiTailwindcss />, level: 90, color: "text-[#38bdf8]", barColor: "from-[#38bdf8] to-cyan-700" },
      { name: "Redux / Toolkit", icon: <SiRedux />, level: 80, color: "text-[#764abc]", barColor: "from-[#764abc] to-purple-800" },
    ]
  },
  {
    category: "Backend Engine",
    items: [
      { name: "Node.js / Express", icon: <FaNodeJs />, level: 90, color: "text-[#339933]", barColor: "from-[#339933] to-green-700" },
      { name: ".NET Core", icon: <SiDotnet />, level: 85, color: "text-[#512bd4]", barColor: "from-[#512bd4] to-violet-800" },
      { name: "REST APIs", icon: <SiExpress />, level: 95, color: "text-gray-500", barColor: "from-gray-400 to-gray-700" },
      { name: "GraphQL", icon: <SiGraphql />, level: 75, color: "text-[#e10098]", barColor: "from-[#e10098] to-pink-700" },
    ]
  },
  {
    category: "Databases & Tools",
    items: [
      { name: "MongoDB", icon: <SiMongodb />, level: 85, color: "text-[#47a248]", barColor: "from-[#47a248] to-emerald-700" },
      { name: "PostgreSQL", icon: <SiPostgresql />, level: 80, color: "text-[#4169e1]", barColor: "from-[#4169e1] to-blue-850" },
      { name: "Cloudinary", icon: <SiCloudinary />, level: 75, color: "text-[#3448c5]", barColor: "from-[#3448c5] to-indigo-700" },
      { name: "GitHub Integration", icon: <SiGithub />, level: 85, color: "text-orange-500", barColor: "from-orange-400 to-orange-700" },
      { name: "Git Versioning", icon: <FaGitAlt />, level: 95, color: "text-[#f05032]", barColor: "from-[#f05032] to-red-700" },
    ]
  }
];

const tools = [
  { name: "HTML5", icon: <FaHtml5 className="text-[#e34f26]" />, glow: "hover:border-[#e34f26]/30 hover:shadow-[#e34f26]/10" },
  { name: "CSS3", icon: <FaCss3Alt className="text-[#1572b6]" />, glow: "hover:border-[#1572b6]/30 hover:shadow-[#1572b6]/10" },
  { name: "JavaScript", icon: <FaJsSquare className="text-[#f7df1e]" />, glow: "hover:border-[#f7df1e]/30 hover:shadow-[#f7df1e]/10" },
  { name: "VS Code", icon: <span className="text-[#007acc] font-bold text-2xl">VSC</span>, glow: "hover:border-[#007acc]/30 hover:shadow-[#007acc]/10" },
  { name: "VS 2022", icon: <span className="text-[#5c2d91] font-bold text-2xl">VS</span>, glow: "hover:border-[#5c2d91]/30 hover:shadow-[#5c2d91]/10" },
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 relative bg-background transition-colors duration-300">
      {/* Background glow orbs */}
      <div className="absolute top-1/2 left-0 w-[250px] h-[250px] rounded-full bg-accent/5 dark:bg-accent/10 glow-blur -z-10" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
            Technical Stack
          </h2>
          <div className="h-1.5 w-20 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-6" />
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
            I utilize a modern toolbox of frameworks, languages, and testing libraries to engineer high-fidelity digital solutions.
          </p>
        </motion.div>

        {/* 3D Interactive Visualizer Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-14 relative overflow-hidden rounded-3xl glass-panel border border-card-border p-6 sm:p-8 bg-gradient-to-b from-primary/5 via-slate-900/40 to-slate-950/60"
        >
          <div className="grid lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-5 text-left space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-semibold uppercase tracking-wider">
                <span>✦ 3D Architecture ✦</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Interactive <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Tech Cosmos</span>
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Seamlessly uniting high-performance backend microservices with real-time 3D WebGL graphics and modern responsive frontends.
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-mono pt-2">
                <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-primary font-bold">Three.js</span>
                <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-secondary font-bold">React Three Fiber</span>
                <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-accent font-bold">GLSL Shaders</span>
              </div>
            </div>
            
            <div className="lg:col-span-7 flex justify-center items-center">
              <Skills3D />
            </div>
          </div>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {skills.map((skillCategory, idx) => (
            <motion.div
              key={skillCategory.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="h-full"
            >
              <TiltCard3D
                depth={12}
                glowColor="rgba(99, 102, 241, 0.2)"
                className="glass-panel border border-card-border rounded-3xl p-6 shadow-md relative overflow-hidden group h-full"
              >
                {/* Subtle visual top light */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary opacity-20 group-hover:opacity-100 transition-opacity duration-350" />

                <h3 className="text-xl font-bold mb-8 text-left border-b border-card-border pb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {skillCategory.category}
                </h3>
                
                <div className="space-y-6">
                  {skillCategory.items.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2.5">
                          <div className={`text-xl ${skill.color} p-1 bg-gray-500/5 rounded-md`}>
                            {skill.icon}
                          </div>
                          <span className="font-medium text-sm text-gray-800 dark:text-gray-200">
                            {skill.name}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
                          {skill.level}%
                        </span>
                      </div>
                      
                      {/* Progress Bar Container */}
                      <div className="h-2 bg-gray-200/60 dark:bg-slate-800/80 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                          className={`h-full bg-gradient-to-r ${skill.barColor}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </TiltCard3D>
            </motion.div>
          ))}
        </div>

        {/* Tools and Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold mb-10 text-center tracking-tight">
            Languages & IDEs
          </h3>
          
          <div className="flex flex-wrap justify-center gap-4">
            {tools.map((tech, index) => (
              <TiltCard3D key={index} depth={20} className="w-[105px] h-[105px] rounded-2xl">
                <div className={`flex flex-col items-center justify-center p-4 bg-white/40 dark:bg-slate-900/40 glass-panel border border-card-border rounded-2xl w-full h-full shadow-sm hover:shadow-lg transition-all duration-300 ${tech.glow}`}>
                  <div className="text-3xl mb-2 flex items-center justify-center h-10 w-10">
                    {tech.icon}
                  </div>
                  <span className="font-semibold text-[11px] text-gray-500 dark:text-gray-400 tracking-wide text-center">
                    {tech.name}
                  </span>
                </div>
              </TiltCard3D>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}