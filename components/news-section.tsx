import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function NewsSection() {
  const news = [
    {
      id: 1,
      title: "Pembangunan Jalan Desa Tahap II Dimulai",
      excerpt:
        "Pemerintah desa memulai pembangunan jalan desa tahap kedua untuk meningkatkan akses transportasi warga.",
      image: "/placeholder.svg?height=200&width=300",
      category: "Pembangunan",
      date: "2024-01-15",
    },
    {
      id: 2,
      title: "Festival UMKM Desa Kaliwungu 2024",
      excerpt: "Acara tahunan untuk mempromosikan produk-produk UMKM lokal dan meningkatkan ekonomi desa.",
      image: "/placeholder.svg?height=200&width=300",
      category: "Ekonomi",
      date: "2024-01-12",
    },
    {
      id: 3,
      title: "Program Posyandu Balita Berjalan Lancar",
      excerpt: "Program Posyandu balita mencatat tingkat partisipasi masyarakat yang tinggi.",
      image: "/placeholder.svg?height=200&width=300",
      category: "Kesehatan",
      date: "2024-01-10",
    },
  ]

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
                <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                <Badge className="absolute top-4 left-4">{item.category}</Badge>
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-2 text-lg">{item.title}</CardTitle>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(item.date).toLocaleDateString("id-ID")}
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
      </div>
    </section>
  )
}
