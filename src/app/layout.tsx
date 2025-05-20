import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
// import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Contrails AI - AI Solutions for Digital Content Safety ",
  description: "Contrails AI provides solutions to detect manipulated media, misinformation, and harmful content. Protect your digital ecosystem with our advanced AI technology.",
  keywords: "AI, digital security, media verification, misinformation detection, content moderation, artificial intelligence, deepfake detection",
  authors: [{ name: "Contrails AI" }],
  creator: "Contrails AI",
  publisher: "Contrails AI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://contrails.ai'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Contrails AI - AI Solutions for Digital Content Safety ",
    description: "Contrails AI provides solutions to detect manipulated media, misinformation, and harmful content. Protect your digital ecosystem with our advanced AI technology.",
    url: 'https://contrails.ai',
    siteName: 'Contrails AI',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Contrails AI - Digital Content Safety Solutions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Contrails AI - AI Solutions for Digital Content Safety ",
    description: "Contrails AI provides solutions to detect manipulated media, misinformation, and harmful content. Protect your digital ecosystem with our advanced AI technology.",
    images: ['/og-image.png'],
    creator: '@contrailsai',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/logo.svg' },
      { url: '/favicon.ico' },
    ],
    apple: [
      { url: '/apple-icon.png' },
    ],
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/apple-touch-icon-precomposed.png',
      },
    ],
  },
  manifest: '/site.webmanifest',
  verification: {
    google: 'your-google-site-verification',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/logo.svg" />
      </head>
      <body className={inter.className}>
          {children}
      </body>
    </html>
  )
}
