import { NextResponse } from "next/server"
import { getUMKMById } from "@/lib/database"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const umkm = await getUMKMById(id)

    if (!umkm) {
      return NextResponse.json({ error: "UMKM not found" }, { status: 404 })
    }

    return NextResponse.json(umkm)
  } catch (error) {
    console.error("Error fetching UMKM:", error)
    return NextResponse.json({ error: "Failed to fetch UMKM" }, { status: 500 })
  }
}
