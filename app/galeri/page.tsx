"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import Image from "next/image"

interface GalleryItem {
  id: number
  title: string
  description?: string
  image: string
  category: string
  created_at: string
}

export default function GaleriPage() {
  const [gallery, setGallery] = useState<GalleryItem[]>([])
  const [filteredGallery, setFilteredGallery] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Semua")

  useEffect(() => {
    fetchGallery()
  }, [])

  useEffect(() => {
    filterGallery()
  }, [gallery, searchTerm, selectedCategory])

  const fetchGallery = async () => {
    try {
      const response = await fetch("/api/gallery")
      if (response.ok) {
        const data = await response.json()
        setGallery(data)
      }
    } catch (error) {
      console.error("Error fetching gallery:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterGallery = () => {
    let filtered = gallery

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by category
    if (selectedCategory !== "Semua") {
      filtered = filtered.filter((item) => item.category === selectedCategory)
    }

    setFilteredGallery(filtered)
  }

  const categories = ["Semua", ...Array.from(new Set(gallery.map((item) => item.category)))]

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container py-16">
          <div className="text-center">
            <div className="animate-pulse">Loading galeri...</div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Galeri Foto</h1>
            <p className="text-xl text-muted-foreground">Dokumentasi kegiatan dan momen berharga di Desa Kaliwungu</p>
          </div>
        </div>
      </section>

      <main className="py-16">
        <div className="container">
          {/* Search and Filter */}
          <div className="mb-8 space-y-4">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Cari foto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGallery.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-64">
                  <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                  <Badge className="absolute top-4 left-4">{item.category}</Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold line-clamp-1 mb-2">{item.title}</h3>
                  {item.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{item.description}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    {new Date(item.created_at).toLocaleDateString("id-ID")}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredGallery.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {searchTerm || selectedCategory !== "Semua"
                  ? "Tidak ada foto yang sesuai dengan pencarian."
                  : "Belum ada foto yang tersedia."}
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
