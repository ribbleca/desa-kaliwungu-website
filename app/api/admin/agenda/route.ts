import { type NextRequest, NextResponse } from "next/server"
import { getAllAdminAgenda, createAdminAgenda } from "@/lib/admin-database"

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

    const agenda = await getAllAdminAgenda()
    return NextResponse.json(agenda)
  } catch (error) {
    console.error("Error fetching agenda:", error)
    return NextResponse.json({ error: "Failed to fetch agenda" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = checkAuth(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    const agenda = await createAdminAgenda(data)

    return NextResponse.json(agenda, { status: 201 })
  } catch (error) {
    console.error("Error creating agenda:", error)
    return NextResponse.json({ error: "Failed to create agenda" }, { status: 500 })
  }
}
