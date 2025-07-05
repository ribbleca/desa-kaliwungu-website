import { type NextRequest, NextResponse } from "next/server"
import { getAllAdminNews, createAdminNews } from "@/lib/admin-database"

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

    const news = await getAllAdminNews()
    return NextResponse.json(news)
  } catch (error) {
    console.error("Error fetching news:", error)
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = checkAuth(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    const news = await createAdminNews({ ...data, author_id: user.id })

    return NextResponse.json(news, { status: 201 })
  } catch (error) {
    console.error("Error creating news:", error)
    return NextResponse.json({ error: "Failed to create news" }, { status: 500 })
  }
}
