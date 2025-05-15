import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Contrails AI - Safeguarding Digital Truth",
  description:
    "Contrails AI provides cutting-edge solutions to detect manipulated media, misinformation, and harmful content across digital platforms.",
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
      </head>
      <body className={inter.className}>
        {/* <ThemeProvider attribute="class"> */}
          {children}
        {/* </ThemeProvider> */}
      </body>
    </html>
  )
}
