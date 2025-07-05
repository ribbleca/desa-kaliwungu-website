-- Setup Database untuk Desa Kaliwungu Website
-- Jalankan script ini di Neon SQL Editor

-- 1. Create tables for village data
CREATE TABLE IF NOT EXISTS village_profile (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL DEFAULT 'Desa Kaliwungu',
    description TEXT,
    vision TEXT,
    mission TEXT,
    history TEXT,
    area_size VARCHAR(100),
    population INTEGER,
    village_head VARCHAR(255),
    address TEXT,
    phone VARCHAR(50),
    email VARCHAR(255),
    website VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Create table for village officials
CREATE TABLE IF NOT EXISTS village_officials (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    photo_url TEXT,
    phone VARCHAR(50),
    email VARCHAR(255),
    description TEXT,
    order_index INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create table for news/articles
CREATE TABLE IF NOT EXISTS news (
    id SERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(500) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    featured_image TEXT,
    author VARCHAR(255),
    category VARCHAR(100),
    tags TEXT[],
    is_published BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    published_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Create table for UMKM (Small Business)
CREATE TABLE IF NOT EXISTS umkm (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    owner_name VARCHAR(255),
    category VARCHAR(100),
    address TEXT,
    phone VARCHAR(50),
    email VARCHAR(255),
    website VARCHAR(255),
    social_media JSONB,
    products TEXT[],
    images TEXT[],
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Create table for gallery
CREATE TABLE IF NOT EXISTS gallery (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    category VARCHAR(100),
    tags TEXT[],
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Create table for agenda/events
CREATE TABLE IF NOT EXISTS agenda (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_date TIMESTAMP NOT NULL,
    location VARCHAR(255),
    organizer VARCHAR(255),
    category VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. Create table for statistics
CREATE TABLE IF NOT EXISTS statistics (
    id SERIAL PRIMARY KEY,
    category VARCHAR(100) NOT NULL,
    label VARCHAR(255) NOT NULL,
    value INTEGER NOT NULL,
    unit VARCHAR(50),
    description TEXT,
    icon VARCHAR(100),
    order_index INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. Create table for contact messages
CREATE TABLE IF NOT EXISTS contact_messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    subject VARCHAR(255),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    replied_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 9. Create table for users/admin
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default data
INSERT INTO village_profile (
    name, description, vision, mission, area_size, population, village_head, 
    address, phone, email, website
) VALUES (
    'Desa Kaliwungu',
    'Desa Kaliwungu adalah sebuah desa yang terletak di Kecamatan Sidareja, Kabupaten Cilacap, Jawa Tengah. Desa ini memiliki potensi alam yang indah dan masyarakat yang ramah.',
    'Menjadi desa yang maju, mandiri, dan sejahtera berbasis potensi lokal dengan tata kelola pemerintahan yang baik.',
    'Meningkatkan kesejahteraan masyarakat melalui pembangunan yang berkelanjutan, pemberdayaan ekonomi lokal, dan pelayanan publik yang prima.',
    '5.2 km²',
    3500,
    'Kepala Desa Kaliwungu',
    'Jl. Raya Kaliwungu No. 1, Sidareja, Cilacap, Jawa Tengah',
    '(0282) 123456',
    'info@desakaliwungu.id',
    'https://desakaliwungu.id'
) ON CONFLICT DO NOTHING;

-- Insert sample village officials
INSERT INTO village_officials (name, position, order_index) VALUES
    ('Kepala Desa Kaliwungu', 'Kepala Desa', 1),
    ('Sekretaris Desa', 'Sekretaris Desa', 2),
    ('Kaur Pemerintahan', 'Kepala Urusan Pemerintahan', 3),
    ('Kaur Pembangunan', 'Kepala Urusan Pembangunan', 4),
    ('Kaur Kesejahteraan Rakyat', 'Kepala Urusan Kesejahteraan Rakyat', 5),
    ('Kaur Keuangan', 'Kepala Urusan Keuangan', 6)
ON CONFLICT DO NOTHING;

-- Insert sample statistics
INSERT INTO statistics (category, label, value, unit, icon, order_index) VALUES
    ('demografi', 'Total Penduduk', 3500, 'jiwa', 'users', 1),
    ('demografi', 'Kepala Keluarga', 1200, 'KK', 'home', 2),
    ('demografi', 'Laki-laki', 1750, 'jiwa', 'user', 3),
    ('demografi', 'Perempuan', 1750, 'jiwa', 'user', 4),
    ('ekonomi', 'UMKM Aktif', 45, 'unit', 'store', 5),
    ('ekonomi', 'Kelompok Tani', 12, 'kelompok', 'wheat', 6),
    ('infrastruktur', 'Jalan Desa', 15, 'km', 'road', 7),
    ('infrastruktur', 'Jembatan', 8, 'unit', 'bridge', 8)
ON CONFLICT DO NOTHING;

-- Insert sample news
INSERT INTO news (title, slug, content, excerpt, category, is_published, published_at) VALUES
    (
        'Pembangunan Jalan Desa Tahap II Dimulai',
        'pembangunan-jalan-desa-tahap-ii-dimulai',
        'Pemerintah Desa Kaliwungu memulai pembangunan jalan desa tahap II yang akan menghubungkan wilayah utara dan selatan desa. Proyek ini diharapkan dapat meningkatkan aksesibilitas dan perekonomian masyarakat.',
        'Pembangunan jalan desa tahap II dimulai untuk meningkatkan aksesibilitas wilayah.',
        'Pembangunan',
        true,
        CURRENT_TIMESTAMP
    ),
    (
        'Festival Budaya Desa Kaliwungu 2024',
        'festival-budaya-desa-kaliwungu-2024',
        'Festival Budaya Desa Kaliwungu 2024 akan diselenggarakan pada bulan depan. Acara ini menampilkan berbagai pertunjukan seni tradisional, pameran UMKM, dan kuliner khas desa.',
        'Festival budaya tahunan menampilkan seni tradisional dan UMKM lokal.',
        'Budaya',
        true,
        CURRENT_TIMESTAMP
    )
ON CONFLICT DO NOTHING;

-- Insert sample UMKM
INSERT INTO umkm (name, description, owner_name, category, address, phone) VALUES
    (
        'Kerajinan Bambu Kaliwungu',
        'Usaha kerajinan bambu yang memproduksi berbagai produk seperti tas, tempat pensil, dan dekorasi rumah.',
        'Ibu Siti Aminah',
        'Kerajinan',
        'Dusun Krajan RT 02/RW 01',
        '081234567890'
    ),
    (
        'Warung Gudeg Bu Tini',
        'Warung gudeg dengan cita rasa khas Yogyakarta yang sudah berdiri sejak 1995.',
        'Ibu Tini Suryani',
        'Kuliner',
        'Jl. Raya Kaliwungu No. 25',
        '081234567891'
    )
ON CONFLICT DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_news_slug ON news(slug);
CREATE INDEX IF NOT EXISTS idx_news_published ON news(is_published, published_at);
CREATE INDEX IF NOT EXISTS idx_news_category ON news(category);
CREATE INDEX IF NOT EXISTS idx_umkm_category ON umkm(category);
CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery(category);
CREATE INDEX IF NOT EXISTS idx_statistics_category ON statistics(category);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created ON contact_messages(created_at);

-- Success message
SELECT 'Database setup completed successfully! All tables created and sample data inserted.' as status;
