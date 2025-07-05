"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface GalleryItem {
  id: number
  title: string
  description?: string
  image: string
  category: string
  created_at: string
}

export function GallerySection() {
  const [gallery, setGallery] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGallery()
  }, [])

  const fetchGallery = async () => {
    try {
      const response = await fetch("/api/gallery")
      if (response.ok) {
        const data = await response.json()
        setGallery(data.slice(0, 8)) // Show latest 8 images
      }
    } catch (error) {
      console.error("Error fetching gallery:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Galeri Foto</h2>
            <p className="text-muted-foreground">Dokumentasi kegiatan Desa Kaliwungu</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="h-48 bg-muted animate-pulse" />
                <CardContent className="p-4">
                  <div className="h-4 bg-muted rounded animate-pulse mb-2" />
                  <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-muted/50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Galeri Foto</h2>
          <p className="text-muted-foreground">Dokumentasi kegiatan Desa Kaliwungu</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {gallery.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                <Badge className="absolute top-4 left-4">{item.category}</Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold line-clamp-1 mb-2">{item.title}</h3>
                {item.description && <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>}
              </CardContent>
            </Card>
          ))}
        </div>

        {gallery.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Belum ada foto yang tersedia.</p>
          </div>
        )}

        {gallery.length > 0 && (
          <div className="text-center">
            <Button asChild>
              <Link href="/galeri">
                Lihat Semua Foto
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
