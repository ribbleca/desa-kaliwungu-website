import { type NextRequest, NextResponse } from "next/server"
import { getAllVillageOfficials, createVillageOfficial } from "@/lib/database"
import { verifyToken } from "@/lib/auth"

export async function GET() {
  try {
    const officials = await getAllVillageOfficials()
    return NextResponse.json(officials)
  } catch (error) {
    console.error("Error fetching village officials:", error)
    return NextResponse.json({ error: "Failed to fetch village officials" }, { status: 500 })
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
    const official = await createVillageOfficial(data)

    return NextResponse.json(official, { status: 201 })
  } catch (error) {
    console.error("Error creating village official:", error)
    return NextResponse.json({ error: "Failed to create village official" }, { status: 500 })
  }
}
