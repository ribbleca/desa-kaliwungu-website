import { type NextRequest, NextResponse } from "next/server"
import { deleteAdminGallery } from "@/lib/admin-database"

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

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = checkAuth(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = Number.parseInt(params.id)
    await deleteAdminGallery(id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting gallery:", error)
    return NextResponse.json({ error: "Failed to delete gallery" }, { status: 500 })
  }
}
