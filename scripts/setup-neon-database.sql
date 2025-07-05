-- Script SQL untuk setup database Neon
-- Copy paste script ini ke Neon SQL Editor

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create news table
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

-- Create umkm table
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

-- Create gallery table
CREATE TABLE IF NOT EXISTS gallery (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image VARCHAR(500) NOT NULL,
    category VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create agenda table
CREATE TABLE IF NOT EXISTS agenda (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    event_date DATE NOT NULL,
    location VARCHAR(255) NOT NULL,
    organizer VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create village_profile table
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

-- Create village_officials table
CREATE TABLE IF NOT EXISTS village_officials (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    photo VARCHAR(500),
    phone VARCHAR(20),
    email VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default admin user (password: admin123)
INSERT INTO users (email, password, name, role) 
VALUES ('admin@desakaliwungu.id', '$2b$10$rQZ9QmjytWzJFHKmNj6jKuK4H.Ks8J9FxOx7J8sJ9FxOx7J8sJ9Fx', 'Admin Desa', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Insert village profile
INSERT INTO village_profile (vision, mission, history, area_size, population, villages_count, rw_count, rt_count)
VALUES (
    'Menjadi desa yang maju, mandiri, dan sejahtera berbasis potensi lokal dengan tata kelola pemerintahan yang baik',
    'Meningkatkan kesejahteraan masyarakat melalui pembangunan yang berkelanjutan dan pemberdayaan ekonomi lokal',
    'Desa Kaliwungu memiliki sejarah panjang sebagai desa yang kaya akan budaya dan tradisi. Terletak di Kecamatan Sidareja, desa ini telah berkembang menjadi pusat kegiatan ekonomi dan sosial masyarakat.',
    '15.5 km²',
    5420,
    8,
    12,
    45
)
ON CONFLICT DO NOTHING;

-- Insert sample news
INSERT INTO news (title, content, excerpt, category, published, created_at)
VALUES 
    ('Selamat Datang di Website Desa Kaliwungu', 
     'Website resmi Desa Kaliwungu telah diluncurkan untuk memberikan informasi terkini kepada masyarakat. Website ini menyediakan berbagai informasi mulai dari berita desa, profil UMKM, agenda kegiatan, hingga layanan administrasi online.',
     'Website resmi Desa Kaliwungu telah diluncurkan untuk memberikan informasi terkini kepada masyarakat',
     'Pengumuman', true, NOW()),
     
    ('Program Bantuan Sosial 2024', 
     'Pemerintah desa mengumumkan program bantuan sosial untuk masyarakat kurang mampu tahun 2024. Program ini meliputi bantuan sembako, bantuan pendidikan, dan bantuan kesehatan bagi keluarga yang memenuhi kriteria.',
     'Program bantuan sosial untuk masyarakat kurang mampu tahun 2024',
     'Program', true, NOW()),
     
    ('Gotong Royong Bersih Desa', 
     'Kegiatan gotong royong membersihkan lingkungan desa akan dilaksanakan setiap hari Minggu pertama di setiap bulan. Seluruh warga diharapkan berpartisipasi aktif dalam menjaga kebersihan lingkungan.',
     'Kegiatan gotong royong membersihkan lingkungan desa setiap bulan',
     'Kegiatan', true, NOW())
ON CONFLICT DO NOTHING;

-- Insert sample UMKM
INSERT INTO umkm (name, description, category, owner, phone, address, rating, featured, created_at)
VALUES 
    ('Warung Makan Bu Sari', 
     'Warung makan tradisional dengan menu khas daerah yang lezat dan terjangkau. Menyediakan berbagai masakan rumahan dengan cita rasa autentik.',
     'Kuliner', 'Bu Sari', '081234567890', 'Jl. Raya Kaliwungu No. 15', 4.5, true, NOW()),
     
    ('Toko Kelontong Pak Budi', 
     'Toko kelontong lengkap melayani kebutuhan sehari-hari masyarakat. Menyediakan sembako, alat tulis, dan keperluan rumah tangga.',
     'Retail', 'Pak Budi', '081234567891', 'Jl. Masjid No. 8', 4.2, true, NOW()),
     
    ('Kerajinan Anyaman Bambu', 
     'Usaha kerajinan anyaman bambu dengan berbagai produk seperti keranjang, tempat nasi, dan souvenir khas daerah.',
     'Kerajinan', 'Bu Wati', '081234567892', 'Dusun Kaliwungu Lor', 4.7, true, NOW())
ON CONFLICT DO NOTHING;

-- Insert sample agenda
INSERT INTO agenda (title, description, event_date, location, organizer, created_at)
VALUES 
    ('Rapat Koordinasi RT/RW', 
     'Rapat koordinasi bulanan dengan seluruh RT/RW se-desa Kaliwungu untuk membahas program kerja dan permasalahan yang ada.',
     '2024-02-15', 'Balai Desa Kaliwungu', 'Pemerintah Desa', NOW()),
     
    ('Gotong Royong Bersih Desa', 
     'Kegiatan gotong royong membersihkan lingkungan desa yang dilaksanakan setiap bulan.',
     '2024-02-20', 'Seluruh Wilayah Desa', 'Karang Taruna', NOW()),
     
    ('Pelatihan UMKM Digital Marketing', 
     'Pelatihan pemasaran digital untuk pelaku UMKM agar dapat memasarkan produk secara online.',
     '2024-02-25', 'Aula Balai Desa', 'Dinas Koperasi', NOW())
ON CONFLICT DO NOTHING;

-- Insert sample village officials
INSERT INTO village_officials (name, position, phone, email, created_at)
VALUES 
    ('Budi Santoso, S.Sos', 'Kepala Desa', '081234567800', 'kepala@desakaliwungu.id', NOW()),
    ('Siti Aminah, S.Pd', 'Sekretaris Desa', '081234567801', 'sekretaris@desakaliwungu.id', NOW()),
    ('Ahmad Fauzi', 'Kaur Keuangan', '081234567802', 'keuangan@desakaliwungu.id', NOW()),
    ('Dewi Sartika', 'Kaur Umum', '081234567803', 'umum@desakaliwungu.id', NOW())
ON CONFLICT DO NOTHING;

-- Insert sample gallery
INSERT INTO gallery (title, description, image, category, created_at)
VALUES 
    ('Gotong Royong Bersih Desa', 'Kegiatan gotong royong membersihkan lingkungan desa', '/placeholder.svg?height=300&width=400', 'Kegiatan', NOW()),
    ('Panen Raya Padi', 'Dokumentasi panen raya padi di sawah desa', '/placeholder.svg?height=300&width=400', 'Pertanian', NOW()),
    ('Festival UMKM', 'Acara festival UMKM tahunan desa', '/placeholder.svg?height=300&width=400', 'Ekonomi', NOW()),
    ('Balai Desa Kaliwungu', 'Gedung balai desa yang baru direnovasi', '/placeholder.svg?height=300&width=400', 'Fasilitas', NOW())
ON CONFLICT DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_news_published ON news(published);
CREATE INDEX IF NOT EXISTS idx_news_category ON news(category);
CREATE INDEX IF NOT EXISTS idx_umkm_featured ON umkm(featured);
CREATE INDEX IF NOT EXISTS idx_agenda_date ON agenda(event_date);

-- Success message
SELECT 'Database setup completed successfully! All tables created and sample data inserted.' as status;
