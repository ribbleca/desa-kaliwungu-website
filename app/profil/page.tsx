"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { VillageProfile } from "@/components/profil/village-profile"

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

export default function ProfilPage() {
  const [profile, setProfile] = useState<VillageProfileData | null>(null)
  const [officials, setOfficials] = useState<VillageOfficial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      // Fetch village profile
      const profileResponse = await fetch("/api/village-profile")
      if (profileResponse.ok) {
        const profileData = await profileResponse.json()
        setProfile(profileData)
      }

      // Fetch village officials
      const officialsResponse = await fetch("/api/village-officials")
      if (officialsResponse.ok) {
        const officialsData = await officialsResponse.json()
        setOfficials(officialsData)
      }
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container py-16">
          <div className="text-center">
            <div className="animate-pulse">Loading profil desa...</div>
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Profil Desa Kaliwungu</h1>
            <p className="text-xl text-muted-foreground">
              Mengenal lebih dekat sejarah, visi misi, dan struktur pemerintahan Desa Kaliwungu
            </p>
          </div>
        </div>
      </section>

      <main className="py-16">
        <div className="container">
          <VillageProfile profile={profile} officials={officials} />
        </div>
      </main>

      <Footer />
    </div>
  )
}
