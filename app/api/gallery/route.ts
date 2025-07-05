import { NextResponse } from "next/server"
import { getAllGallery, createAdminGallery } from "@/lib/admin-database"

export async function GET() {
  try {
    const gallery = await getAllGallery()
    return NextResponse.json(gallery)
  } catch (error) {
    console.error("Error fetching gallery:", error)
    return NextResponse.json({ error: "Failed to fetch gallery" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const gallery = await createAdminGallery(data)
    return NextResponse.json(gallery, { status: 201 })
  } catch (error) {
    console.error("Error creating gallery:", error)
    return NextResponse.json({ error: "Failed to create gallery" }, { status: 500 })
  }
}
