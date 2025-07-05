// Script to verify deployment status
async function verifyDeployment() {
  console.log("🔍 Verifying deployment status...")

  const checks = [
    {
      name: "Environment Variables",
      check: () => {
        const required = ["DATABASE_URL", "NEXTAUTH_URL", "NEXTAUTH_SECRET", "BLOB_READ_WRITE_TOKEN", "RESEND_API_KEY"]

        const missing = required.filter((env) => !process.env[env])

        if (missing.length > 0) {
          console.log("❌ Missing environment variables:", missing.join(", "))
          return false
        }

        console.log("✅ All environment variables present")
        return true
      },
    },
    {
      name: "Database Connection",
      check: async () => {
        try {
          if (!process.env.DATABASE_URL) {
            console.log("❌ DATABASE_URL not found")
            return false
          }

          const { neon } = require("@neondatabase/serverless")
          const sql = neon(process.env.DATABASE_URL)

          await sql`SELECT 1`
          console.log("✅ Database connection successful")
          return true
        } catch (error) {
          console.log("❌ Database connection failed:", error.message)
          return false
        }
      },
    },
    {
      name: "Tables Exist",
      check: async () => {
        try {
          const { neon } = require("@neondatabase/serverless")
          const sql = neon(process.env.DATABASE_URL)

          const tables = ["users", "news", "umkm", "gallery", "agenda", "village_profile", "village_officials"]

          for (const table of tables) {
            const result = await sql`
              SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_name = ${table}
              );
            `

            if (!result[0].exists) {
              console.log(`❌ Table '${table}' does not exist`)
              return false
            }
          }

          console.log("✅ All required tables exist")
          return true
        } catch (error) {
          console.log("❌ Table check failed:", error.message)
          return false
        }
      },
    },
  ]

  console.log("\n📋 Running deployment checks...\n")

  let allPassed = true

  for (const check of checks) {
    console.log(`🔍 Checking: ${check.name}`)
    const passed = await check.check()
    if (!passed) allPassed = false
    console.log("")
  }

  if (allPassed) {
    console.log("🎉 All checks passed! Deployment is ready.")
  } else {
    console.log("⚠️  Some checks failed. Please fix the issues above.")
  }

  return allPassed
}

// Run verification
verifyDeployment()
  .then((success) => {
    process.exit(success ? 0 : 1)
  })
  .catch((error) => {
    console.error("❌ Verification failed:", error)
    process.exit(1)
  })
