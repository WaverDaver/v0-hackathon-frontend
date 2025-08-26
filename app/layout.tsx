import type React from "react"
import type { Metadata } from "next"
import { Archivo_Black, Inter } from "next/font/google"
import "./globals.css"

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo-black",
})

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Curate - AI Art Picker",
  description: "The AI curator that helps you discover a thing or two, starting with your taste.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${archivoBlack.variable} ${inter.variable} antialiased`}>
      <body>{children}</body>
    </html>
  )
}
