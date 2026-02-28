import type { Metadata, Viewport } from 'next'
import { Inter, Outfit } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const _outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: 'Digitaliza Tu Barbería',
  description: 'El ecosistema que utilizan las empresas más grandes para digitalizar y escalar su barbería.',
}

export const viewport: Viewport = {
  themeColor: '#1a0a0f',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${_inter.variable} ${_outfit.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
