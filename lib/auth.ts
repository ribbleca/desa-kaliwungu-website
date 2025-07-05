import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { getUserByEmail } from "./database"

const JWT_SECRET = process.env.NEXTAUTH_SECRET || "your-secret-key"

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export async function authenticateUser(email: string, password: string) {
  try {
    const user = await getUserByEmail(email)

    if (!user) {
      return null
    }

    const isValid = await verifyPassword(password, user.password)

    if (!isValid) {
      return null
    }

    // Return user without password
    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
  } catch (error) {
    console.error("Authentication error:", error)
    return null
  }
}

export function generateToken(user: any): string {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "7d" },
  )
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}
