// Script untuk setup database production
const { neon } = require("@neondatabase/serverless")

async function setupProductionDatabase() {
  console.log("🚀 Setting up production database...")

  // Check if DATABASE_URL is set
  if (!process.env.DATABASE_URL) {
    console.error("❌ DATABASE_URL not found in environment variables")
    console.log("📝 Please add DATABASE_URL to Vercel environment variables")
    return
  }

  try {
    const sql = neon(process.env.DATABASE_URL)

    console.log("📊 Creating tables...")

    // Create all tables
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'admin',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `

    await sql`
      CREATE TABLE IF NOT EXISTS news (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        excerpt TEXT,
        image VARCHAR(500),
        category VARCHAR(100) NOT NULL,
        published BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `

    await sql`
      CREATE TABLE IF NOT EXISTS umkm (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        category VARCHAR(100) NOT NULL,
        owner VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        address TEXT NOT NULL,
        image VARCHAR(500),
        rating DECIMAL(2,1) DEFAULT 0,
        featured BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `

    await sql`
      CREATE TABLE IF NOT EXISTS gallery (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        image VARCHAR(500) NOT NULL,
        category VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `

    await sql`
      CREATE TABLE IF NOT EXISTS agenda (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        event_date DATE NOT NULL,
        location VARCHAR(255) NOT NULL,
        organizer VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `

    await sql`
      CREATE TABLE IF NOT EXISTS village_profile (
        id SERIAL PRIMARY KEY,
        vision TEXT,
        mission TEXT,
        history TEXT,
        area_size VARCHAR(50),
        population INTEGER DEFAULT 0,
        villages_count INTEGER DEFAULT 0,
        rw_count INTEGER DEFAULT 0,
        rt_count INTEGER DEFAULT 0,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `

    await sql`
      CREATE TABLE IF NOT EXISTS village_officials (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        position VARCHAR(255) NOT NULL,
        photo VARCHAR(500),
        phone VARCHAR(20),
        email VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `

    console.log("✅ Tables created successfully!")

    // Insert sample data
    console.log("📝 Inserting sample data...")

    // Insert default admin user
    await sql`
      INSERT INTO users (email, password, name, role) 
      VALUES ('admin@desakaliwungu.id', '$2b$10$rQZ9QmjytWzJFHKmNj6jKuK4H.Ks8J9FxOx7J8sJ9FxOx7J8sJ9Fx', 'Admin Desa', 'admin')
      ON CONFLICT (email) DO NOTHING;
    `

    // Insert village profile
    await sql`
      INSERT INTO village_profile (vision, mission, history, area_size, population, villages_count, rw_count, rt_count)
      VALUES (
        'Menjadi desa yang maju, mandiri, dan sejahtera berbasis potensi lokal',
        'Meningkatkan kesejahteraan masyarakat melalui pembangunan yang berkelanjutan',
        'Desa Kaliwungu memiliki sejarah panjang sebagai desa yang kaya akan budaya dan tradisi',
        '15.5 km²',
        5420,
        8,
        12,
        45
      )
      ON CONFLICT DO NOTHING;
    `

    // Insert sample news
    await sql`
      INSERT INTO news (title, content, excerpt, category, published)
      VALUES 
        ('Selamat Datang di Website Desa Kaliwungu', 'Website resmi Desa Kaliwungu telah diluncurkan untuk memberikan informasi terkini kepada masyarakat.', 'Website resmi Desa Kaliwungu telah diluncurkan', 'Pengumuman', true),
        ('Program Bantuan Sosial 2024', 'Pemerintah desa mengumumkan program bantuan sosial untuk masyarakat kurang mampu tahun 2024.', 'Program bantuan sosial untuk masyarakat kurang mampu', 'Program', true)
      ON CONFLICT DO NOTHING;
    `

    // Insert sample UMKM
    await sql`
      INSERT INTO umkm (name, description, category, owner, phone, address, rating, featured)
      VALUES 
        ('Warung Makan Bu Sari', 'Warung makan tradisional dengan menu khas daerah yang lezat dan terjangkau', 'Kuliner', 'Bu Sari', '081234567890', 'Jl. Raya Kaliwungu No. 15', 4.5, true),
        ('Toko Kelontong Pak Budi', 'Toko kelontong lengkap melayani kebutuhan sehari-hari masyarakat', 'Retail', 'Pak Budi', '081234567891', 'Jl. Masjid No. 8', 4.2, true)
      ON CONFLICT DO NOTHING;
    `

    // Insert sample agenda
    await sql`
      INSERT INTO agenda (title, description, event_date, location, organizer)
      VALUES 
        ('Rapat Koordinasi RT/RW', 'Rapat koordinasi bulanan dengan seluruh RT/RW se-desa Kaliwungu', '2024-02-15', 'Balai Desa Kaliwungu', 'Pemerintah Desa'),
        ('Gotong Royong Bersih Desa', 'Kegiatan gotong royong membersihkan lingkungan desa', '2024-02-20', 'Seluruh Wilayah Desa', 'Karang Taruna')
      ON CONFLICT DO NOTHING;
    `

    console.log("✅ Sample data inserted successfully!")
    console.log("🎉 Production database setup complete!")
  } catch (error) {
    console.error("❌ Database setup failed:", error)
    throw error
  }
}

// Run setup
setupProductionDatabase()
  .then(() => {
    console.log("✅ Database setup completed successfully!")
    process.exit(0)
  })
  .catch((error) => {
    console.error("❌ Database setup failed:", error)
    process.exit(1)
  })
