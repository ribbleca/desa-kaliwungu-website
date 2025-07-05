import { HeroSection } from "@/components/hero-section"
import { StatsSection } from "@/components/stats-section"
import { NewsSection } from "@/components/news-section"
import { UMKMSection } from "@/components/umkm-section"
import { GallerySection } from "@/components/gallery-section"
import { ContactSection } from "@/components/contact-section"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <NewsSection />
        <UMKMSection />
        <GallerySection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
