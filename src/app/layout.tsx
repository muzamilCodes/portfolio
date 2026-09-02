import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import DynamicBackground3D from '@/app/components/3d/DynamicBackground3D'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Muzamil War | Full Stack & 3D Web Engineer',
  description: 'Professional portfolio of Muzamil War, showcasing React, Next.js, Three.js, .NET Core, Express.js and TypeScript projects.',
  keywords: ['Muzamil War', 'Full Stack Developer', 'Three.js Developer', 'React 3D', 'Next.js Developer', '.NET Developer', 'Kashmir Developer'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className={`${inter.className} antialiased relative selection:bg-primary/30 selection:text-white`}>
        <DynamicBackground3D />
        <Navbar />
        <main className="min-h-screen relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}