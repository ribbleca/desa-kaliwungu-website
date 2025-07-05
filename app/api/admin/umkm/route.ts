import { type NextRequest, NextResponse } from "next/server"
import { getAllAdminUMKM, createAdminUMKM } from "@/lib/admin-database"

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

    const umkm = await getAllAdminUMKM()
    return NextResponse.json(umkm)
  } catch (error) {
    console.error("Error fetching UMKM:", error)
    return NextResponse.json({ error: "Failed to fetch UMKM" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = checkAuth(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    const umkm = await createAdminUMKM(data)

    return NextResponse.json(umkm, { status: 201 })
  } catch (error) {
    console.error("Error creating UMKM:", error)
    return NextResponse.json({ error: "Failed to create UMKM" }, { status: 500 })
  }
}
