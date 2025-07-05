"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface MapData {
  center: {
    lat: number
    lng: number
  }
  zoom: number
  title: string
}

export function MapComponent() {
  const [mapData, setMapData] = useState<MapData | null>(null)

  useEffect(() => {
    // Fetch map data from server-side API
    fetch("/api/maps")
      .then((res) => res.json())
      .then((data) => setMapData(data))
      .catch((err) => console.error("Error loading map data:", err))
  }, [])

  return (
    <Card>
      <CardContent className="p-0">
        <div className="aspect-video bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
          {mapData ? (
            <div className="text-center p-8">
              <div className="text-lg font-semibold mb-2">{mapData.title}</div>
              <div className="text-sm text-muted-foreground mb-4">
                Koordinat: {mapData.center.lat}, {mapData.center.lng}
              </div>
              <div className="text-xs text-muted-foreground">
                Peta interaktif akan ditampilkan setelah konfigurasi server selesai
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="animate-pulse">
                <div className="text-muted-foreground">Memuat peta lokasi...</div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
