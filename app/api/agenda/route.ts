import { type NextRequest, NextResponse } from "next/server"
import { getAllAgenda, getUpcomingAgenda, createAgenda } from "@/lib/database"
import { verifyToken } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const upcoming = searchParams.get("upcoming")

    let agenda
    if (upcoming === "true") {
      agenda = await getUpcomingAgenda()
    } else {
      agenda = await getAllAgenda()
    }

    return NextResponse.json(agenda)
  } catch (error) {
    console.error("Error fetching agenda:", error)
    return NextResponse.json({ error: "Failed to fetch agenda" }, { status: 500 })
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
    const agenda = await createAgenda(data)

    return NextResponse.json(agenda, { status: 201 })
  } catch (error) {
    console.error("Error creating agenda:", error)
    return NextResponse.json({ error: "Failed to create agenda" }, { status: 500 })
  }
}
