import { type NextRequest, NextResponse } from "next/server"
import { updateAdminAgenda, deleteAdminAgenda } from "@/lib/admin-database"

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
    const agenda = await updateAdminAgenda(id, data)

    return NextResponse.json(agenda)
  } catch (error) {
    console.error("Error updating agenda:", error)
    return NextResponse.json({ error: "Failed to update agenda" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = checkAuth(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = Number.parseInt(params.id)
    await deleteAdminAgenda(id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting agenda:", error)
    return NextResponse.json({ error: "Failed to delete agenda" }, { status: 500 })
  }
}
