// Script untuk test koneksi database
const { neon } = require("@neondatabase/serverless")

async function testDatabaseConnection() {
  console.log("🔍 Testing database connection...")

  if (!process.env.DATABASE_URL) {
    console.error("❌ DATABASE_URL not found in environment variables")
    return false
  }

  try {
    const sql = neon(process.env.DATABASE_URL)

    // Test basic connection
    console.log("📡 Testing basic connection...")
    await sql`SELECT 1 as test`
    console.log("✅ Basic connection successful")

    // Test admin tables
    console.log("📋 Checking admin tables...")
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name LIKE 'admin_%'
    `

    console.log(
      "📊 Admin tables found:",
      tables.map((t) => t.table_name),
    )

    // Test sample data
    console.log("📝 Testing sample data...")
    const newsCount = await sql`SELECT COUNT(*) as count FROM admin_news`
    const umkmCount = await sql`SELECT COUNT(*) as count FROM admin_umkm`
    const userCount = await sql`SELECT COUNT(*) as count FROM admin_users`

    console.log("📈 Data counts:")
    console.log(`- News: ${newsCount[0].count}`)
    console.log(`- UMKM: ${umkmCount[0].count}`)
    console.log(`- Users: ${userCount[0].count}`)

    console.log("🎉 Database connection test successful!")
    return true
  } catch (error) {
    console.error("❌ Database connection test failed:", error.message)
    return false
  }
}

// Run test
testDatabaseConnection()
  .then((success) => {
    process.exit(success ? 0 : 1)
  })
  .catch((error) => {
    console.error("❌ Test failed:", error)
    process.exit(1)
  })
