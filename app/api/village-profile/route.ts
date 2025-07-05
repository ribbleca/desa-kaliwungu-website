import { NextResponse } from "next/server"
import { getVillageProfile, updateVillageProfile } from "@/lib/database"
import { verifyToken } from "@/lib/auth"
import type { NextRequest } from "next/server"

export async function GET() {
  try {
    const profile = await getVillageProfile()
    return NextResponse.json(profile)
  } catch (error) {
    console.error("Error fetching village profile:", error)
    return NextResponse.json({ error: "Failed to fetch village profile" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Check authentication
    const token = request.cookies.get("auth-token")?.value
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    const profile = await updateVillageProfile(data)

    return NextResponse.json(profile)
  } catch (error) {
    console.error("Error updating village profile:", error)
    return NextResponse.json({ error: "Failed to update village profile" }, { status: 500 })
  }
}
