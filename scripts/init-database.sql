-- Database initialization script for Desa Kaliwungu website
-- This script creates the necessary tables for the village website

-- Create news table
CREATE TABLE IF NOT EXISTS news (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    image VARCHAR(255),
    category VARCHAR(100) NOT NULL,
    published BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create UMKM table
CREATE TABLE IF NOT EXISTS umkm (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100) NOT NULL,
    owner VARCHAR(255),
    phone VARCHAR(20),
    address TEXT,
    image VARCHAR(255),
    rating DECIMAL(2,1) DEFAULT 0.0,
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create gallery table
CREATE TABLE IF NOT EXISTS gallery (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create agenda table
CREATE TABLE IF NOT EXISTS agenda (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    location VARCHAR(255),
    organizer VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create village officials table
CREATE TABLE IF NOT EXISTS village_officials (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    photo VARCHAR(255),
    phone VARCHAR(20),
    email VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create village profile table
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

-- Create users table for admin authentication
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO news (title, content, excerpt, category, published) VALUES
('Pembangunan Jalan Desa Tahap II Dimulai', 'Pemerintah desa memulai pembangunan jalan desa tahap kedua untuk meningkatkan akses transportasi warga. Proyek ini diharapkan dapat meningkatkan mobilitas masyarakat dan mendukung kegiatan ekonomi desa.', 'Pemerintah desa memulai pembangunan jalan desa tahap kedua untuk meningkatkan akses transportasi warga.', 'Pembangunan', true),
('Festival UMKM Desa Kaliwungu 2024', 'Acara tahunan untuk mempromosikan produk-produk UMKM lokal dan meningkatkan ekonomi desa. Festival ini akan menampilkan berbagai produk unggulan dari pelaku UMKM di Desa Kaliwungu.', 'Acara tahunan untuk mempromosikan produk-produk UMKM lokal dan meningkatkan ekonomi desa.', 'Ekonomi', true),
('Program Pelatihan Digital Marketing untuk UMKM', 'Pelatihan gratis untuk pelaku UMKM dalam memasarkan produk melalui platform digital. Program ini bertujuan untuk meningkatkan kemampuan pemasaran digital para pelaku UMKM.', 'Pelatihan gratis untuk pelaku UMKM dalam memasarkan produk melalui platform digital.', 'Pelatihan', true);

INSERT INTO umkm (name, description, category, owner, phone, address, rating, featured) VALUES
('Keripik Singkong Bu Sari', 'Keripik singkong dengan berbagai varian rasa yang renyah dan gurih.', 'Makanan & Minuman', 'Bu Sari', '0812-3456-7890', 'Dusun Kaliwungu Lor', 4.8, true),
('Batik Tulis Kaliwungu', 'Batik tulis dengan motif khas daerah Cilacap yang berkualitas tinggi.', 'Kerajinan', 'Pak Bambang', '0813-4567-8901', 'Dusun Kaliwungu Kidul', 4.9, true),
('Tahu Tempe Pak Joko', 'Produksi tahu dan tempe segar setiap hari dengan kualitas terbaik.', 'Makanan & Minuman', 'Pak Joko', '0814-5678-9012', 'Dusun Tegalsari', 4.7, false),
('Anyaman Bambu Kreatif', 'Berbagai produk anyaman bambu untuk keperluan rumah tangga dan dekorasi.', 'Kerajinan', 'Bu Wati', '0815-6789-0123', 'Dusun Wangon', 4.6, false);

INSERT INTO village_officials (name, position, phone, email) VALUES
('Budi Santoso, S.Sos', 'Kepala Desa', '0812-1111-1111', 'kepala@desakaliwungu.id'),
('Siti Aminah, S.Pd', 'Sekretaris Desa', '0812-2222-2222', 'sekretaris@desakaliwungu.id'),
('Ahmad Fauzi', 'Kaur Keuangan', '0812-3333-3333', 'keuangan@desakaliwungu.id'),
('Dewi Sartika', 'Kaur Umum', '0812-4444-4444', 'umum@desakaliwungu.id'),
('Joko Widodo', 'Kasi Pemerintahan', '0812-5555-5555', 'pemerintahan@desakaliwungu.id'),
('Sri Mulyani', 'Kasi Kesejahteraan', '0812-6666-6666', 'kesejahteraan@desakaliwungu.id');

INSERT INTO village_profile (vision, mission, history, area_size, population, villages_count, rw_count, rt_count) VALUES
('Terwujudnya Desa Kaliwungu yang Maju, Mandiri, dan Sejahtera Berbasis Potensi Lokal dengan Tata Kelola Pemerintahan yang Baik',
'1. Meningkatkan kualitas pelayanan publik; 2. Mengembangkan potensi ekonomi desa; 3. Memperkuat infrastruktur dan fasilitas umum; 4. Memberdayakan masyarakat melalui pendidikan; 5. Melestarikan budaya dan lingkungan hidup',
'Desa Kaliwungu memiliki sejarah panjang yang dimulai pada abad ke-18. Nama "Kaliwungu" berasal dari bahasa Jawa yang berarti "sungai yang jernih", mengacu pada sungai kecil yang mengalir di tengah desa.',
'450 Ha', 3247, 5, 15, 45);

-- Insert default admin user (password should be hashed in production)
INSERT INTO users (email, password, name, role) VALUES
('admin@desakaliwungu.id', 'admin123', 'Administrator', 'admin');
