import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'War Muzamil | Full Stack Developer & MERN Specialist',
  description: 'Portfolio of War Muzamil - Full Stack Developer and MERN Specialist crafting high-performance, modern web applications with React, Next.js, Node.js and MongoDB.',
  keywords: ['War Muzamil', 'MERN Stack Developer', 'Full Stack Developer', 'React Developer', 'Next.js Developer', 'Node.js Developer', 'Kashmir Developer'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.add('light');}else{document.documentElement.classList.remove('light');}}catch(e){}})();`,
          }}
        />
        <link
          rel="icon"
          type="image/svg+xml"
          href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%2307080c'/%3E%3Ctext x='32' y='44' font-family='Arial Black,Arial' font-size='34' font-weight='900' fill='%23ff1e2d' text-anchor='middle'%3EW%3C/text%3E%3C/svg%3E"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Fira+Code:wght@400;500;600&family=Outfit:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </head>
      <body>{children}</body>
    </html>
  )
}