// Skills data WITHOUT JSX - only strings for icon names
export interface SkillItem {
  name: string;
  iconName: string; // Changed from JSX to string
  level: number;
  color: string;
}

export interface SkillCategory {
  category: string;
  items: SkillItem[];
}

export const skillsData: SkillCategory[] = [
  {
    category: "Frontend",
    items: [
      { name: "React", iconName: "FaReact", level: 95, color: "text-blue-400" },
      { name: "Next.js", iconName: "SiNextdotjs", level: 90, color: "text-gray-800 dark:text-white" },
      { name: "TypeScript", iconName: "SiTypescript", level: 85, color: "text-blue-600" },
      { name: "Tailwind CSS", iconName: "SiTailwindcss", level: 90, color: "text-cyan-500" },
      { name: "Redux", iconName: "SiRedux", level: 80, color: "text-purple-600" },
    ]
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js/Express", iconName: "FaNodeJs", level: 90, color: "text-green-500" },
      { name: ".NET Core", iconName: "SiDotnet", level: 85, color: "text-purple-600" },
      { name: "REST APIs", iconName: "SiExpress", level: 95, color: "text-gray-500" },
      { name: "GraphQL", iconName: "SiGraphql", level: 75, color: "text-pink-600" },
    ]
  },
  {
    category: "Database & Tools",
    items: [
      { name: "MongoDB", iconName: "SiMongodb", level: 85, color: "text-green-600" },
      { name: "PostgreSQL", iconName: "SiPostgresql", level: 80, color: "text-blue-700" },
      { name: "Cloudinary", iconName: "SiCloudinary", level: 75, color: "text-blue-500" },
      { name: "GitHub", iconName: "SiGithub", level: 70, color: "text-orange-500" },
      { name: "Git", iconName: "FaGitAlt", level: 95, color: "text-orange-600" },
    ]
  }
];

export interface OtherSkill {
  name: string;
  iconName: string;
  iconColor: string;
}

export const otherSkills: OtherSkill[] = [
  { name: "HTML5", iconName: "FaHtml5", iconColor: "text-orange-500" },
  { name: "CSS3", iconName: "FaCss3Alt", iconColor: "text-blue-500" },
  { name: "JavaScript", iconName: "FaJsSquare", iconColor: "text-yellow-400" },
  { name: "VS Code", iconName: "text", iconColor: "text-blue-500" },
  { name: "VS 2022", iconName: "text", iconColor: "text-purple-500" },
];