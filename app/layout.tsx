import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Sunrise In My Life',
  description: 'Accompaniment thérapeutique avec approche gestalt, espace d\'écoute et soutien à Bruxelles | Therapeutic support with Gestalt approach in Brussels',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased flex flex-col min-h-screen`}>
        <main className="flex-1">
          {children}
        </main>
        <footer className="border-t border-border bg-muted py-6 px-4">
          <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Sunrise In My Life. All rights reserved.</p>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  )
}
