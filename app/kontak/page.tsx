import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactSection } from "@/components/contact-section"

export const metadata = {
  title: "Kontak - Desa Kaliwungu",
  description: "Hubungi Pemerintah Desa Kaliwungu untuk informasi, layanan, dan aspirasi masyarakat.",
}

export default function KontakPage() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Hubungi Kami</h1>
            <p className="text-xl text-muted-foreground">
              Sampaikan aspirasi, keluhan, atau pertanyaan Anda kepada Pemerintah Desa Kaliwungu
            </p>
          </div>
        </div>
      </section>

      <main className="py-16">
        <div className="container">
          <ContactSection />
        </div>
      </main>

      <Footer />
    </div>
  )
}
