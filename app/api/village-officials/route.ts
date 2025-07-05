import { NextResponse } from "next/server"
import { getAllAdminVillageOfficials } from "@/lib/admin-database"

export async function GET() {
  try {
    const officials = await getAllAdminVillageOfficials()
    return NextResponse.json(officials)
  } catch (error) {
    console.error("Error fetching village officials:", error)
    return NextResponse.json({ error: "Failed to fetch village officials" }, { status: 500 })
  }
}
