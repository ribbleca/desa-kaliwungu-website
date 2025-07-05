import { type NextRequest, NextResponse } from "next/server"
import { getAllUMKM, getFeaturedUMKM, createUMKM } from "@/lib/database"
import { verifyToken } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get("featured")

    let umkm
    if (featured === "true") {
      umkm = await getFeaturedUMKM()
    } else {
      umkm = await getAllUMKM()
    }

    return NextResponse.json(umkm)
  } catch (error) {
    console.error("Error fetching UMKM:", error)
    return NextResponse.json({ error: "Failed to fetch UMKM" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const token = request.cookies.get("auth-token")?.value
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    const umkm = await createUMKM(data)

    return NextResponse.json(umkm, { status: 201 })
  } catch (error) {
    console.error("Error creating UMKM:", error)
    return NextResponse.json({ error: "Failed to create UMKM" }, { status: 500 })
  }
}
