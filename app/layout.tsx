import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.klyvora-group.com'),
  title: 'Klyvora Group | Global Accounting & Finance Talent for Real Estate',
  description:
    'Connect with Big-Four-caliber accounting and finance professionals from India. Klyvora Group places elite talent for U.S. real estate investment firms, reducing costs while maintaining uncompromising quality.',
  keywords: [
    'accounting talent',
    'finance professionals',
    'real estate accounting',
    'offshore accounting',
    'financial analysis',
    'talent recruitment',
    'real estate finance',
    'Big Four talent',
  ],
  authors: [{ name: 'Klyvora Group' }],
  creator: 'Klyvora Group',
  publisher: 'Klyvora Group',
  robots:
    'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.klyvora-group.com',
    siteName: 'Klyvora Group',
    title: 'Klyvora Group | Global Accounting & Finance Talent for Real Estate',
    description:
      'Elite accounting and finance professionals from India for U.S. real estate firms. Reduce costs, maintain quality, scale efficiently.',
    images: [
      {
        url: 'https://www.klyvora-group.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Klyvora Group - Global Talent Connection',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Klyvora Group | Global Accounting & Finance Talent',
    description:
      'Elite accounting professionals from India for U.S. real estate firms',
    images: ['https://www.klyvora-group.com/og-image.png'],
  },

  generator: 'v0.app',

  icons: {
    icon: '/favicon.ico',
  },

  alternates: {
    canonical: 'https://www.klyvora-group.com',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#1a2d4a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>

      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  )
}
