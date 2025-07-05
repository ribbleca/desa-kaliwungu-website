import { type NextRequest, NextResponse } from "next/server"
import { getUMKMById, updateUMKM, deleteUMKM } from "@/lib/database"
import { verifyToken } from "@/lib/auth"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const umkm = await getUMKMById(id)

    if (!umkm) {
      return NextResponse.json({ error: "UMKM not found" }, { status: 404 })
    }

    return NextResponse.json(umkm)
  } catch (error) {
    console.error("Error fetching UMKM:", error)
    return NextResponse.json({ error: "Failed to fetch UMKM" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check authentication
    const token = request.cookies.get("auth-token")?.value
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = Number.parseInt(params.id)
    const data = await request.json()
    const umkm = await updateUMKM(id, data)

    return NextResponse.json(umkm)
  } catch (error) {
    console.error("Error updating UMKM:", error)
    return NextResponse.json({ error: "Failed to update UMKM" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check authentication
    const token = request.cookies.get("auth-token")?.value
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = Number.parseInt(params.id)
    await deleteUMKM(id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting UMKM:", error)
    return NextResponse.json({ error: "Failed to delete UMKM" }, { status: 500 })
  }
}
