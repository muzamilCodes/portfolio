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
    id: 6,
    title: "StudyMaterial Platform",
    description: "Premium smart learning platform providing class-wise educational materials, notes, and solved board papers.",
    longDescription: "StudyMaterial is a next-generation smart learning platform designed for 10th, 11th, and 12th-grade students across Medical, Non-Medical, and Commerce streams. It delivers curated PDF study notes, solved previous year board papers, live interactive classes with expert faculty, and interactive quizzes for self-assessment. Featuring MongoDB database integration, the platform is presented in a premium glassmorphic visual style with a full dark mode experience.",
    tech: ["Next.js", "React.js", "MongoDB", "Tailwind CSS", "TypeScript", "Framer Motion"],
    githubUrl: "https://github.com/muzamilCodes/study-material-eight",
    liveUrl: "https://study-meterial-eight.vercel.app/",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop",
    features: [
      "Class-wise structured notes (10th, 11th, & 12th)",
      "Solved 10-year board examination papers",
      "Interactive live streaming classes with faculty",
      "Self-assessment quizzes with instant scoring",
      "Premium glassmorphic user interface & dark mode",
      "MongoDB database integration for live content dynamic delivery"
    ]
  },
  {
    id: 1,
    title: "Quick Services Marketplace",
    description: "On-demand local services platform connecting clients with service providers.",
    longDescription: "A comprehensive service booking and booking management platform where users can discover, book, and review local service experts. Features real-time notifications, OTP verification, and booking dashboards.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "REST APIs"],
    githubUrl: "https://github.com/muzamilCodes/QuickServices",
    liveUrl: "https://quick-services-indol.vercel.app",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=400&fit=crop",
    features: [
      "User & Provider Authentication",
      "Service Discovery & Filters",
      "OTP Verification System",
      "Service Booking & Schedules",
      "Rating & Review system"
    ]
  },
  {
    id: 2,
    title: "ASIAN MALL E-Commerce",
    description: "Modern retail and shopping mall platform with responsive landing pages.",
    longDescription: "A high-performance online retail experience modeled for shopping malls. Features curated store listings, product catalogs, rich landing pages, and interactive UI/UX filters.",
    tech: ["Next.js", "React.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
    githubUrl: "https://github.com/muzamilCodes/ASIAN-MALL",
    liveUrl: "https://asian-mall.vercel.app",
    image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=800&h=400&fit=crop",
    features: [
      "Refined Landing Page UI & Content",
      "Store Finder & Directory",
      "Dynamic Catalog Filtering",
      "Responsive Layouts",
      "Optimized SEO Meta Tags"
    ]
  },
  {
    id: 3,
    title: "Sportify Kashmir Store",
    description: "Sports goods and apparel e-commerce platform built for Kashmir athletes.",
    longDescription: "An e-commerce storefront dedicated to sport equipment and custom apparel in Kashmir. Integrates cart state management, checkout flows, and payment pathways.",
    tech: ["React.js", "Redux", "Tailwind CSS", "Express.js", "MongoDB"],
    githubUrl: "https://github.com/muzamilCodes/Sportify-Kashmir1",
    liveUrl: "https://sportify-kashmir1.vercel.app",
    image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&h=400&fit=crop",
    features: [
      "Product Catalog",
      "Cart State Management",
      "Secure Checkout",
      "Order History",
      "Custom Sports Apparels"
    ]
  },
  {
    id: 4,
    title: "New Sportify Kashmir (V2)",
    description: "Upgraded performance-tuned version of the Sportify Kashmir store.",
    longDescription: "The next generation of the Sportify Kashmir e-commerce platform, optimizing speed, SEO, and visual aesthetics. Built using modern UI architectures for a premium buying experience.",
    tech: ["React.js", "Vite", "Tailwind CSS", "Context API", "Node.js"],
    githubUrl: "https://github.com/muzamilCodes/new-soprtify-kashmir",
    liveUrl: "https://new-soprtify-kashmir.vercel.app",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&h=400&fit=crop",
    features: [
      "Optimized Fast Loading",
      "Clean Minimalist Design",
      "Smooth Micro-animations",
      "Improved Cart flows",
      "Admin Inventory Controls"
    ]
  },
  {
    id: 5,
    title: "Talexa Job Portal",
    description: "Enterprise recruitment and career matchmaking platform.",
    longDescription: "A modern job recruitment application built for seamless candidate discovery, resume screening, and job match tracking. Integrates separate workflows for job seekers and hiring managers.",
    tech: ["React.js", "Next.js", "Node.js", "Express.js", "PostgreSQL", "Tailwind CSS"],
    githubUrl: "https://github.com/muzamilCodes",
    liveUrl: "https://talexa.ilsimperiatech.com/",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    features: [
      "Job Seeker Profile Creation & CV Upload",
      "Dynamic Job Posting & Custom Filters",
      "Hiring Managers Dashboard",
      "Role-Based Dashboards & Auth",
      "Real-Time Candidate Review flows"
    ]
  }
];

  