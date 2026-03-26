export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  githubUrl: string;
  liveUrl?: string;
  image: string;
  features: string[];
}

export const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce with React.js and Express.js",
    longDescription: "A complete e-commerce solution with user authentication, payment integration, admin dashboard, and real-time inventory management.",
    tech: ["React.js", "Express.js", "MongoDB", "Node.js", "React-router-dom", "Redux"],
    githubUrl: "https://github.com/muzamilCodes/organic-food-kashmir",
    liveUrl: "https://new-soprtify-kashmir.vercel.app/",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop",
    features: [
      "User authentication & authorization",
      "Payment gateway integration",
      "Admin dashboard with analytics",
      "Real-time notifications",
      "Product search & filtering",
      "Order tracking system"
    ]
  },
  {
    id: 2,
    title: "Blog Platform",
    description: "Modern blogging platform with CMS",
    longDescription: "A feature-rich blogging platform with content management system, SEO optimization, and social features.",
    tech: ["Next.js 14", "TypeScript", "Tailwind CSS", "MongoDB"],
    githubUrl: "https://github.com/muzamilCodes/blog-platform",
    liveUrl: "https://blogplatform.demo",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=400&fit=crop",
    features: [
      "SSR for SEO optimization",
      "Rich text editor",
      "Comment system",
      "User roles & permissions",
      "Analytics dashboard",
      "Social sharing"
    ]
  },
  // {
  //   id: 3,
  //   title: "Task Management App",
  //   description: "Productivity app for task management",
  //   longDescription: "A responsive task management application with drag & drop features, priority settings, and progress tracking.",
  //   tech: ["React", "TypeScript", "Tailwind CSS", "Context API", "Local Storage"],
  //   githubUrl: "https://github.com/muzamilCodes/task-manager",
  //   liveUrl: "https://task-manager-muzamil.vercel.app",
  //   image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop",
  //   features: [
  //     "Drag & drop interface",
  //     "Priority & deadline settings",
  //     "Progress tracking",
  //     "Dark/Light mode",
  //     "Local storage",
  //     "Responsive design"
  //   ]
  // },
  {
    id: 4,
    title: "Portfolio Website",
    description: "Personal portfolio with modern design",
    longDescription: "A responsive portfolio website showcasing projects, skills, and experience with animations and contact form.",
    tech: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion"],
    githubUrl: "https://github.com/muzamilCodes/portfolio",
    liveUrl: "https://muzamilcodes.vercel.app",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    features: [
      "Responsive design",
      "Smooth animations",
      "Project showcase",
      "Contact form",
      "Dark/Light mode",
      "SEO optimized"
    ]
  },
  // {
  //   id: 5,
  //   title: "API Dashboard",
  //   description: "Monitoring dashboard for APIs",
  //   longDescription: "A comprehensive dashboard to monitor, analyze, and manage multiple APIs with performance metrics and logging.",
  //   tech: ["Next.js", "Node.js", "Express.js", "MongoDB", "Chart.js"],
  //   githubUrl: "https://github.com/muzamilCodes/api-dashboard",
  //   liveUrl: "https://apidashboard.demo",
  //   image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
  //   features: [
  //     "Real-time API monitoring",
  //     "Performance analytics",
  //     "Error tracking & logging",
  //     "Rate limiting visualization",
  //     "Automated alerts",
  //     "Historical data analysis"
  //   ]
  // },
  // {
  //   id: 6,
  //   title: "HealthCare App",
  //   description: "Healthcare appointment booking system",
  //   longDescription: "A platform for patients to book appointments with doctors, view medical records, and receive health tips.",
  //   tech: ["React", "Node.js", "MongoDB", "Express", "JWT", "Bootstrap"],
  //   githubUrl: "https://github.com/muzamilCodes/healthcare-system",
  //   liveUrl: "https://healthcare.demo",
  //   image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop",
  //   features: [
  //     "Doctor appointment booking",
  //     "Patient medical records",
  //     "Prescription management",
  //     "Video consultation feature",
  //     "Medicine reminder system",
  //     "Health blog & tips"
  //   ]
  // }
];  