import { NextResponse } from "next/server"

export async function GET() {
  // This would be implemented server-side when Google Maps integration is needed
  // The API key would be stored as a server-only environment variable
  const mapData = {
    center: {
      lat: -7.6298, // Approximate coordinates for Sidareja, Cilacap
      lng: 109.0732,
    },
    zoom: 15,
    title: "Desa Kaliwungu, Sidareja, Cilacap",
  }

  return NextResponse.json(mapData)
}
