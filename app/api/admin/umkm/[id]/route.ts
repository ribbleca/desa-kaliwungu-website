import { type NextRequest, NextResponse } from "next/server"
import { updateAdminUMKM, deleteAdminUMKM } from "@/lib/admin-database"

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

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = checkAuth(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = Number.parseInt(params.id)
    const data = await request.json()
    const umkm = await updateAdminUMKM(id, data)

    return NextResponse.json(umkm)
  } catch (error) {
    console.error("Error updating UMKM:", error)
    return NextResponse.json({ error: "Failed to update UMKM" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = checkAuth(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = Number.parseInt(params.id)
    await deleteAdminUMKM(id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting UMKM:", error)
    return NextResponse.json({ error: "Failed to delete UMKM" }, { status: 500 })
  }
}
