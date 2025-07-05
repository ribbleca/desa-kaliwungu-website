import { type NextRequest, NextResponse } from "next/server"
import { getAdminVillageProfile, updateAdminVillageProfile } from "@/lib/admin-database"

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

    const profile = await getAdminVillageProfile()
    return NextResponse.json(profile)
  } catch (error) {
    console.error("Error fetching profile:", error)
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = checkAuth(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    const profile = await updateAdminVillageProfile(data)

    return NextResponse.json(profile)
  } catch (error) {
    console.error("Error updating profile:", error)
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
  }
}
