import Link from "next/link"
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center">
                <MapPin className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="font-bold">Desa Kaliwungu</div>
                <div className="text-sm text-gray-400">Sidareja, Cilacap</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Website resmi Desa Kaliwungu, Kecamatan Sidareja, Kabupaten Cilacap. Menyajikan informasi terkini tentang
              pemerintahan, pembangunan, dan kemasyarakatan.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Youtube className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Menu Utama</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/profil" className="text-gray-400 hover:text-white">
                  Profil Desa
                </Link>
              </li>
              <li>
                <Link href="/berita" className="text-gray-400 hover:text-white">
                  Berita
                </Link>
              </li>
              <li>
                <Link href="/umkm" className="text-gray-400 hover:text-white">
                  UMKM
                </Link>
              </li>
              <li>
                <Link href="/galeri" className="text-gray-400 hover:text-white">
                  Galeri
                </Link>
              </li>
              <li>
                <Link href="/kontak" className="text-gray-400 hover:text-white">
                  Kontak
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Layanan</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/layanan/surat" className="text-gray-400 hover:text-white">
                  Pelayanan Surat
                </Link>
              </li>
              <li>
                <Link href="/layanan/ktp" className="text-gray-400 hover:text-white">
                  Pembuatan KTP
                </Link>
              </li>
              <li>
                <Link href="/layanan/kk" className="text-gray-400 hover:text-white">
                  Kartu Keluarga
                </Link>
              </li>
              <li>
                <Link href="/layanan/usaha" className="text-gray-400 hover:text-white">
                  Surat Usaha
                </Link>
              </li>
              <li>
                <Link href="/layanan/domisili" className="text-gray-400 hover:text-white">
                  Surat Domisili
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Kontak</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                <div className="text-gray-400">
                  Jl. Raya Kaliwungu No. 123
                  <br />
                  Sidareja, Cilacap 53261
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-gray-400">(0282) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-400">info@desakaliwungu.id</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 Desa Kaliwungu. Semua hak cipta dilindungi.</p>
          <p className="mt-2">Dikembangkan dengan ❤️ untuk kemajuan desa</p>
        </div>
      </div>
    </footer>
  )
}
