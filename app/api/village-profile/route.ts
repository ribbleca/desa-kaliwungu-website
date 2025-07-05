import { NextResponse } from "next/server"
import { getVillageProfile } from "@/lib/database"

export async function GET() {
  try {
    const profile = await getVillageProfile()
    return NextResponse.json(profile)
  } catch (error) {
    console.error("Error fetching village profile:", error)
    return NextResponse.json({ error: "Failed to fetch village profile" }, { status: 500 })
  }
}
