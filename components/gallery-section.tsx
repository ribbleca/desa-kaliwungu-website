import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function GallerySection() {
  const images = [
    {
      id: 1,
      src: "/placeholder.svg?height=300&width=400",
      alt: "Pemandangan sawah di Desa Kaliwungu",
      title: "Hamparan Sawah",
    },
    {
      id: 2,
      src: "/placeholder.svg?height=300&width=400",
      alt: "Kegiatan gotong royong warga",
      title: "Gotong Royong",
    },
    {
      id: 3,
      src: "/placeholder.svg?height=300&width=400",
      alt: "Festival UMKM tahunan",
      title: "Festival UMKM",
    },
    {
      id: 4,
      src: "/placeholder.svg?height=300&width=400",
      alt: "Balai desa Kaliwungu",
      title: "Balai Desa",
    },
    {
      id: 5,
      src: "/placeholder.svg?height=300&width=400",
      alt: "Kegiatan posyandu",
      title: "Posyandu",
    },
    {
      id: 6,
      src: "/placeholder.svg?height=300&width=400",
      alt: "Pasar tradisional",
      title: "Pasar Tradisional",
    },
  ]

  return (
    <section className="py-16">
      <div className="container">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-4">Galeri Desa</h2>
            <p className="text-muted-foreground">Dokumentasi kegiatan dan keindahan Desa Kaliwungu</p>
          </div>
          <Button asChild>
            <Link href="/galeri">
              Lihat Semua
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div
              key={image.id}
              className={`relative overflow-hidden rounded-lg group cursor-pointer ${
                index === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
            >
              <div className={`relative ${index === 0 ? "h-96" : "h-48"}`}>
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <h3 className="font-semibold">{image.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
