import { type NextRequest, NextResponse } from "next/server"
import { getAdminStatistics } from "@/lib/admin-database"

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

    const stats = await getAdminStatistics()
    return NextResponse.json(stats)
  } catch (error) {
    console.error("Error fetching statistics:", error)
    return NextResponse.json({ error: "Failed to fetch statistics" }, { status: 500 })
  }
}
