import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Users, Building, Leaf } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
      <div className="absolute inset-0 bg-black/20" />
      <div className="container relative z-10 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Selamat Datang di
            <span className="block text-green-400">Desa Kaliwungu</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8">Kecamatan Sidareja, Kabupaten Cilacap</p>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Desa yang kaya akan potensi alam, budaya, dan UMKM. Bergabunglah dengan kami dalam membangun desa yang maju
            dan sejahtera.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" asChild>
              <Link href="/profil">Profil Desa</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              asChild
            >
              <Link href="/kontak">Hubungi Kami</Link>
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <Card className="bg-white/10 border-white/20 backdrop-blur">
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">3,247</div>
                <div className="text-sm text-white/80">Penduduk</div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-white/20 backdrop-blur">
              <CardContent className="p-4 text-center">
                <Building className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">127</div>
                <div className="text-sm text-white/80">UMKM</div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-white/20 backdrop-blur">
              <CardContent className="p-4 text-center">
                <Leaf className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">450</div>
                <div className="text-sm text-white/80">Ha Lahan</div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-white/20 backdrop-blur">
              <CardContent className="p-4 text-center">
                <MapPin className="h-8 w-8 text-red-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">5</div>
                <div className="text-sm text-white/80">Dusun</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/placeholder.svg?height=800&width=1200"
          alt="Pemandangan Desa Kaliwungu"
          fill
          className="object-cover"
          priority
        />
      </div>
    </section>
  )
}
