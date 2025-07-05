-- Create database tables for Desa Kaliwungu website
-- Run this script in Neon SQL Editor

-- Create users table for admin authentication
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create news table
CREATE TABLE IF NOT EXISTS news (
    id SERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    image VARCHAR(500),
    category VARCHAR(100) DEFAULT 'Umum',
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
    owner VARCHAR(255),
    phone VARCHAR(50),
    address TEXT,
    image VARCHAR(500),
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
    category VARCHAR(100) DEFAULT 'Kegiatan',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create village_profile table
CREATE TABLE IF NOT EXISTS village_profile (
    id SERIAL PRIMARY KEY,
    vision TEXT,
    mission TEXT,
    history TEXT,
    area_size VARCHAR(50),
    population INTEGER,
    villages_count INTEGER,
    rw_count INTEGER,
    rt_count INTEGER,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create village_officials table
CREATE TABLE IF NOT EXISTS village_officials (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    photo VARCHAR(500),
    phone VARCHAR(50),
    email VARCHAR(255),
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    subject VARCHAR(500),
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'unread',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create agenda table
CREATE TABLE IF NOT EXISTS agenda (
    id SERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    description TEXT,
    date DATE NOT NULL,
    time TIME,
    location VARCHAR(255),
    category VARCHAR(100) DEFAULT 'Kegiatan',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default admin user (password: admin123)
INSERT INTO users (email, password, name, role) 
VALUES ('admin@desakaliwungu.id', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Administrator', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Insert sample village profile
INSERT INTO village_profile (vision, mission, history, area_size, population, villages_count, rw_count, rt_count)
VALUES (
    'Terwujudnya Desa Kaliwungu yang Maju, Mandiri, dan Sejahtera berdasarkan Pancasila dan UUD 1945',
    'Meningkatkan kualitas pelayanan publik; Mengembangkan potensi ekonomi desa; Memperkuat infrastruktur dan fasilitas umum; Memberdayakan masyarakat melalui pendidikan; Melestarikan budaya dan lingkungan hidup',
    'Desa Kaliwungu memiliki sejarah panjang yang dimulai pada abad ke-18. Nama Kaliwungu berasal dari kata Kali yang berarti sungai dan Wungu yang berarti ungu, merujuk pada sungai yang airnya berwarna keunguan karena tanah liat di sekitarnya.',
    '450 Ha',
    3247,
    5,
    15,
    45
) ON CONFLICT DO NOTHING;

-- Insert sample village officials
INSERT INTO village_officials (name, position, order_index) VALUES
('Budi Santoso', 'Kepala Desa', 1),
('Siti Aminah', 'Sekretaris Desa', 2),
('Ahmad Wijaya', 'Kepala Urusan Pemerintahan', 3),
('Rina Sari', 'Kepala Urusan Pembangunan', 4),
('Joko Susilo', 'Kepala Urusan Kesejahteraan Rakyat', 5),
('Maya Indira', 'Bendahara Desa', 6)
ON CONFLICT DO NOTHING;

-- Insert sample news
INSERT INTO news (title, content, excerpt, category, published) VALUES
('Pembangunan Jalan Desa Tahap II Dimulai', 'Pemerintah Desa Kaliwungu dengan bangga mengumumkan dimulainya pembangunan jalan desa tahap II. Proyek ini merupakan kelanjutan dari pembangunan infrastruktur yang telah dimulai tahun lalu.', 'Pembangunan jalan desa tahap II resmi dimulai untuk meningkatkan akses transportasi warga.', 'Pembangunan', true),
('Festival UMKM Desa Kaliwungu 2024', 'Festival UMKM tahunan Desa Kaliwungu akan diselenggarakan pada bulan depan. Acara ini menampilkan berbagai produk unggulan dari pelaku UMKM lokal.', 'Festival UMKM tahunan akan menampilkan produk-produk unggulan dari pelaku usaha lokal.', 'Ekonomi', true),
('Program Posyandu Balita Berjalan Lancar', 'Kegiatan Posyandu di Desa Kaliwungu berjalan dengan baik. Tingkat partisipasi masyarakat dalam program kesehatan ini mencapai 85%.', 'Program Posyandu balita mencatat tingkat partisipasi masyarakat yang tinggi.', 'Kesehatan', true)
ON CONFLICT DO NOTHING;

-- Insert sample UMKM
INSERT INTO umkm (name, description, category, owner, phone, featured) VALUES
('Keripik Singkong Bu Tini', 'Keripik singkong renyah dengan berbagai varian rasa. Dibuat dari singkong pilihan dengan resep turun temurun.', 'Makanan & Minuman', 'Tini Suryani', '081234567890', true),
('Anyaman Bambu Pak Karno', 'Kerajinan anyaman bambu berkualitas tinggi. Menerima pesanan berbagai macam produk anyaman.', 'Kerajinan', 'Karno Wijaya', '081234567891', true),
('Batik Tulis Kaliwungu', 'Batik tulis dengan motif khas Kaliwungu. Menggunakan pewarna alami dan teknik tradisional.', 'Fashion', 'Sari Indah', '081234567892', false)
ON CONFLICT DO NOTHING;

-- Insert sample gallery
INSERT INTO gallery (title, description, image, category) VALUES
('Gotong Royong Pembersihan Desa', 'Kegiatan gotong royong rutin yang dilakukan setiap bulan oleh warga Desa Kaliwungu', '/placeholder.svg?height=300&width=400', 'Kegiatan'),
('Panen Raya Padi 2024', 'Musim panen padi yang melimpah di sawah-sawah Desa Kaliwungu', '/placeholder.svg?height=300&width=400', 'Pertanian'),
('Festival Budaya Tahunan', 'Pentas seni dan budaya yang diselenggarakan setiap tahun', '/placeholder.svg?height=300&width=400', 'Budaya')
ON CONFLICT DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_news_published ON news(published);
CREATE INDEX IF NOT EXISTS idx_news_category ON news(category);
CREATE INDEX IF NOT EXISTS idx_umkm_featured ON umkm(featured);
CREATE INDEX IF NOT EXISTS idx_umkm_category ON umkm(category);
CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery(category);
CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_officials_order ON village_officials(order_index);

-- Success message
SELECT 'Database setup completed successfully!' as message;
