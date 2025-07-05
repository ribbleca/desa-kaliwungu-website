import { type NextRequest, NextResponse } from "next/server"
import { getAllAdminGallery, createAdminGallery } from "@/lib/admin-database"

function checkAuth(request: NextRequest) {
  const session = request.cookies.get("admin-session")?.value
  if (!session) {
    return null
  }
  try {
    return JSON.parse(session)
  } catch {
    return null
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = checkAuth(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const gallery = await getAllAdminGallery()
    return NextResponse.json(gallery)
  } catch (error) {
    console.error("Error fetching gallery:", error)
    return NextResponse.json({ error: "Failed to fetch gallery" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = checkAuth(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    const gallery = await createAdminGallery(data)

    return NextResponse.json(gallery, { status: 201 })
  } catch (error) {
    console.error("Error creating gallery:", error)
    return NextResponse.json({ error: "Failed to create gallery" }, { status: 500 })
  }
}
