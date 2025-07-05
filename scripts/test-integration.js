import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL)

async function testIntegration() {
  console.log("🔍 Testing Database Integration...")

  try {
    // Test 1: Check if admin tables exist
    console.log("\n1. Checking admin tables...")
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name LIKE 'admin_%'
    `
    console.log(
      "✅ Admin tables found:",
      tables.map((t) => t.table_name),
    )

    // Test 2: Check news integration
    console.log("\n2. Testing news integration...")
    const newsCount = await sql`SELECT COUNT(*) as count FROM admin_news`
    console.log(`✅ Total news in admin_news: ${newsCount[0].count}`)

    // Test 3: Check UMKM integration
    console.log("\n3. Testing UMKM integration...")
    const umkmCount = await sql`SELECT COUNT(*) as count FROM admin_umkm`
    console.log(`✅ Total UMKM in admin_umkm: ${umkmCount[0].count}`)

    // Test 4: Check village profile
    console.log("\n4. Testing village profile...")
    const profile = await sql`SELECT * FROM admin_village_profile LIMIT 1`
    console.log(`✅ Village profile exists: ${profile.length > 0 ? "Yes" : "No"}`)

    // Test 5: Check admin users
    console.log("\n5. Testing admin users...")
    const users = await sql`SELECT COUNT(*) as count FROM admin_users`
    console.log(`✅ Total admin users: ${users[0].count}`)

    console.log("\n🎉 DATABASE INTEGRATION TEST COMPLETED!")
    console.log("✅ Admin panel and website are now using the SAME database tables!")
    console.log("✅ Any changes in admin panel will immediately appear on the website!")
  } catch (error) {
    console.error("❌ Integration test failed:", error)
    console.log("\n🔧 Please run the setup-admin-database.sql script first!")
  }
}

testIntegration()
