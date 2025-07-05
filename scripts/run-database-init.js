// Node.js script to run database initialization
// Run this with: node scripts/run-database-init.js

const { neon } = require("@neondatabase/serverless")
const fs = require("fs")
const path = require("path")

async function initializeDatabase() {
  try {
    // Check if DATABASE_URL is set
    if (!process.env.DATABASE_URL) {
      console.error("❌ DATABASE_URL environment variable is not set")
      console.log("Please set your Neon database URL in environment variables")
      process.exit(1)
    }

    console.log("🔗 Connecting to database...")
    const sql = neon(process.env.DATABASE_URL)

    // Read the SQL file
    const sqlFilePath = path.join(__dirname, "run-init-production.sql")
    const sqlContent = fs.readFileSync(sqlFilePath, "utf8")

    // Split SQL content by statements (rough split by semicolon)
    const statements = sqlContent
      .split(";")
      .map((stmt) => stmt.trim())
      .filter((stmt) => stmt.length > 0 && !stmt.startsWith("--"))

    console.log("📊 Executing database initialization...")

    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i]
      if (statement.trim()) {
        try {
          console.log(`⏳ Executing statement ${i + 1}/${statements.length}...`)
          await sql`${statement}`
        } catch (error) {
          console.warn(`⚠️  Warning on statement ${i + 1}:`, error.message)
          // Continue with other statements
        }
      }
    }

    // Verify the setup
    console.log("✅ Verifying database setup...")

    const verification = await sql`
      SELECT 'users' as table_name, COUNT(*) as record_count FROM users
      UNION ALL
      SELECT 'news' as table_name, COUNT(*) as record_count FROM news
      UNION ALL
      SELECT 'umkm' as table_name, COUNT(*) as record_count FROM umkm
      UNION ALL
      SELECT 'gallery' as table_name, COUNT(*) as record_count FROM gallery
      UNION ALL
      SELECT 'agenda' as table_name, COUNT(*) as record_count FROM agenda
      UNION ALL
      SELECT 'village_officials' as table_name, COUNT(*) as record_count FROM village_officials
      UNION ALL
      SELECT 'village_profile' as table_name, COUNT(*) as record_count FROM village_profile
    `

    console.log("\n📋 Database Setup Summary:")
    console.log("================================")
    verification.forEach((row) => {
      console.log(`${row.table_name.padEnd(20)}: ${row.record_count} records`)
    })

    console.log("\n🎉 Database initialization completed successfully!")
    console.log("\n📝 Admin Login Credentials:")
    console.log("Email: admin@desakaliwungu.id")
    console.log("Password: admin123")
    console.log("\n🔗 You can now access the admin panel at: /admin")
  } catch (error) {
    console.error("❌ Database initialization failed:", error)
    process.exit(1)
  }
}

// Run the initialization
initializeDatabase()
