"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Phone, MapPin, Search } from "lucide-react"
import Image from "next/image"

interface UMKMItem {
  id: number
  name: string
  description: string
  category: string
  owner?: string
  phone?: string
  address?: string
  image?: string
  rating?: number
  featured: boolean
}

export default function UMKMPage() {
  const [umkm, setUmkm] = useState<UMKMItem[]>([])
  const [filteredUMKM, setFilteredUMKM] = useState<UMKMItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Semua")

  useEffect(() => {
    fetchUMKM()
  }, [])

  useEffect(() => {
    filterUMKM()
  }, [umkm, searchTerm, selectedCategory])

  const fetchUMKM = async () => {
    try {
      const response = await fetch("/api/umkm")
      if (response.ok) {
        const data = await response.json()
        setUmkm(data)
      }
    } catch (error) {
      console.error("Error fetching UMKM:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterUMKM = () => {
    let filtered = umkm

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.owner?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by category
    if (selectedCategory !== "Semua") {
      filtered = filtered.filter((item) => item.category === selectedCategory)
    }

    setFilteredUMKM(filtered)
  }

  const categories = ["Semua", ...Array.from(new Set(umkm.map((item) => item.category)))]

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container py-16">
          <div className="text-center">
            <div className="animate-pulse">Loading UMKM...</div>
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">UMKM Desa Kaliwungu</h1>
            <p className="text-xl text-muted-foreground">
              Dukung usaha lokal dan temukan produk berkualitas dari masyarakat Desa Kaliwungu
            </p>
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
                placeholder="Cari UMKM..."
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

          {/* UMKM Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUMKM.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={item.image || "/placeholder.svg?height=200&width=300"}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                  {item.featured && <Badge className="absolute top-4 left-4">Unggulan</Badge>}
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-1 text-lg">{item.name}</CardTitle>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{item.category}</Badge>
                    {item.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{item.rating}</span>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-3 mb-4">{item.description}</p>
                  <div className="space-y-2 text-sm">
                    {item.owner && (
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Pemilik:</span>
                        <span>{item.owner}</span>
                      </div>
                    )}
                    {item.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <a href={`tel:${item.phone}`} className="hover:underline">
                          {item.phone}
                        </a>
                      </div>
                    )}
                    {item.address && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span className="line-clamp-2">{item.address}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredUMKM.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {searchTerm || selectedCategory !== "Semua"
                  ? "Tidak ada UMKM yang sesuai dengan pencarian."
                  : "Belum ada UMKM yang terdaftar."}
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
