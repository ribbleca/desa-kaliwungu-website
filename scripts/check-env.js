// Script to check and validate environment variables
// Run with: node scripts/check-env.js

require("dotenv").config({ path: ".env.local" })

console.log("🔍 Environment Variables Check")
console.log("==============================\n")

const requiredVars = ["DATABASE_URL", "NEXTAUTH_SECRET", "BLOB_READ_WRITE_TOKEN", "RESEND_API_KEY"]

const optionalVars = ["NEXTAUTH_URL", "ADMIN_EMAIL", "ADMIN_PASSWORD"]

let allSet = true

console.log("📋 Required Variables:")
console.log("----------------------")
requiredVars.forEach((varName) => {
  const value = process.env[varName]
  if (value) {
    // Mask sensitive data
    const maskedValue = value.length > 20 ? value.substring(0, 20) + "..." : value.substring(0, 10) + "..."
    console.log(`✅ ${varName}: ${maskedValue}`)
  } else {
    console.log(`❌ ${varName}: NOT SET`)
    allSet = false
  }
})

console.log("\n📋 Optional Variables:")
console.log("----------------------")
optionalVars.forEach((varName) => {
  const value = process.env[varName]
  if (value) {
    const maskedValue = varName.includes("PASSWORD")
      ? "***"
      : value.length > 30
        ? value.substring(0, 30) + "..."
        : value
    console.log(`✅ ${varName}: ${maskedValue}`)
  } else {
    console.log(`⚠️  ${varName}: NOT SET (optional)`)
  }
})

console.log("\n🔗 Database Connection Test:")
console.log("-----------------------------")
if (process.env.DATABASE_URL) {
  try {
    const url = new URL(process.env.DATABASE_URL)
    console.log(`✅ Protocol: ${url.protocol}`)
    console.log(`✅ Host: ${url.hostname}`)
    console.log(`✅ Database: ${url.pathname.substring(1)}`)
    console.log(`✅ SSL Mode: ${url.searchParams.get("sslmode") || "not specified"}`)

    if (!url.searchParams.get("sslmode")) {
      console.log("⚠️  Warning: sslmode not specified. Add ?sslmode=require to your URL")
    }
  } catch (error) {
    console.log(`❌ Invalid DATABASE_URL format: ${error.message}`)
    allSet = false
  }
} else {
  console.log("❌ DATABASE_URL not set")
}

console.log("\n📊 Summary:")
console.log("-----------")
if (allSet) {
  console.log("🎉 All required environment variables are set!")
  console.log("✅ You can now run the database initialization script")
  console.log("\nNext step: node scripts/run-database-init.js")
} else {
  console.log("❌ Some required environment variables are missing")
  console.log("📝 Please set them before running the database script")
  console.log("\nRun: ./scripts/setup-env-vars.sh for help")
}

console.log("\n🔧 Quick Setup Commands:")
console.log("------------------------")
console.log("1. Set DATABASE_URL:")
console.log('   export DATABASE_URL="postgresql://user:pass@host/db?sslmode=require"')
console.log("")
console.log("2. Generate NEXTAUTH_SECRET:")
console.log('   export NEXTAUTH_SECRET="$(openssl rand -base64 32)"')
console.log("")
console.log("3. Check variables again:")
console.log("   node scripts/check-env.js")
console.log("")
console.log("4. Run database setup:")
console.log("   node scripts/run-database-init.js")
