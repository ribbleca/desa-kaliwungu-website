import { type NextRequest, NextResponse } from "next/server"
import { getAllGallery, createGalleryItem } from "@/lib/database"
import { verifyToken } from "@/lib/auth"

export async function GET() {
  try {
    const gallery = await getAllGallery()
    return NextResponse.json(gallery)
  } catch (error) {
    console.error("Error fetching gallery:", error)
    return NextResponse.json({ error: "Failed to fetch gallery" }, { status: 500 })
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
    const gallery = await createGalleryItem(data)

    return NextResponse.json(gallery, { status: 201 })
  } catch (error) {
    console.error("Error creating gallery item:", error)
    return NextResponse.json({ error: "Failed to create gallery item" }, { status: 500 })
  }
}
