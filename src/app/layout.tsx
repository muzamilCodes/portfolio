import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import DynamicBackground3D from '@/app/components/3d/DynamicBackground3D'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'War Muzamil | MERN Stack & Full Stack Developer',
  description: 'Professional portfolio of War Muzamil, showcasing React.js, Next.js, Node.js, Express.js, MongoDB, .NET Core and TypeScript projects.',
  keywords: ['War Muzamil', 'Muzamil War', 'MERN Stack Developer', 'Full Stack Developer', 'React Developer', 'Next.js Developer', 'Node.js Developer', 'Kashmir Developer'],
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