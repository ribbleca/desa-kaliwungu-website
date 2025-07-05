import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Star, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function UMKMSection() {
  const umkm = [
    {
      id: 1,
      name: "Keripik Singkong Bu Tini",
      description:
        "Keripik singkong renyah dengan berbagai varian rasa. Dibuat dari singkong pilihan dengan resep turun temurun.",
      category: "Makanan & Minuman",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.8,
      address: "Dusun Kaliwungu Lor",
      phone: "081234567890",
      featured: true,
    },
    {
      id: 2,
      name: "Anyaman Bambu Pak Karno",
      description: "Kerajinan anyaman bambu berkualitas tinggi. Menerima pesanan berbagai macam produk anyaman.",
      category: "Kerajinan",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.9,
      address: "Dusun Kaliwungu Kidul",
      phone: "081234567891",
      featured: true,
    },
    {
      id: 3,
      name: "Batik Tulis Kaliwungu",
      description: "Batik tulis dengan motif khas Kaliwungu. Menggunakan pewarna alami dan teknik tradisional.",
      category: "Fashion",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.7,
      address: "Dusun Tegalsari",
      phone: "081234567892",
      featured: false,
    },
    {
      id: 4,
      name: "Warung Gudeg Bu Sari",
      description: "Gudeg khas Yogya dengan cita rasa autentik dan bumbu tradisional yang kaya rempah.",
      category: "Makanan & Minuman",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.6,
      address: "Dusun Wangon",
      phone: "081234567893",
      featured: false,
    },
  ]

  return (
    <section className="py-16 bg-muted/50">
      <div className="container">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-4">UMKM Unggulan</h2>
            <p className="text-muted-foreground">Produk-produk berkualitas dari pelaku UMKM Desa Kaliwungu</p>
          </div>
          <Button asChild>
            <Link href="/umkm">
              Lihat Semua UMKM
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {umkm.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                {item.featured && <Badge className="absolute top-4 left-4 bg-yellow-500">Unggulan</Badge>}
                <div className="absolute top-4 right-4 bg-white/90 rounded-full px-2 py-1 flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-medium">{item.rating}</span>
                </div>
              </div>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg line-clamp-1">{item.name}</CardTitle>
                <Badge variant="secondary" className="w-fit">
                  {item.category}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{item.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{item.phone}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                  <Link href={`/umkm/${item.id}`}>Lihat Detail</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
