"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Phone, MapPin, ArrowRight } from "lucide-react"
import Link from "next/link"
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

export function UMKMSection() {
  const [umkm, setUmkm] = useState<UMKMItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUMKM()
  }, [])

  const fetchUMKM = async () => {
    try {
      const response = await fetch("/api/umkm?featured=true")
      if (response.ok) {
        const data = await response.json()
        setUmkm(data.slice(0, 8)) // Show featured UMKM
      }
    } catch (error) {
      console.error("Error fetching UMKM:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">UMKM Unggulan</h2>
            <p className="text-muted-foreground">Usaha Mikro Kecil Menengah terbaik di Desa Kaliwungu</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="h-48 bg-muted animate-pulse" />
                <CardHeader>
                  <div className="h-6 bg-muted rounded animate-pulse mb-2" />
                  <div className="h-4 bg-muted rounded animate-pulse" />
                </CardHeader>
                <CardContent>
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
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">UMKM Unggulan</h2>
          <p className="text-muted-foreground">Usaha Mikro Kecil Menengah terbaik di Desa Kaliwungu</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {umkm.map((item) => (
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
                <p className="text-muted-foreground line-clamp-2 mb-4">{item.description}</p>
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
                      <span>{item.phone}</span>
                    </div>
                  )}
                  {item.address && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span className="line-clamp-1">{item.address}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {umkm.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Belum ada UMKM yang terdaftar.</p>
          </div>
        )}

        {umkm.length > 0 && (
          <div className="text-center">
            <Button asChild>
              <Link href="/umkm">
                Lihat Semua UMKM
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
