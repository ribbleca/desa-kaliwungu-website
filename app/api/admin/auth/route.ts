import { type NextRequest, NextResponse } from "next/server"
import { authenticateAdmin } from "@/lib/admin-database"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    const user = await authenticateAdmin(email, password)
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Create session
    const response = NextResponse.json({ user })
    response.cookies.set("admin-session", JSON.stringify(user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = request.cookies.get("admin-session")?.value
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const user = JSON.parse(session)
    return NextResponse.json({ user })
  } catch (error) {
    return NextResponse.json({ error: "Invalid session" }, { status: 401 })
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true })
  response.cookies.delete("admin-session")
  return response
}
