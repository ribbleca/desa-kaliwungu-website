"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, MapPin, Calendar, Award } from "lucide-react"
import Image from "next/image"

interface VillageProfileData {
  vision: string
  mission: string
  history: string
  area_size: string
  population: number
  villages_count: number
  rw_count: number
  rt_count: number
}

interface VillageOfficial {
  id: number
  name: string
  position: string
  photo?: string
  phone?: string
  email?: string
}

interface VillageProfileProps {
  profile: VillageProfileData | null
  officials: VillageOfficial[]
}

export function VillageProfile({ profile, officials }: VillageProfileProps) {
  return (
    <div className="space-y-16">
      {/* Sejarah Desa */}
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Sejarah Desa</h2>
            <div className="prose prose-gray dark:prose-invert">
              <p className="text-muted-foreground mb-4">
                {profile?.history || "Desa Kaliwungu memiliki sejarah panjang yang dimulai pada abad ke-18..."}
              </p>
            </div>
          </div>
          <div className="relative h-96 rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Sejarah Desa Kaliwungu"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Visi Misi */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-12">Visi & Misi</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Visi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {profile?.vision || "Terwujudnya Desa Kaliwungu yang Maju, Mandiri, dan Sejahtera..."}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Misi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-muted-foreground">
                {profile?.mission ? (
                  <div>
                    {profile.mission.split(";").map((item, index) => (
                      <p key={index} className="mb-2">
                        • {item.trim()}
                      </p>
                    ))}
                  </div>
                ) : (
                  <ul className="space-y-2">
                    <li>• Meningkatkan kualitas pelayanan publik</li>
                    <li>• Mengembangkan potensi ekonomi desa</li>
                    <li>• Memperkuat infrastruktur dan fasilitas umum</li>
                    <li>• Memberdayakan masyarakat melalui pendidikan</li>
                    <li>• Melestarikan budaya dan lingkungan hidup</li>
                  </ul>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Data Geografis */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-12">Data Geografis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <MapPin className="h-8 w-8 text-primary mx-auto mb-4" />
              <div className="text-2xl font-bold mb-2">{profile?.area_size || "450 Ha"}</div>
              <div className="text-sm text-muted-foreground">Luas Wilayah</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-primary mx-auto mb-4" />
              <div className="text-2xl font-bold mb-2">{profile?.villages_count || 5}</div>
              <div className="text-sm text-muted-foreground">Dusun</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 text-primary mx-auto mb-4" />
              <div className="text-2xl font-bold mb-2">{profile?.rw_count || 15} RW</div>
              <div className="text-sm text-muted-foreground">Rukun Warga</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Award className="h-8 w-8 text-primary mx-auto mb-4" />
              <div className="text-2xl font-bold mb-2">{profile?.rt_count || 45} RT</div>
              <div className="text-sm text-muted-foreground">Rukun Tetangga</div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Perangkat Desa */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-12">Perangkat Desa</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {officials.map((official) => (
            <Card key={official.id}>
              <CardContent className="p-6 text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <Image
                    src={official.photo || "/placeholder.svg?height=200&width=200"}
                    alt={official.name}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <h3 className="font-semibold mb-2">{official.name}</h3>
                <Badge variant="secondary">{official.position}</Badge>
                {official.phone && <p className="text-sm text-muted-foreground mt-2">{official.phone}</p>}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Potensi Desa */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-12">Potensi Desa</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Potensi Pertanian</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Lahan sawah produktif seluas 280 Ha</li>
                <li>• Produksi padi 2-3 kali panen per tahun</li>
                <li>• Tanaman palawija: jagung, kedelai, kacang tanah</li>
                <li>• Hortikultura: cabai, tomat, mentimun</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Potensi Perikanan</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Kolam ikan air tawar seluas 45 Ha</li>
                <li>• Budidaya ikan lele, nila, dan gurame</li>
                <li>• Kelompok pembudidaya ikan aktif</li>
                <li>• Potensi pengembangan wisata pemancingan</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Potensi UMKM</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>• 127 unit UMKM aktif</li>
                <li>• Industri makanan dan kerajinan</li>
                <li>• Produk unggulan: keripik, batik, anyaman</li>
                <li>• Pasar tradisional dan toko kelontong</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Potensi Wisata</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Wisata alam persawahan</li>
                <li>• Wisata budaya dan tradisi</li>
                <li>• Wisata kuliner khas desa</li>
                <li>• Potensi agrowisata dan edukasi</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
