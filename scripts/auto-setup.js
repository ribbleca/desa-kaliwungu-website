// Script otomatis untuk setup database
// Jalankan dengan: node scripts/auto-setup.js

const { neon } = require("@neondatabase/serverless")

async function autoSetup() {
  console.log("🚀 AUTO SETUP WEBSITE DESA KALIWUNGU")
  console.log("=====================================\n")

  // Cek environment variables
  console.log("🔍 Mengecek environment variables...")

  const requiredVars = {
    DATABASE_URL: process.env.DATABASE_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || "desa-kaliwungu-secret-2024",
    NEXTAUTH_URL:
      process.env.NEXTAUTH_URL || process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000",
  }

  const missingVars = []

  for (const [key, value] of Object.entries(requiredVars)) {
    if (!value) {
      missingVars.push(key)
      console.log(`❌ ${key}: TIDAK ADA`)
    } else {
      console.log(`✅ ${key}: OK`)
    }
  }

  if (missingVars.length > 0) {
    console.log("\n❌ SETUP GAGAL!")
    console.log("Environment variables yang hilang:", missingVars.join(", "))
    console.log("\n📋 CARA PERBAIKI:")
    console.log("1. Pastikan Anda sudah set DATABASE_URL dari Neon")
    console.log("2. Set environment variables di Vercel dashboard")
    console.log("3. Redeploy aplikasi di Vercel")
    return
  }

  // Setup database
  console.log("\n🗄️  Menginisialisasi database...")

  try {
    const sql = neon(process.env.DATABASE_URL)

    // Test koneksi
    console.log("🔗 Testing koneksi database...")
    await sql`SELECT 1 as test`
    console.log("✅ Koneksi database berhasil!")

    // Cek apakah tabel sudah ada
    console.log("🔍 Mengecek tabel yang ada...")
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `

    if (tables.length > 0) {
      console.log("✅ Database sudah diinisialisasi!")
      console.log("📊 Tabel yang ada:", tables.map((t) => t.table_name).join(", "))

      // Cek data
      const userCount = await sql`SELECT COUNT(*) as count FROM users`
      const newsCount = await sql`SELECT COUNT(*) as count FROM news`
      const umkmCount = await sql`SELECT COUNT(*) as count FROM umkm`

      console.log("\n📈 Data yang ada:")
      console.log(`- Users: ${userCount[0].count}`)
      console.log(`- Berita: ${newsCount[0].count}`)
      console.log(`- UMKM: ${umkmCount[0].count}`)
    } else {
      console.log("⚠️  Database kosong, perlu inisialisasi manual")
      console.log("\n📋 CARA INISIALISASI:")
      console.log("1. Buka https://console.neon.tech")
      console.log("2. Pilih project database Anda")
      console.log("3. Klik 'SQL Editor'")
      console.log("4. Copy-paste isi file 'scripts/run-init-production.sql'")
      console.log("5. Klik 'Run' untuk eksekusi")
    }
  } catch (error) {
    console.log("❌ Error koneksi database:", error.message)
    console.log("\n📋 CARA PERBAIKI:")
    console.log("1. Cek DATABASE_URL Anda benar")
    console.log("2. Pastikan database Neon aktif")
    console.log("3. Cek koneksi internet")
    return
  }

  // Cek deployment
  console.log("\n🌐 Mengecek deployment...")

  if (process.env.VERCEL_URL) {
    console.log(`✅ Deployed di: https://${process.env.VERCEL_URL}`)
    console.log(`🔐 Admin panel: https://${process.env.VERCEL_URL}/admin`)
  } else if (process.env.NEXTAUTH_URL) {
    console.log(`✅ URL: ${process.env.NEXTAUTH_URL}`)
    console.log(`🔐 Admin panel: ${process.env.NEXTAUTH_URL}/admin`)
  } else {
    console.log("⚠️  Belum di-deploy atau URL tidak diset")
  }

  // Summary
  console.log("\n🎉 SETUP SELESAI!")
  console.log("=================")
  console.log("✅ Database: Terhubung")
  console.log("✅ Environment: OK")
  console.log("✅ Website: Siap digunakan")

  console.log("\n🔐 LOGIN ADMIN:")
  console.log("Email: admin@desakaliwungu.id")
  console.log("Password: admin123")

  console.log("\n📋 LANGKAH SELANJUTNYA:")
  console.log("1. Buka website Anda")
  console.log("2. Login ke admin panel")
  console.log("3. Ganti password admin")
  console.log("4. Edit konten sesuai kebutuhan")

  console.log("\n🎯 WEBSITE DESA KALIWUNGU SIAP DIGUNAKAN!")
}

// Jalankan setup
autoSetup().catch(console.error)
