"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface NewsItem {
  id: number
  title: string
  excerpt: string
  image?: string
  category: string
  created_at: string
}

export function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      const response = await fetch("/api/news?published=true")
      if (response.ok) {
        const data = await response.json()
        setNews(data.slice(0, 3)) // Show only 3 latest news
      }
    } catch (error) {
      console.error("Error fetching news:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-16">
        <div className="container">
          <div className="text-center">
            <div className="animate-pulse">Loading berita...</div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16">
      <div className="container">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-4">Berita Terkini</h2>
            <p className="text-muted-foreground">Informasi terbaru seputar kegiatan dan perkembangan Desa Kaliwungu</p>
          </div>
          <Button asChild>
            <Link href="/berita">
              Lihat Semua
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image
                  src={item.image || "/placeholder.svg?height=200&width=300"}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
                <Badge className="absolute top-4 left-4">{item.category}</Badge>
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-2 text-lg">{item.title}</CardTitle>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(item.created_at).toLocaleDateString("id-ID")}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-3 mb-4">{item.excerpt}</p>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/berita/${item.id}`}>Baca Selengkapnya</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {news.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Belum ada berita yang dipublikasikan.</p>
          </div>
        )}
      </div>
    </section>
  )
}
