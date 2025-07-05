"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Building } from "lucide-react"

interface Statistics {
  news: number
  umkm: number
  gallery: number
  agenda: number
}

interface VillageProfile {
  population?: number
  villages_count?: number
  rw_count?: number
  rt_count?: number
}

export function StatsSection() {
  const [stats, setStats] = useState<Statistics>({ news: 0, umkm: 0, gallery: 0, agenda: 0 })
  const [profile, setProfile] = useState<VillageProfile>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      // Fetch statistics
      const statsResponse = await fetch("/api/statistics")
      if (statsResponse.ok) {
        const statsData = await statsResponse.json()
        setStats(statsData)
      }

      // Fetch village profile
      const profileResponse = await fetch("/api/village-profile")
      if (profileResponse.ok) {
        const profileData = await profileResponse.json()
        setProfile(profileData || {})
      }
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const statisticsData = [
    {
      title: "Jumlah Penduduk",
      value: profile.population?.toLocaleString("id-ID") || "0",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Jumlah RT",
      value: profile.rt_count?.toString() || "0",
      icon: Building,
      color: "text-green-600",
    },
    {
      title: "Jumlah RW",
      value: profile.rw_count?.toString() || "0",
      icon: Building,
      color: "text-purple-600",
    },
    {
      title: "UMKM Aktif",
      value: stats.umkm.toString(),
      icon: Building,
      color: "text-orange-600",
    },
  ]

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Statistik Desa</h2>
            <p className="text-muted-foreground">Data terkini Desa Kaliwungu</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="text-center">
                <CardContent className="p-6">
                  <div className="h-12 w-12 bg-muted rounded-full mx-auto mb-4 animate-pulse" />
                  <div className="h-8 bg-muted rounded animate-pulse mb-2" />
                  <div className="h-4 bg-muted rounded animate-pulse" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Statistik Desa</h2>
          <p className="text-muted-foreground">Data terkini Desa Kaliwungu</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statisticsData.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  <div className={`p-3 rounded-full bg-muted ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2">{stat.value}</h3>
                <p className="text-muted-foreground">{stat.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
