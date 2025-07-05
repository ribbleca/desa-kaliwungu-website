-- Setup database untuk admin panel yang berfungsi penuh
-- Jalankan script ini di Neon SQL Editor

-- Drop existing tables if needed (hati-hati di production!)
DROP TABLE IF EXISTS admin_users CASCADE;
DROP TABLE IF EXISTS admin_news CASCADE;
DROP TABLE IF EXISTS admin_umkm CASCADE;
DROP TABLE IF EXISTS admin_village_profile CASCADE;
DROP TABLE IF EXISTS admin_gallery CASCADE;
DROP TABLE IF EXISTS admin_agenda CASCADE;

-- Create admin users table
CREATE TABLE admin_users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create news table
CREATE TABLE admin_news (
    id SERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    image VARCHAR(500),
    category VARCHAR(100) DEFAULT 'Umum',
    published BOOLEAN DEFAULT false,
    author_id INTEGER REFERENCES admin_users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create UMKM table
CREATE TABLE admin_umkm (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    owner VARCHAR(255),
    phone VARCHAR(50),
    address TEXT,
    image VARCHAR(500),
    rating DECIMAL(2,1) DEFAULT 0.0,
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create village profile table
CREATE TABLE admin_village_profile (
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

-- Create gallery table
CREATE TABLE admin_gallery (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image VARCHAR(500) NOT NULL,
    category VARCHAR(100) DEFAULT 'Kegiatan',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create agenda table
CREATE TABLE admin_agenda (
    id SERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    event_time TIME,
    location VARCHAR(255),
    organizer VARCHAR(255),
    category VARCHAR(100) DEFAULT 'Kegiatan',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_admin_news_published ON admin_news(published);
CREATE INDEX idx_admin_news_category ON admin_news(category);
CREATE INDEX idx_admin_news_created_at ON admin_news(created_at DESC);
CREATE INDEX idx_admin_umkm_featured ON admin_umkm(featured);
CREATE INDEX idx_admin_umkm_category ON admin_umkm(category);
CREATE INDEX idx_admin_gallery_category ON admin_gallery(category);
CREATE INDEX idx_admin_agenda_date ON admin_agenda(event_date);

-- Insert default admin user (password: admin123 - hashed with bcrypt)
INSERT INTO admin_users (email, password, name, role) VALUES
('admin@desakaliwungu.id', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Administrator Desa', 'admin');

-- Insert default village profile
INSERT INTO admin_village_profile (vision, mission, history, area_size, population, villages_count, rw_count, rt_count) VALUES
(
    'Terwujudnya Desa Kaliwungu yang Maju, Mandiri, dan Sejahtera berbasis Potensi Lokal dengan Tata Kelola Pemerintahan yang Baik',
    'Meningkatkan kualitas pelayanan publik kepada masyarakat; Mengembangkan potensi ekonomi desa melalui UMKM dan pertanian; Memperkuat infrastruktur dan fasilitas umum desa; Memberdayakan masyarakat melalui pendidikan dan pelatihan; Melestarikan budaya lokal dan menjaga kelestarian lingkungan hidup',
    'Desa Kaliwungu memiliki sejarah panjang yang dimulai pada abad ke-18. Nama "Kaliwungu" berasal dari bahasa Jawa yang berarti "sungai yang jernih", mengacu pada sungai kecil yang mengalir di tengah desa dan menjadi sumber kehidupan masyarakat.',
    '450 Ha',
    3247,
    5,
    15,
    45
);

-- Insert sample news
INSERT INTO admin_news (title, content, excerpt, category, published, author_id) VALUES
(
    'Selamat Datang di Admin Panel Baru',
    'Admin panel website Desa Kaliwungu telah diperbarui dengan fitur-fitur baru yang lebih lengkap dan mudah digunakan. Sekarang admin dapat mengelola berita, UMKM, galeri, dan profil desa dengan lebih efisien.',
    'Admin panel website desa telah diperbarui dengan fitur baru yang lebih lengkap.',
    'Teknologi',
    true,
    1
),
(
    'Program Digitalisasi Desa Dimulai',
    'Pemerintah Desa Kaliwungu memulai program digitalisasi untuk meningkatkan pelayanan kepada masyarakat. Program ini mencakup pembuatan website desa, sistem informasi desa, dan pelatihan digital untuk aparatur desa.',
    'Program digitalisasi desa dimulai untuk meningkatkan pelayanan masyarakat.',
    'Pembangunan',
    true,
    1
);

-- Insert sample UMKM
INSERT INTO admin_umkm (name, description, category, owner, phone, address, featured) VALUES
(
    'Keripik Singkong Bu Tini',
    'Keripik singkong renyah dengan berbagai varian rasa. Dibuat dari singkong pilihan dengan resep turun temurun yang telah dipercaya selama puluhan tahun.',
    'Makanan & Minuman',
    'Tini Suryani',
    '081234567890',
    'Dusun Kaliwungu Lor RT 02 RW 01',
    true
),
(
    'Anyaman Bambu Pak Karno',
    'Kerajinan anyaman bambu berkualitas tinggi dengan berbagai produk seperti keranjang, tempat nasi, dan furniture bambu. Menerima pesanan custom sesuai kebutuhan.',
    'Kerajinan',
    'Karno Wijaya',
    '081234567891',
    'Dusun Kaliwungu Kidul RT 03 RW 02',
    true
),
(
    'Warung Gudeg Bu Sari',
    'Gudeg khas Yogya dengan cita rasa autentik. Menggunakan bumbu tradisional dan dimasak dengan kayu bakar untuk menghasilkan rasa yang khas dan nikmat.',
    'Makanan & Minuman',
    'Sari Indah',
    '081234567892',
    'Dusun Tegalsari RT 01 RW 03',
    false
);

-- Insert sample gallery
INSERT INTO admin_gallery (title, description, image, category) VALUES
('Gotong Royong Pembersihan Desa', 'Kegiatan gotong royong rutin yang dilakukan setiap bulan oleh warga Desa Kaliwungu untuk menjaga kebersihan lingkungan', '/placeholder.svg?height=300&width=400', 'Kegiatan'),
('Panen Raya Padi 2024', 'Dokumentasi panen raya padi di sawah-sawah Desa Kaliwungu dengan hasil yang melimpah', '/placeholder.svg?height=300&width=400', 'Pertanian'),
('Festival Budaya Tahunan', 'Pentas seni dan budaya yang diselenggarakan setiap tahun untuk melestarikan budaya lokal', '/placeholder.svg?height=300&width=400', 'Budaya');

-- Insert sample agenda
INSERT INTO admin_agenda (title, description, event_date, event_time, location, organizer, category) VALUES
('Rapat Koordinasi RT/RW', 'Rapat koordinasi bulanan dengan seluruh RT/RW untuk membahas program kerja desa', '2024-02-15', '19:00', 'Balai Desa Kaliwungu', 'Pemerintah Desa', 'Pemerintahan'),
('Posyandu Balita', 'Kegiatan posyandu rutin untuk pemeriksaan kesehatan balita dan ibu hamil', '2024-02-20', '08:00', 'Balai Dusun Kaliwungu Lor', 'Kader Posyandu', 'Kesehatan'),
('Festival UMKM Desa', 'Festival tahunan untuk mempromosikan produk UMKM lokal', '2024-03-15', '09:00', 'Halaman Balai Desa', 'Pemerintah Desa', 'Ekonomi');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_news_updated_at BEFORE UPDATE ON admin_news
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_umkm_updated_at BEFORE UPDATE ON admin_umkm
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_village_profile_updated_at BEFORE UPDATE ON admin_village_profile
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Success message
SELECT 'Admin database setup completed successfully!' as message,
       'Tables created: admin_users, admin_news, admin_umkm, admin_village_profile, admin_gallery, admin_agenda' as tables,
       'Sample data inserted for testing' as data_status;
