import type { Metadata, Viewport } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://aminormal.vercel.app'),
  title: 'Am I Normal? | Find out how you compare',
  description:
    'Anonymous questions. Honest percentages. Find out if your habits are normal — or totally unique.',
  openGraph: {
    title: 'Am I Normal?',
    description:
      'Find out if your habits, opinions and behaviors are normal — or totally unique.',
    url: 'https://aminormal.vercel.app',
    siteName: 'Am I Normal?',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Am I Normal?',
    description: 'Find out if your habits, opinions and behaviors are normal — or totally unique.',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${geist.variable} h-full`}>
      <body className="min-h-full bg-background text-primary antialiased font-sans">{children}</body>
    </html>
  )
}
