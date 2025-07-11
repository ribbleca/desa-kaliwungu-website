import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Desa Kaliwungu - Kecamatan Sidareja, Kabupaten Cilacap",
  description:
    "Website resmi Desa Kaliwungu, Kecamatan Sidareja, Kabupaten Cilacap. Informasi lengkap tentang profil desa, berita, UMKM, dan layanan masyarakat.",
  keywords: "Desa Kaliwungu, Sidareja, Cilacap, Pemerintah Desa, UMKM, Wisata Desa",
  authors: [{ name: "Pemerintah Desa Kaliwungu" }],
  openGraph: {
    title: "Desa Kaliwungu - Sidareja, Cilacap",
    description:
      "Website resmi Desa Kaliwungu dengan informasi lengkap tentang profil desa, berita, dan layanan masyarakat.",
    type: "website",
    locale: "id_ID",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
