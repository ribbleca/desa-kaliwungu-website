-- Database initialization script for Desa Kaliwungu website
-- This script creates the necessary tables for the village website

-- Drop existing tables if they exist (for clean setup)
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS news CASCADE;
DROP TABLE IF EXISTS umkm CASCADE;
DROP TABLE IF EXISTS gallery CASCADE;
DROP TABLE IF EXISTS agenda CASCADE;
DROP TABLE IF EXISTS village_officials CASCADE;
DROP TABLE IF EXISTS village_profile CASCADE;

-- Create users table for admin authentication
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create news table
CREATE TABLE news (
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
CREATE TABLE umkm (
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
CREATE TABLE gallery (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create agenda table
CREATE TABLE agenda (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    location VARCHAR(255),
    organizer VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create village officials table
CREATE TABLE village_officials (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    photo VARCHAR(255),
    phone VARCHAR(20),
    email VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create village profile table
CREATE TABLE village_profile (
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

-- Create indexes for better performance
CREATE INDEX idx_news_published ON news(published);
CREATE INDEX idx_news_category ON news(category);
CREATE INDEX idx_news_created_at ON news(created_at);
CREATE INDEX idx_umkm_featured ON umkm(featured);
CREATE INDEX idx_umkm_category ON umkm(category);
CREATE INDEX idx_gallery_category ON gallery(category);
CREATE INDEX idx_agenda_event_date ON agenda(event_date);

-- Insert default admin user with hashed password
-- Password: admin123 (hashed with bcrypt)
INSERT INTO users (email, password, name, role) VALUES
('admin@desakaliwungu.id', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSforHgK', 'Administrator Desa', 'admin');

-- Insert sample news data
INSERT INTO news (title, content, excerpt, category, published, created_at) VALUES
('Pembangunan Jalan Desa Tahap II Dimulai', 
'Pemerintah Desa Kaliwungu dengan bangga mengumumkan dimulainya pembangunan jalan desa tahap kedua. Proyek ini merupakan kelanjutan dari pembangunan infrastruktur yang telah dimulai tahun lalu dan diharapkan dapat meningkatkan akses transportasi warga serta mendukung kegiatan ekonomi desa.

Pembangunan jalan sepanjang 2,5 kilometer ini akan menghubungkan Dusun Kaliwungu Lor dengan Dusun Tegalsari, memudahkan akses warga untuk beraktivitas sehari-hari. Dana pembangunan berasal dari Anggaran Pendapatan dan Belanja Desa (APBDes) tahun 2024 dengan total anggaran Rp 850 juta.

"Kami berharap dengan adanya jalan yang baik, aktivitas ekonomi masyarakat akan semakin meningkat dan kesejahteraan warga akan lebih baik," ujar Kepala Desa Kaliwungu, Budi Santoso, S.Sos.

Pembangunan direncanakan selesai dalam waktu 4 bulan dan akan dikerjakan oleh kontraktor lokal untuk memberikan dampak ekonomi langsung kepada masyarakat desa.',
'Pemerintah desa memulai pembangunan jalan desa tahap kedua untuk meningkatkan akses transportasi warga.',
'Pembangunan', true, '2024-01-15 10:00:00'),

('Festival UMKM Desa Kaliwungu 2024', 
'Festival UMKM Desa Kaliwungu 2024 akan diselenggarakan pada tanggal 15-17 Maret 2024 di halaman Balai Desa Kaliwungu. Acara tahunan ini bertujuan untuk mempromosikan produk-produk unggulan dari pelaku UMKM lokal dan meningkatkan perekonomian desa.

Tahun ini, festival akan menampilkan lebih dari 50 stand UMKM dengan berbagai produk unggulan seperti keripik singkong, batik tulis, anyaman bambu, dan produk olahan pertanian lainnya. Selain pameran produk, akan ada juga workshop pemasaran digital dan pelatihan pengemasan produk.

"Festival ini menjadi ajang untuk memperkenalkan produk UMKM kita ke masyarakat luas dan juga sebagai sarana pembelajaran bagi para pelaku usaha," kata Siti Aminah, S.Pd, Sekretaris Desa.

Acara akan dibuka langsung oleh Bupati Cilacap dan dihadiri oleh berbagai instansi terkait. Masyarakat umum diundang untuk hadir dan mendukung produk-produk lokal Desa Kaliwungu.',
'Acara tahunan untuk mempromosikan produk-produk UMKM lokal dan meningkatkan ekonomi desa.',
'Ekonomi', true, '2024-01-12 14:30:00'),

('Program Pelatihan Digital Marketing untuk UMKM', 
'Pemerintah Desa Kaliwungu bekerja sama dengan Dinas Koperasi dan UMKM Kabupaten Cilacap menyelenggarakan program pelatihan digital marketing untuk para pelaku UMKM di desa. Program ini bertujuan untuk meningkatkan kemampuan pemasaran digital para pelaku usaha agar dapat menjangkau pasar yang lebih luas.

Pelatihan akan dilaksanakan selama 3 hari, mulai tanggal 25-27 Februari 2024 di Aula Balai Desa Kaliwungu. Materi yang akan disampaikan meliputi pengenalan media sosial untuk bisnis, cara membuat konten yang menarik, strategi pemasaran online, dan pengelolaan toko online.

"Dengan kemampuan digital marketing yang baik, diharapkan produk UMKM kita dapat dikenal lebih luas dan omzet penjualan meningkat," ujar Ahmad Fauzi, Kaur Keuangan Desa.

Pelatihan ini gratis untuk semua pelaku UMKM di Desa Kaliwungu dan akan dibimbing langsung oleh praktisi digital marketing berpengalaman.',
'Pelatihan gratis untuk pelaku UMKM dalam memasarkan produk melalui platform digital.',
'Pelatihan', true, '2024-01-10 09:15:00'),

('Musyawarah Desa Pembahasan APBDes 2024', 
'Pemerintah Desa Kaliwungu mengundang seluruh warga untuk menghadiri Musyawarah Desa (Musdes) pembahasan Anggaran Pendapatan dan Belanja Desa (APBDes) tahun 2024. Musdes akan dilaksanakan pada hari Sabtu, 30 Maret 2024, pukul 09.00 WIB di Balai Desa Kaliwungu.

Dalam musyawarah ini akan dibahas alokasi anggaran untuk berbagai program pembangunan dan pemberdayaan masyarakat tahun 2024. Beberapa program prioritas yang akan dibahas antara lain pembangunan infrastruktur, program kesehatan, pendidikan, dan pemberdayaan ekonomi masyarakat.

"Partisipasi aktif masyarakat sangat penting dalam menentukan arah pembangunan desa. Mari kita bersama-sama merencanakan masa depan desa yang lebih baik," ajak Kepala Desa Kaliwungu.

Seluruh warga, tokoh masyarakat, dan perwakilan organisasi kemasyarakatan diharapkan dapat hadir untuk memberikan masukan dan saran.',
'Musyawarah desa untuk pembahasan APBDes 2024 dengan partisipasi seluruh warga.',
'Pemerintahan', false, '2024-01-08 16:45:00');

-- Insert sample UMKM data
INSERT INTO umkm (name, description, category, owner, phone, address, rating, featured, created_at) VALUES
('Keripik Singkong Bu Sari', 
'Keripik singkong dengan berbagai varian rasa yang renyah dan gurih. Diproduksi dengan bahan baku singkong pilihan dari kebun sendiri dan diproses dengan teknologi modern namun tetap mempertahankan cita rasa tradisional.',
'Makanan & Minuman', 'Bu Sari', '0812-3456-7890', 'Dusun Kaliwungu Lor', 4.8, true, '2024-01-01 08:00:00'),

('Batik Tulis Kaliwungu', 
'Batik tulis dengan motif khas daerah Cilacap yang berkualitas tinggi. Setiap kain dibuat dengan teknik tulis tradisional oleh pengrajin berpengalaman dengan pewarna alami yang ramah lingkungan.',
'Kerajinan', 'Pak Bambang', '0813-4567-8901', 'Dusun Kaliwungu Kidul', 4.9, true, '2024-01-02 10:30:00'),

('Tahu Tempe Pak Joko', 
'Produksi tahu dan tempe segar setiap hari dengan kualitas terbaik. Menggunakan kedelai pilihan dan proses fermentasi alami tanpa bahan pengawet berbahaya.',
'Makanan & Minuman', 'Pak Joko', '0814-5678-9012', 'Dusun Tegalsari', 4.7, false, '2024-01-03 06:00:00'),

('Anyaman Bambu Kreatif', 
'Berbagai produk anyaman bambu untuk keperluan rumah tangga dan dekorasi. Mulai dari keranjang, tempat nasi, hingga furniture bambu dengan desain modern dan tradisional.',
'Kerajinan', 'Bu Wati', '0815-6789-0123', 'Dusun Wangon', 4.6, false, '2024-01-04 14:20:00'),

('Warung Gudeg Bu Tini', 
'Gudeg khas Yogya dengan cita rasa autentik dan bumbu tradisional yang kaya rempah. Disajikan dengan nasi hangat, ayam kampung, dan sambal krecek yang pedas.',
'Makanan & Minuman', 'Bu Tini', '0816-7890-1234', 'Dusun Kaliwungu Tengah', 4.5, false, '2024-01-05 11:45:00'),

('Konveksi Berkah Jaya', 
'Jasa konveksi untuk seragam sekolah, kantor, dan pakaian custom dengan kualitas terjamin. Melayani pesanan dalam jumlah besar maupun kecil dengan harga kompetitif.',
'Fashion', 'Pak Hadi', '0817-8901-2345', 'Dusun Wangon', 4.3, false, '2024-01-06 13:10:00');

-- Insert village officials data
INSERT INTO village_officials (name, position, phone, email, created_at) VALUES
('Budi Santoso, S.Sos', 'Kepala Desa', '0812-1111-1111', 'kepala@desakaliwungu.id', '2024-01-01 00:00:00'),
('Siti Aminah, S.Pd', 'Sekretaris Desa', '0812-2222-2222', 'sekretaris@desakaliwungu.id', '2024-01-01 00:00:00'),
('Ahmad Fauzi', 'Kaur Keuangan', '0812-3333-3333', 'keuangan@desakaliwungu.id', '2024-01-01 00:00:00'),
('Dewi Sartika', 'Kaur Umum', '0812-4444-4444', 'umum@desakaliwungu.id', '2024-01-01 00:00:00'),
('Joko Widodo', 'Kasi Pemerintahan', '0812-5555-5555', 'pemerintahan@desakaliwungu.id', '2024-01-01 00:00:00'),
('Sri Mulyani', 'Kasi Kesejahteraan', '0812-6666-6666', 'kesejahteraan@desakaliwungu.id', '2024-01-01 00:00:00');

-- Insert village profile data
INSERT INTO village_profile (vision, mission, history, area_size, population, villages_count, rw_count, rt_count) VALUES
('Terwujudnya Desa Kaliwungu yang Maju, Mandiri, dan Sejahtera Berbasis Potensi Lokal dengan Tata Kelola Pemerintahan yang Baik',
'1. Meningkatkan kualitas pelayanan publik kepada masyarakat; 2. Mengembangkan potensi ekonomi desa melalui UMKM dan pertanian; 3. Memperkuat infrastruktur dan fasilitas umum desa; 4. Memberdayakan masyarakat melalui pendidikan dan pelatihan; 5. Melestarikan budaya lokal dan menjaga kelestarian lingkungan hidup',
'Desa Kaliwungu memiliki sejarah panjang yang dimulai pada abad ke-18. Nama "Kaliwungu" berasal dari bahasa Jawa yang berarti "sungai yang jernih", mengacu pada sungai kecil yang mengalir di tengah desa dan menjadi sumber kehidupan masyarakat. Pada masa kolonial Belanda, desa ini menjadi salah satu pusat pertanian padi dan palawija di wilayah Sidareja.',
'450 Ha', 3247, 5, 15, 45);

-- Insert sample gallery items
INSERT INTO gallery (title, description, image, category, created_at) VALUES
('Gotong Royong Pembersihan Desa', 'Kegiatan gotong royong rutin setiap bulan untuk menjaga kebersihan lingkungan desa', '/placeholder.svg?height=300&width=400', 'Kegiatan', '2024-01-15 08:00:00'),
('Panen Raya Padi 2024', 'Dokumentasi panen raya padi di sawah Desa Kaliwungu dengan hasil yang melimpah', '/placeholder.svg?height=300&width=400', 'Pertanian', '2024-01-10 16:30:00'),
('Pelatihan Komputer untuk Remaja', 'Program pelatihan komputer gratis untuk remaja desa dalam rangka peningkatan SDM', '/placeholder.svg?height=300&width=400', 'Pendidikan', '2024-01-08 14:15:00'),
('Renovasi Balai Desa', 'Proses renovasi Balai Desa Kaliwungu untuk meningkatkan pelayanan kepada masyarakat', '/placeholder.svg?height=300&width=400', 'Pembangunan', '2024-01-05 10:45:00'),
('Festival Budaya Desa', 'Penampilan seni budaya tradisional dalam rangka memperingati HUT Kemerdekaan RI', '/placeholder.svg?height=300&width=400', 'Budaya', '2024-01-03 19:20:00'),
('Posyandu Balita', 'Kegiatan posyandu rutin untuk pemeriksaan kesehatan balita dan ibu hamil', '/placeholder.svg?height=300&width=400', 'Kesehatan', '2024-01-01 09:30:00');

-- Insert sample agenda
INSERT INTO agenda (title, description, event_date, location, organizer, created_at) VALUES
('Rapat Koordinasi RT/RW', 'Rapat koordinasi bulanan dengan seluruh RT/RW untuk membahas program kerja desa dan permasalahan yang dihadapi masyarakat', '2024-02-15', 'Balai Desa Kaliwungu', 'Pemerintah Desa', '2024-01-20 10:00:00'),
('Posyandu Balita', 'Kegiatan posyandu rutin untuk pemeriksaan kesehatan balita dan ibu hamil serta pemberian imunisasi', '2024-02-20', 'Balai Dusun Kaliwungu Lor', 'Kader Posyandu', '2024-01-18 14:30:00'),
('Pelatihan UMKM Digital Marketing', 'Pelatihan pemasaran digital untuk pelaku UMKM desa agar dapat memasarkan produk secara online', '2024-02-25', 'Aula Balai Desa', 'Dinas Koperasi & UMKM', '2024-01-16 11:15:00'),
('Festival UMKM Desa Kaliwungu', 'Festival tahunan untuk mempromosikan produk UMKM lokal dan meningkatkan ekonomi desa', '2024-03-15', 'Halaman Balai Desa', 'Pemerintah Desa', '2024-01-14 16:45:00'),
('Musyawarah Desa APBDes 2024', 'Musyawarah desa untuk pembahasan Anggaran Pendapatan dan Belanja Desa tahun 2024', '2024-03-30', 'Balai Desa Kaliwungu', 'Pemerintah Desa', '2024-01-12 09:20:00'),
('Pelatihan Pertanian Organik', 'Pelatihan teknik pertanian organik untuk meningkatkan kualitas hasil panen dan ramah lingkungan', '2024-04-10', 'Aula Balai Desa', 'Dinas Pertanian', '2024-01-10 13:50:00'),
('Lomba Kebersihan Antar RT', 'Lomba kebersihan lingkungan antar RT untuk meningkatkan kesadaran masyarakat akan pentingnya kebersihan', '2024-04-17', 'Seluruh Wilayah Desa', 'Karang Taruna', '2024-01-08 15:25:00');

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_news_updated_at BEFORE UPDATE ON news
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_umkm_updated_at BEFORE UPDATE ON umkm
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_village_profile_updated_at BEFORE UPDATE ON village_profile
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Grant necessary permissions (adjust as needed for your setup)
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO your_user;
-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO your_user;

-- Display success message
SELECT 'Database initialized successfully! Tables created and sample data inserted.' as status;
