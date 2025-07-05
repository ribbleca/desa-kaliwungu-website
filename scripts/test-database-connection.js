const { neon } = require("@neondatabase/serverless")

async function testConnection() {
  try {
    console.log("🔍 Testing database connection...")

    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL environment variable is not set")
    }

    const sql = neon(process.env.DATABASE_URL)

    // Test basic connection
    console.log("📡 Connecting to database...")
    const result = await sql`SELECT NOW() as current_time`
    console.log("✅ Database connected successfully!")
    console.log("⏰ Current time:", result[0].current_time)

    // Test admin tables
    console.log("\n🔍 Checking admin tables...")

    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name LIKE 'admin_%'
      ORDER BY table_name
    `

    console.log("📋 Admin tables found:")
    tables.forEach((table) => {
      console.log(`  - ${table.table_name}`)
    })

    // Test sample data
    console.log("\n📊 Checking sample data...")

    const newsCount = await sql`SELECT COUNT(*) as count FROM admin_news`
    const umkmCount = await sql`SELECT COUNT(*) as count FROM admin_umkm`
    const profileCount = await sql`SELECT COUNT(*) as count FROM admin_village_profile`

    console.log(`📰 News articles: ${newsCount[0].count}`)
    console.log(`🏪 UMKM entries: ${umkmCount[0].count}`)
    console.log(`🏘️ Village profiles: ${profileCount[0].count}`)

    // Test admin user
    console.log("\n👤 Checking admin user...")
    const adminUser = await sql`SELECT email, name FROM admin_users WHERE email = 'admin@desakaliwungu.id'`

    if (adminUser.length > 0) {
      console.log(`✅ Admin user found: ${adminUser[0].name} (${adminUser[0].email})`)
    } else {
      console.log("❌ Admin user not found!")
    }

    console.log("\n🎉 Database setup is complete and working!")
    console.log("\n📝 Next steps:")
    console.log("1. Go to /admin to access the admin panel")
    console.log("2. Login with: admin@desakaliwungu.id / admin123")
    console.log("3. Add/edit content and see it appear on the main website")
    console.log("4. Check the main website to see the real data")
  } catch (error) {
    console.error("❌ Database connection failed:", error.message)
    console.log("\n🔧 Troubleshooting:")
    console.log("1. Make sure DATABASE_URL is set in your environment")
    console.log("2. Run the setup-admin-database.sql script in Neon first")
    console.log("3. Check your Neon database connection string")
  }
}

testConnection()
