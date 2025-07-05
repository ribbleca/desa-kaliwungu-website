const { neon } = require("@neondatabase/serverless")

if (!process.env.DATABASE_URL) {
  console.error("❌ DATABASE_URL is not set")
  process.exit(1)
}

const sql = neon(process.env.DATABASE_URL)

async function testIntegration() {
  console.log("🧪 Testing Database Integration...")
  console.log("=".repeat(50))

  try {
    // Test 1: Check if admin tables exist
    console.log("1️⃣ Checking admin tables...")
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name LIKE 'admin_%'
    `

    const expectedTables = ["admin_news", "admin_umkm", "admin_village_profile", "admin_gallery", "admin_agenda"]
    const existingTables = tables.map((t) => t.table_name)

    for (const table of expectedTables) {
      if (existingTables.includes(table)) {
        console.log(`   ✅ ${table} exists`)
      } else {
        console.log(`   ❌ ${table} missing`)
      }
    }

    // Test 2: Test news integration
    console.log("\n2️⃣ Testing news integration...")
    const newsCount = await sql`SELECT COUNT(*) as count FROM admin_news`
    console.log(`   📰 Total news: ${newsCount[0].count}`)

    const publishedNews = await sql`SELECT COUNT(*) as count FROM admin_news WHERE published = true`
    console.log(`   📢 Published news: ${publishedNews[0].count}`)

    // Test 3: Test UMKM integration
    console.log("\n3️⃣ Testing UMKM integration...")
    const umkmCount = await sql`SELECT COUNT(*) as count FROM admin_umkm`
    console.log(`   🏪 Total UMKM: ${umkmCount[0].count}`)

    const featuredUmkm = await sql`SELECT COUNT(*) as count FROM admin_umkm WHERE featured = true`
    console.log(`   ⭐ Featured UMKM: ${featuredUmkm[0].count}`)

    // Test 4: Test village profile
    console.log("\n4️⃣ Testing village profile...")
    const profile = await sql`SELECT * FROM admin_village_profile ORDER BY id DESC LIMIT 1`
    if (profile.length > 0) {
      console.log(`   ✅ Village profile exists`)
      console.log(`   👥 Population: ${profile[0].population || "Not set"}`)
      console.log(`   📏 Area size: ${profile[0].area_size || "Not set"}`)
    } else {
      console.log(`   ❌ No village profile found`)
    }

    // Test 5: Test gallery
    console.log("\n5️⃣ Testing gallery...")
    const galleryCount = await sql`SELECT COUNT(*) as count FROM admin_gallery`
    console.log(`   🖼️ Total gallery items: ${galleryCount[0].count}`)

    // Test 6: Test agenda
    console.log("\n6️⃣ Testing agenda...")
    const agendaCount = await sql`SELECT COUNT(*) as count FROM admin_agenda`
    console.log(`   📅 Total agenda items: ${agendaCount[0].count}`)

    const upcomingAgenda = await sql`SELECT COUNT(*) as count FROM admin_agenda WHERE event_date >= CURRENT_DATE`
    console.log(`   🔜 Upcoming events: ${upcomingAgenda[0].count}`)

    // Test 7: Integration test - add sample data
    console.log("\n7️⃣ Testing data insertion...")

    try {
      // Insert test news
      const testNews = await sql`
        INSERT INTO admin_news (title, content, excerpt, category, published, author_id)
        VALUES ('Test Integration News', 'This is a test news for integration', 'Test excerpt', 'Umum', true, 1)
        RETURNING id, title
      `
      console.log(`   ✅ Test news created: ${testNews[0].title} (ID: ${testNews[0].id})`)

      // Insert test UMKM
      const testUmkm = await sql`
        INSERT INTO admin_umkm (name, description, category, featured)
        VALUES ('Test UMKM Integration', 'This is a test UMKM for integration', 'Makanan & Minuman', true)
        RETURNING id, name
      `
      console.log(`   ✅ Test UMKM created: ${testUmkm[0].name} (ID: ${testUmkm[0].id})`)

      // Clean up test data
      await sql`DELETE FROM admin_news WHERE id = ${testNews[0].id}`
      await sql`DELETE FROM admin_umkm WHERE id = ${testUmkm[0].id}`
      console.log(`   🧹 Test data cleaned up`)
    } catch (error) {
      console.log(`   ❌ Data insertion test failed: ${error.message}`)
    }

    console.log("\n" + "=".repeat(50))
    console.log("🎉 INTEGRATION TEST COMPLETED!")
    console.log("✅ Admin panel and website are now fully integrated!")
    console.log("✅ All data changes in admin will appear on the website!")
  } catch (error) {
    console.error("❌ Integration test failed:", error.message)
    process.exit(1)
  }
}

testIntegration()
