'use client';

import { useEffect, useRef } from 'react';
import { startFrameEngine } from '@/app/utils/frameEngine';
import { attachCardTilt, startThreeLayer } from '@/app/utils/threeLayer';

export default function TemplatePortfolio() {
  const bgCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const threeCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const framesNoticeRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const typedRoleRef = useRef<HTMLSpanElement | null>(null);
  const yearRef = useRef<HTMLSpanElement | null>(null);
  const navPillRef = useRef<HTMLElement | null>(null);
  const mobileToggleRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const cleanups: Array<() => void> = [];

    if (bgCanvasRef.current) {
      cleanups.push(
        startFrameEngine({
          canvas: bgCanvasRef.current,
          progressBar: progressBarRef.current,
          framesNotice: framesNoticeRef.current,
          typedRoleEl: typedRoleRef.current,
          yearEl: yearRef.current,
          navPillMenu: navPillRef.current,
          mobileToggle: mobileToggleRef.current,
        })
      );
    }
    if (threeCanvasRef.current) {
      cleanups.push(startThreeLayer(threeCanvasRef.current));
    }
    cleanups.push(attachCardTilt());

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <>
      {/* Top Red Scroll Progress Bar */}
      <div id="scroll-progress" ref={progressBarRef} />

      {/* Background Canvas (scroll-driven frame engine) */}
      <div id="canvas-container">
        <canvas id="bg-canvas" ref={bgCanvasRef} />
      </div>

      {/* Three.js 3D Layer */}
      <canvas id="three3d-canvas" ref={threeCanvasRef} />

      {/* Subtle Vignette */}
      <div className="vignette-overlay" />

      {/* Floating Pill Navigation */}
      <div className="nav-wrapper">
        <button className="mobile-menu-btn" id="mobile-toggle" ref={mobileToggleRef} aria-label="Toggle navigation">
          <i className="fa-solid fa-bars" />
          <span>Menu</span>
        </button>
        <nav className="nav-pill" id="nav-pill-menu" ref={navPillRef}>
          <a href="#hero" className="nav-link active">Home</a>
          <a href="#about" className="nav-link">About</a>
          <a href="#services" className="nav-link">Services</a>
          <a href="#projects" className="nav-link">Projects</a>
          <a href="#skills" className="nav-link">Skills</a>
          <a href="#journey" className="nav-link">Journey</a>
          <a href="#contact" className="nav-link">Contact</a>
        </nav>
      </div>

      {/* Floating Social Icon Dock */}
      <aside className="social-dock" aria-label="Social connections">
        <a href="https://github.com/muzamilCodes" target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="GitHub">
          <i className="fa-brands fa-github" />
        </a>
        <a href="https://www.linkedin.com/in/muzamilCodes" target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="LinkedIn">
          <i className="fa-brands fa-linkedin-in" />
        </a>
        <a href="https://x.com/MuzamilCoder" target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="Twitter / X">
          <i className="fa-brands fa-x-twitter" />
        </a>
        <a href="mailto:warmuzamil68@gmail.com" className="social-icon-btn" title="Send Email">
          <i className="fa-solid fa-envelope" />
        </a>
        <a href="https://wa.me/919682645127" target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="WhatsApp">
          <i className="fa-brands fa-whatsapp" />
        </a>
      </aside>

      {/* Frames Notice */}
      <div id="frames-status-notice" ref={framesNoticeRef}>
        <span
          className="notice-close"
          onClick={() => {
            if (framesNoticeRef.current) framesNoticeRef.current.style.display = 'none';
          }}
        >
          &times;
        </span>
        <strong style={{ color: '#fff', display: 'block', marginBottom: 4 }}>
          <i className="fa-solid fa-circle-info" style={{ color: 'var(--accent)' }} /> Frame Sequence Engine
        </strong>
        Place your extracted <code>img_00001.jpg</code> to <code>img_00192.jpg</code> in the{' '}
        <code>public/frames/</code> folder to unlock the full video scroll animation.
      </div>

      {/* MAIN CONTENT (7 SECTIONS) */}
      <main>
        {/* 1. HERO */}
        <section id="hero">
          <div className="hero-top-row">
            <div className="glass-badge">
              <span className="badge-indicator" />
              <span>Available for Freelance & Full-Time</span>
            </div>
          </div>

          <div className="hero-bottom-container">
            <div className="hero-text-block">
              <h1 className="display-title">
                WAR <span className="text-accent">MUZAMIL</span>
              </h1>
              <div className="hero-subtitle">
                <span id="typed-role" ref={typedRoleRef}>Full Stack Developer</span>
                <span className="cursor-blink" />
              </div>
              <p className="hero-description">
                Specialized in crafting scalable, robust web platforms with React, Next.js, Node.js, Express, and
                MongoDB. Delivering fluid user experiences paired with modern backend architectures.
              </p>
              <div className="hero-actions">
                <a href="#projects" className="btn btn-primary">
                  <span>View Projects</span>
                  <i className="fa-solid fa-arrow-right" />
                </a>
                <a href="/resume.html" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  <i className="fa-solid fa-file-arrow-down" />
                  <span>View & Download CV</span>
                </a>
              </div>
            </div>

            <div className="hero-edge-badge">
              <div className="stat-row">
                <span className="stat-lbl">Primary Expertise</span>
                <span className="stat-val text-accent" style={{ fontSize: '1.1rem', fontFamily: 'var(--font-mono)' }}>
                  MERN STACK
                </span>
              </div>
              <div className="stat-row">
                <span className="stat-lbl">Experience</span>
                <span className="stat-val">1+ Years</span>
              </div>
              <div className="stat-row">
                <span className="stat-lbl">Completed Projects</span>
                <span className="stat-val">7+ Shipped</span>
              </div>
              <div className="stat-row">
                <span className="stat-lbl">Location</span>
                <span className="stat-lbl" style={{ color: '#fff', fontWeight: 600 }}>Kashmir, India</span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. ABOUT */}
        <section id="about">
          <div style={{ width: '100%' }}>
            <div className="section-title-wrap">
              <div className="section-number">01 // Overview</div>
              <h2 className="section-heading">ABOUT <span className="text-accent">ME</span></h2>
            </div>

            <div className="about-grid">
              <div className="glass-card">
                <p className="about-lead">
                  I am a motivated <strong style={{ color: '#fff' }}>Full Stack Developer / MERN Specialist</strong>{' '}
                  with hands-on experience building dynamic, data-driven web applications that solve real-world
                  problems.
                </p>
                <p className="about-bio">
                  From architecting responsive frontends with React and Next.js to building robust RESTful APIs with
                  Node.js, Express, and databases like MongoDB and PostgreSQL, I prioritize clean architecture,
                  performance, and intuitive UX design.
                </p>

                <div className="stats-matrix">
                  <div className="stat-card-mini">
                    <div className="num">1+</div>
                    <div className="label">Years Practical Exp</div>
                  </div>
                  <div className="stat-card-mini">
                    <div className="num">7+</div>
                    <div className="label">Shipped Projects</div>
                  </div>
                  <div className="stat-card-mini">
                    <div className="num">15+</div>
                    <div className="label">Happy Clients</div>
                  </div>
                  <div className="stat-card-mini">
                    <div className="num">100%</div>
                    <div className="label">Clean Code Quality</div>
                  </div>
                </div>
              </div>

              <div className="profile-card-side">
                <div className="profile-avatar-box">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/muzamil.jpg" alt="War Muzamil" className="profile-avatar-img" />
                  <div className="avatar-overlay-badge">
                    <div>
                      <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>War Muzamil</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--accent)' }}>Software & Web Developer</div>
                    </div>
                    <div className="glass-badge" style={{ padding: '0.25rem 0.6rem', fontSize: '0.7rem' }}>
                      Handwara, J&K
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. SERVICES */}
        <section id="services">
          <div style={{ width: '100%' }}>
            <div className="section-title-wrap">
              <div className="section-number">02 // Capabilities</div>
              <h2 className="section-heading">MY <span className="text-accent">SERVICES</span></h2>
            </div>

            <div className="services-grid">
              <div className="glass-card service-card">
                <div className="service-icon"><i className="fa-solid fa-laptop-code" /></div>
                <h3 className="service-title">Full Stack Web Development</h3>
                <p className="service-desc">
                  End-to-end web applications engineered from scratch. Robust frontends connected smoothly with
                  backend services, authentication, and state management.
                </p>
                <ul className="service-bullets">
                  <li><i className="fa-solid fa-check" /> React.js & Next.js Architecture</li>
                  <li><i className="fa-solid fa-check" /> Modular Component System</li>
                  <li><i className="fa-solid fa-check" /> Responsive Mobile First UI</li>
                </ul>
              </div>

              <div className="glass-card service-card">
                <div className="service-icon"><i className="fa-solid fa-server" /></div>
                <h3 className="service-title">Backend & REST APIs</h3>
                <p className="service-desc">
                  High-throughput backend architectures using Node.js, Express.js, and .NET Core. Secure RESTful API
                  designs with JWT authentication and middleware.
                </p>
                <ul className="service-bullets">
                  <li><i className="fa-solid fa-check" /> Express.js & Node.js Endpoints</li>
                  <li><i className="fa-solid fa-check" /> JWT Auth & Route Protection</li>
                  <li><i className="fa-solid fa-check" /> Third-party API Integrations</li>
                </ul>
              </div>

              <div className="glass-card service-card">
                <div className="service-icon"><i className="fa-solid fa-database" /></div>
                <h3 className="service-title">Database Architecture</h3>
                <p className="service-desc">
                  Optimized database schema design, indexing, and aggregations for both NoSQL and relational engines
                  to guarantee data consistency.
                </p>
                <ul className="service-bullets">
                  <li><i className="fa-solid fa-check" /> MongoDB & Mongoose Schemas</li>
                  <li><i className="fa-solid fa-check" /> PostgreSQL Relational Design</li>
                  <li><i className="fa-solid fa-check" /> Fast Query Execution</li>
                </ul>
              </div>

              <div className="glass-card service-card">
                <div className="service-icon"><i className="fa-solid fa-bolt" /></div>
                <h3 className="service-title">UI/UX & Performance</h3>
                <p className="service-desc">
                  Polished interfaces featuring glassmorphism, micro-interactions, smooth scrolling, and aggressive
                  web performance optimization for top Lighthouse scores.
                </p>
                <ul className="service-bullets">
                  <li><i className="fa-solid fa-check" /> Tailwind CSS & Glassmorphism</li>
                  <li><i className="fa-solid fa-check" /> SEO & Core Web Vitals</li>
                  <li><i className="fa-solid fa-check" /> Vercel & Netlify Deployment</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 4. PROJECTS */}
        <section id="projects">
          <div style={{ width: '100%' }}>
            <div className="section-title-wrap">
              <div className="section-number">03 // Portfolio</div>
              <h2 className="section-heading">FEATURED <span className="text-accent">PROJECTS</span></h2>
            </div>

            <div className="projects-grid">
              {/* Project 1 */}
              <div className="glass-card project-card">
                <div className="project-thumb">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop"
                    alt="StudyMaterial Platform"
                  />
                  <span className="project-status-tag">
                    <i className="fa-solid fa-circle text-accent" /> Live Demo
                  </span>
                </div>
                <h3 className="project-name">StudyMaterial Platform</h3>
                <p className="project-desc">
                  Smart learning platform providing class-wise educational materials, notes, 10-year solved board
                  papers, and interactive quizzes for students across medical, commerce, and non-med streams.
                </p>
                <div className="tech-pill-row">
                  <span className="tech-pill">Next.js</span>
                  <span className="tech-pill">React</span>
                  <span className="tech-pill">MongoDB</span>
                  <span className="tech-pill">Tailwind CSS</span>
                  <span className="tech-pill">TypeScript</span>
                </div>
                <div className="project-links">
                  <a
                    href="https://study-meterial-eight.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                  >
                    <span>Live Demo</span>
                    <i className="fa-solid fa-arrow-up-right-from-square" />
                  </a>
                  <a
                    href="https://github.com/muzamilCodes/study-material-eight"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-sm"
                  >
                    <i className="fa-brands fa-github" />
                    <span>Code</span>
                  </a>
                </div>
              </div>

              {/* Project 2 */}
              <div className="glass-card project-card">
                <div className="project-thumb">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=400&fit=crop"
                    alt="Quick Services Marketplace"
                  />
                  <span className="project-status-tag">
                    <i className="fa-solid fa-circle text-accent" /> Live Demo
                  </span>
                </div>
                <h3 className="project-name">Quick Services Marketplace</h3>
                <p className="project-desc">
                  On-demand local services platform connecting users with local service providers. Features OTP
                  verification, real-time booking dashboards, and user reviews.
                </p>
                <div className="tech-pill-row">
                  <span className="tech-pill">React.js</span>
                  <span className="tech-pill">Node.js</span>
                  <span className="tech-pill">Express.js</span>
                  <span className="tech-pill">MongoDB</span>
                  <span className="tech-pill">REST APIs</span>
                </div>
                <div className="project-links">
                  <a
                    href="https://quick-services-indol.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                  >
                    <span>Live Demo</span>
                    <i className="fa-solid fa-arrow-up-right-from-square" />
                  </a>
                  <a
                    href="https://github.com/muzamilCodes/QuickServices"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-sm"
                  >
                    <i className="fa-brands fa-github" />
                    <span>Code</span>
                  </a>
                </div>
              </div>

              {/* Project 3 */}
              <div className="glass-card project-card">
                <div className="project-thumb">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop"
                    alt="Talexa Job Portal"
                  />
                  <span className="project-status-tag">
                    <i className="fa-solid fa-circle text-accent" /> Enterprise
                  </span>
                </div>
                <h3 className="project-name">Talexa Job Recruitment Portal</h3>
                <p className="project-desc">
                  Enterprise recruitment and matchmaking platform for talent discovery, CV screenings, role-based
                  access for applicants and hiring managers.
                </p>
                <div className="tech-pill-row">
                  <span className="tech-pill">React.js</span>
                  <span className="tech-pill">Next.js</span>
                  <span className="tech-pill">Node.js</span>
                  <span className="tech-pill">PostgreSQL</span>
                  <span className="tech-pill">Express.js</span>
                </div>
                <div className="project-links">
                  <a
                    href="https://talexa.ilsimperiatech.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                  >
                    <span>Live Portal</span>
                    <i className="fa-solid fa-arrow-up-right-from-square" />
                  </a>
                  <a
                    href="https://github.com/muzamilCodes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-sm"
                  >
                    <i className="fa-brands fa-github" />
                    <span>Profile</span>
                  </a>
                </div>
              </div>

              {/* Project 4 */}
              <div className="glass-card project-card">
                <div className="project-thumb">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=800&h=400&fit=crop"
                    alt="ASIAN MALL E-Commerce"
                  />
                  <span className="project-status-tag">
                    <i className="fa-solid fa-circle text-accent" /> Live Demo
                  </span>
                </div>
                <h3 className="project-name">ASIAN MALL E-Commerce</h3>
                <p className="project-desc">
                  Modern retail shopping mall platform with responsive landing pages, interactive store directory,
                  dynamic catalog filtering, and sleek product showcases.
                </p>
                <div className="tech-pill-row">
                  <span className="tech-pill">Next.js</span>
                  <span className="tech-pill">React</span>
                  <span className="tech-pill">Tailwind CSS</span>
                  <span className="tech-pill">Framer Motion</span>
                </div>
                <div className="project-links">
                  <a
                    href="https://asian-mall.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                  >
                    <span>Live Demo</span>
                    <i className="fa-solid fa-arrow-up-right-from-square" />
                  </a>
                  <a
                    href="https://github.com/muzamilCodes/ASIAN-MALL"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-sm"
                  >
                    <i className="fa-brands fa-github" />
                    <span>Code</span>
                  </a>
                </div>
              </div>

              {/* Project 5 */}
              <div className="glass-card project-card">
                <div className="project-thumb">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&h=400&fit=crop"
                    alt="Sportify Kashmir V2"
                  />
                  <span className="project-status-tag">
                    <i className="fa-solid fa-circle text-accent" /> Live Demo
                  </span>
                </div>
                <h3 className="project-name">Sportify Kashmir Store (V2)</h3>
                <p className="project-desc">
                  Upgraded e-commerce platform engineered for sports gear and custom athletic apparel. Incorporates cart
                  state management and high-speed checkout flows.
                </p>
                <div className="tech-pill-row">
                  <span className="tech-pill">React.js</span>
                  <span className="tech-pill">Vite</span>
                  <span className="tech-pill">Tailwind CSS</span>
                  <span className="tech-pill">Context API</span>
                  <span className="tech-pill">Node.js</span>
                </div>
                <div className="project-links">
                  <a
                    href="https://new-soprtify-kashmir.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                  >
                    <span>Live Demo</span>
                    <i className="fa-solid fa-arrow-up-right-from-square" />
                  </a>
                  <a
                    href="https://github.com/muzamilCodes/new-soprtify-kashmir"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-sm"
                  >
                    <i className="fa-brands fa-github" />
                    <span>Code</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. SKILLS */}
        <section id="skills">
          <div style={{ width: '100%' }}>
            <div className="section-title-wrap">
              <div className="section-number">04 // Technologies</div>
              <h2 className="section-heading">TECH <span className="text-accent">STACK</span></h2>
            </div>

            <div className="skills-container">
              {/* Frontend */}
              <div className="skills-category-group">
                <div className="skills-group-title">
                  <i className="fa-solid fa-code" />
                  <span>Frontend Architecture</span>
                </div>
                <div className="skills-chips-grid">
                  <div className="skill-chip">
                    <i className="devicon-react-original colored" />
                    <span className="skill-name">React.js</span>
                  </div>
                  <div className="skill-chip">
                    <i className="devicon-nextjs-plain" style={{ color: '#fff' }} />
                    <span className="skill-name">Next.js</span>
                  </div>
                  <div className="skill-chip">
                    <i className="devicon-typescript-plain colored" />
                    <span className="skill-name">TypeScript</span>
                  </div>
                  <div className="skill-chip">
                    <i className="devicon-javascript-plain colored" />
                    <span className="skill-name">JavaScript</span>
                  </div>
                  <div className="skill-chip">
                    <i className="devicon-tailwindcss-original colored" />
                    <span className="skill-name">Tailwind CSS</span>
                  </div>
                  <div className="skill-chip">
                    <i className="devicon-redux-original colored" />
                    <span className="skill-name">Redux</span>
                  </div>
                  <div className="skill-chip">
                    <i className="devicon-html5-plain colored" />
                    <span className="skill-name">HTML5</span>
                  </div>
                  <div className="skill-chip">
                    <i className="devicon-css3-plain colored" />
                    <span className="skill-name">CSS3</span>
                  </div>
                </div>
              </div>

              {/* Backend & DB */}
              <div className="skills-category-group">
                <div className="skills-group-title">
                  <i className="fa-solid fa-server" />
                  <span>Backend & Databases</span>
                </div>
                <div className="skills-chips-grid">
                  <div className="skill-chip">
                    <i className="devicon-nodejs-plain colored" />
                    <span className="skill-name">Node.js</span>
                  </div>
                  <div className="skill-chip">
                    <i className="devicon-express-original" style={{ color: '#fff' }} />
                    <span className="skill-name">Express.js</span>
                  </div>
                  <div className="skill-chip">
                    <i className="devicon-dotnetcore-plain colored" />
                    <span className="skill-name">.NET Core</span>
                  </div>
                  <div className="skill-chip">
                    <i className="devicon-mongodb-plain colored" />
                    <span className="skill-name">MongoDB</span>
                  </div>
                  <div className="skill-chip">
                    <i className="devicon-postgresql-plain colored" />
                    <span className="skill-name">PostgreSQL</span>
                  </div>
                  <div className="skill-chip">
                    <i className="devicon-graphql-plain colored" />
                    <span className="skill-name">GraphQL</span>
                  </div>
                </div>
              </div>

              {/* DevOps & Tools */}
              <div className="skills-category-group">
                <div className="skills-group-title">
                  <i className="fa-solid fa-wrench" />
                  <span>DevOps & Tools</span>
                </div>
                <div className="skills-chips-grid">
                  <div className="skill-chip">
                    <i className="devicon-git-plain colored" />
                    <span className="skill-name">Git</span>
                  </div>
                  <div className="skill-chip">
                    <i className="devicon-github-original" style={{ color: '#fff' }} />
                    <span className="skill-name">GitHub</span>
                  </div>
                  <div className="skill-chip">
                    <i className="devicon-vscode-plain colored" />
                    <span className="skill-name">VS Code</span>
                  </div>
                  <div className="skill-chip">
                    <i className="devicon-postman-plain colored" />
                    <span className="skill-name">Postman</span>
                  </div>
                  <div className="skill-chip">
                    <i className="devicon-vitejs-plain colored" />
                    <span className="skill-name">Vite</span>
                  </div>
                  <div className="skill-chip">
                    <i className="devicon-vercel-original" style={{ color: '#fff' }} />
                    <span className="skill-name">Vercel</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. JOURNEY */}
        <section id="journey">
          <div style={{ width: '100%' }}>
            <div className="section-title-wrap">
              <div className="section-number">05 // Milestones</div>
              <h2 className="section-heading">MY <span className="text-accent">JOURNEY</span></h2>
            </div>

            <div className="timeline-wrap">
              <div className="timeline-item">
                <div className="timeline-dot" />
                <div className="timeline-card">
                  <div className="timeline-header">
                    <h3 className="timeline-role">Full Stack Developer</h3>
                    <span className="timeline-period">2024 - Present</span>
                  </div>
                  <div className="timeline-company">ILS (Institute of Language & Software)</div>
                  <p className="timeline-desc">
                    Engineering and maintaining production full-stack web applications with React, Next.js, Node.js,
                    Express, and .NET. Designing scalable REST APIs, managing database integrations, and collaborating
                    with cross-functional teams.
                  </p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-dot" />
                <div className="timeline-card">
                  <div className="timeline-header">
                    <h3 className="timeline-role">Frontend Developer</h3>
                    <span className="timeline-period">2024</span>
                  </div>
                  <div className="timeline-company">ILS (Institute of Language & Software)</div>
                  <p className="timeline-desc">
                    Spearheaded modern responsive UI development using React, Next.js, and Tailwind CSS. Implemented
                    smooth micro-animations, component libraries, and optimized frontend bundle performance.
                  </p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-dot" />
                <div className="timeline-card">
                  <div className="timeline-header">
                    <h3 className="timeline-role">Independent Web Engineering</h3>
                    <span className="timeline-period">2023 - 2024</span>
                  </div>
                  <div className="timeline-company">Freelance & Client Deployments</div>
                  <p className="timeline-desc">
                    Delivered 7+ full-featured web applications including StudyMaterial learning platform, Quick
                    Services marketplace, Asian Mall, and Sportify Kashmir. Deployed to Vercel with automated CI/CD.
                  </p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-dot" />
                <div className="timeline-card">
                  <div className="timeline-header">
                    <h3 className="timeline-role">Higher Secondary Education (12th Pass)</h3>
                    <span className="timeline-period">Completed 2024</span>
                  </div>
                  <div className="timeline-company">Govt Boys Higher Secondary School Qalamabad</div>
                  <p className="timeline-desc">
                    Graduated with focus in Science and Mathematics. Built strong foundational problem solving skills
                    and transitioned deeply into self-taught software engineering and web technologies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. CONTACT */}
        <section id="contact">
          <div className="contact-card-aligned">
            <div className="section-number">06 // Connect</div>
            <h2
              className="section-heading"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', marginBottom: '0.8rem' }}
            >
              LET&apos;S <span className="text-accent">COLLABORATE</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Have a project in mind, an opportunity to discuss, or want to collaborate on cutting-edge software? Reach
              out anytime!
            </p>

            <div className="contact-info-list">
              <a href="mailto:warmuzamil68@gmail.com" className="contact-info-item">
                <div className="contact-icon-circle">
                  <i className="fa-solid fa-envelope" />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-faint)', textTransform: 'uppercase' }}>
                    Email Directly
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}>warmuzamil68@gmail.com</span>
                </div>
              </a>

              <a href="tel:+919682645127" className="contact-info-item">
                <div className="contact-icon-circle">
                  <i className="fa-solid fa-phone" />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-faint)', textTransform: 'uppercase' }}>
                    Phone / Call
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}>+91 9682645127</span>
                </div>
              </a>

              <div className="contact-info-item">
                <div className="contact-icon-circle">
                  <i className="fa-solid fa-location-dot" />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-faint)', textTransform: 'uppercase' }}>
                    Location
                  </div>
                  <span style={{ fontWeight: 500 }}>Handwara, Srinagar / Kashmir, India</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', marginTop: '1.5rem' }}>
              <a
                href="mailto:warmuzamil68@gmail.com?subject=Project%20Inquiry%20from%20Portfolio"
                className="btn btn-primary"
              >
                <i className="fa-solid fa-paper-plane" />
                <span>Send Message</span>
              </a>
              <a href="/resume.html" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                <i className="fa-solid fa-file-invoice" />
                <span>Open Resume</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <p>
          &copy; <span id="year" ref={yearRef} /> War Muzamil. Built with Next.js, Three.js & Canvas animation.
        </p>
      </footer>
    </>
  );
}