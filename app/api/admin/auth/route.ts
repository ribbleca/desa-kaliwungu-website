import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Simple password check for demo (in production, use proper hashing)
    if (email === "admin@desakaliwungu.id" && password === "admin123") {
      const user = {
        id: 1,
        email: "admin@desakaliwungu.id",
        name: "Administrator Desa",
        role: "admin",
      }

      const response = NextResponse.json({
        success: true,
        user,
      })

      // Set HTTP-only cookie for session
      response.cookies.set("admin-session", JSON.stringify(user), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 24 * 60 * 60, // 24 hours
      })

      return response
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  } catch (error) {
    console.error("Auth error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true })
  response.cookies.set("admin-session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
  })
  return response
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
