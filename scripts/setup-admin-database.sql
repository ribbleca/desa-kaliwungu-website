-- Setup database untuk admin panel yang berfungsi penuh
-- Jalankan script ini di Neon SQL Editor

-- Drop existing tables if they exist
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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create admin news table (THIS REPLACES THE MAIN NEWS TABLE)
CREATE TABLE admin_news (
    id SERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    image TEXT,
    category VARCHAR(100) DEFAULT 'Umum',
    published BOOLEAN DEFAULT false,
    author_id INTEGER REFERENCES admin_users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create admin UMKM table (THIS REPLACES THE MAIN UMKM TABLE)
CREATE TABLE admin_umkm (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    owner VARCHAR(255),
    phone VARCHAR(50),
    address TEXT,
    image TEXT,
    rating DECIMAL(2,1) DEFAULT 0,
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create admin village profile table (THIS REPLACES THE MAIN PROFILE TABLE)
CREATE TABLE admin_village_profile (
    id SERIAL PRIMARY KEY,
    vision TEXT,
    mission TEXT,
    history TEXT,
    area_size VARCHAR(100),
    population INTEGER DEFAULT 0,
    villages_count INTEGER DEFAULT 0,
    rw_count INTEGER DEFAULT 0,
    rt_count INTEGER DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create admin gallery table
CREATE TABLE admin_gallery (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create admin agenda table
CREATE TABLE admin_agenda (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    event_time TIME,
    location VARCHAR(255),
    organizer VARCHAR(255),
    category VARCHAR(100) DEFAULT 'Umum',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default admin user
INSERT INTO admin_users (email, password, name, role) VALUES 
('admin@desakaliwungu.id', 'admin123', 'Administrator Desa', 'admin');

-- Insert sample news data
INSERT INTO admin_news (title, content, excerpt, category, published, author_id) VALUES 
('Pembangunan Jalan Desa Dimulai', 'Pembangunan jalan desa sepanjang 2 km telah dimulai hari ini. Proyek ini diharapkan dapat meningkatkan akses transportasi warga dan mendukung perekonomian desa.

Kepala Desa menyampaikan bahwa pembangunan ini merupakan hasil dari program pemerintah daerah yang peduli terhadap infrastruktur pedesaan. Dana yang digunakan berasal dari APBD dan swadaya masyarakat.

Pembangunan diperkirakan akan selesai dalam waktu 3 bulan ke depan. Selama masa pembangunan, warga diharapkan dapat bersabar dengan kondisi jalan yang mungkin sedikit terganggu.', 'Pembangunan jalan desa sepanjang 2 km dimulai untuk meningkatkan akses transportasi warga.', 'Pembangunan', true, 1),

('Pelatihan UMKM Digital Marketing', 'Desa Kaliwungu mengadakan pelatihan digital marketing untuk pelaku UMKM lokal. Pelatihan ini bertujuan untuk meningkatkan kemampuan pemasaran online para pengusaha kecil di desa.

Materi pelatihan meliputi penggunaan media sosial, pembuatan konten menarik, dan strategi penjualan online. Pelatihan diikuti oleh 25 peserta dari berbagai jenis usaha.

Kepala Desa berharap dengan adanya pelatihan ini, UMKM lokal dapat berkembang dan bersaing di era digital. Program ini akan dilanjutkan dengan pendampingan selama 3 bulan ke depan.', 'Pelatihan digital marketing untuk 25 pelaku UMKM lokal guna meningkatkan kemampuan pemasaran online.', 'Ekonomi', true, 1),

('Gotong Royong Bersih Desa', 'Warga Desa Kaliwungu mengadakan gotong royong bersih desa setiap hari Minggu. Kegiatan ini melibatkan seluruh RT dan RW untuk menjaga kebersihan lingkungan.

Kegiatan dimulai pukul 07.00 WIB dengan membersihkan jalan utama, selokan, dan area publik lainnya. Partisipasi warga sangat antusias dan kompak.

Kepala Desa mengapresiasi semangat gotong royong warga dan berharap kegiatan ini dapat terus berlanjut untuk menjaga kebersihan dan keindahan desa.', 'Gotong royong bersih desa setiap Minggu dengan partisipasi aktif seluruh warga RT dan RW.', 'Sosial', true, 1);

-- Insert sample UMKM data
INSERT INTO admin_umkm (name, description, category, owner, phone, address, rating, featured) VALUES 
('Warung Makan Bu Sari', 'Warung makan tradisional dengan menu masakan Jawa yang lezat dan harga terjangkau. Menyediakan nasi gudeg, soto ayam, dan berbagai lauk pauk tradisional.', 'Makanan & Minuman', 'Ibu Sari Wulandari', '081234567890', 'Jl. Raya Kaliwungu No. 15', 4.5, true),

('Kerajinan Bambu Pak Joko', 'Usaha kerajinan bambu yang memproduksi berbagai produk seperti keranjang, tempat nasi, dan hiasan rumah. Menggunakan bambu berkualitas tinggi dari desa sendiri.', 'Kerajinan', 'Bapak Joko Susanto', '082345678901', 'Dusun Bambu RT 02/RW 01', 4.2, true),

('Toko Kelontong Berkah', 'Toko kelontong lengkap yang menyediakan kebutuhan sehari-hari warga desa. Melayani dengan ramah dan harga bersaing.', 'Jasa', 'Ibu Ratna Sari', '083456789012', 'Jl. Masjid No. 8', 4.0, false),

('Penjahit Cepat Ibu Tini', 'Jasa penjahit untuk berbagai keperluan seperti seragam sekolah, baju kerja, dan pakaian casual. Pengerjaan cepat dan rapi.', 'Jasa', 'Ibu Tini Rahayu', '084567890123', 'Dusun Tengah RT 03/RW 02', 4.3, true);

-- Insert village profile data
INSERT INTO admin_village_profile (vision, mission, history, area_size, population, villages_count, rw_count, rt_count) VALUES 
('Mewujudkan Desa Kaliwungu sebagai desa yang maju, mandiri, dan sejahtera berdasarkan nilai-nilai gotong royong dan kearifan lokal.',
'1. Meningkatkan kualitas pelayanan publik kepada masyarakat
2. Mengembangkan potensi ekonomi lokal dan UMKM
3. Melestarikan budaya dan tradisi desa
4. Meningkatkan infrastruktur dan fasilitas umum
5. Memberdayakan masyarakat melalui berbagai program pembangunan',
'Desa Kaliwungu didirikan pada tahun 1945 oleh para pendiri yang berasal dari berbagai daerah. Nama Kaliwungu berasal dari kata "Kali" yang berarti sungai dan "Wungu" yang berarti ungu, mengacu pada sungai kecil yang airnya berwarna keunguan karena tanah liat di sekitarnya.

Pada awalnya, desa ini merupakan daerah pertanian dengan komoditas utama padi dan jagung. Seiring berjalannya waktu, desa berkembang dengan berbagai sektor ekonomi termasuk perdagangan dan kerajinan.

Desa Kaliwungu telah mengalami berbagai periode pembangunan dan kini menjadi salah satu desa yang cukup maju di wilayah kecamatan dengan berbagai fasilitas modern namun tetap mempertahankan nilai-nilai tradisional.',
'450 Ha',
2850,
4,
8,
24);

-- Insert sample gallery data
INSERT INTO admin_gallery (title, description, image, category) VALUES 
('Pembangunan Jalan Desa', 'Proses pembangunan jalan utama desa yang sedang berlangsung', '/placeholder.svg?height=300&width=400', 'Pembangunan'),
('Pelatihan UMKM', 'Kegiatan pelatihan digital marketing untuk pelaku UMKM', '/placeholder.svg?height=300&width=400', 'Ekonomi'),
('Gotong Royong', 'Kegiatan gotong royong bersih desa setiap hari Minggu', '/placeholder.svg?height=300&width=400', 'Sosial'),
('Panen Raya', 'Kegiatan panen raya padi di sawah desa', '/placeholder.svg?height=300&width=400', 'Pertanian');

-- Insert sample agenda data
INSERT INTO admin_agenda (title, description, event_date, event_time, location, organizer, category) VALUES 
('Rapat RT/RW Bulanan', 'Rapat koordinasi bulanan seluruh RT dan RW se-desa', '2024-01-15', '19:00', 'Balai Desa', 'Pemerintah Desa', 'Pemerintahan'),
('Pelatihan Komputer Dasar', 'Pelatihan komputer dasar untuk remaja dan dewasa', '2024-01-20', '09:00', 'Balai Desa', 'Karang Taruna', 'Pendidikan'),
('Senam Sehat Lansia', 'Kegiatan senam sehat rutin untuk para lansia', '2024-01-22', '07:00', 'Lapangan Desa', 'PKK Desa', 'Kesehatan'),
('Pasar Tani Mingguan', 'Pasar tani untuk menjual hasil pertanian lokal', '2024-01-25', '06:00', 'Lapangan Desa', 'Kelompok Tani', 'Ekonomi');

-- Create indexes for better performance
CREATE INDEX idx_admin_news_published ON admin_news(published);
CREATE INDEX idx_admin_news_category ON admin_news(category);
CREATE INDEX idx_admin_news_created_at ON admin_news(created_at);
CREATE INDEX idx_admin_umkm_featured ON admin_umkm(featured);
CREATE INDEX idx_admin_umkm_category ON admin_umkm(category);
CREATE INDEX idx_admin_gallery_category ON admin_gallery(category);
CREATE INDEX idx_admin_agenda_event_date ON admin_agenda(event_date);

-- Create triggers for auto-updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_admin_news_updated_at BEFORE UPDATE ON admin_news FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_admin_umkm_updated_at BEFORE UPDATE ON admin_umkm FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_admin_village_profile_updated_at BEFORE UPDATE ON admin_village_profile FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Success message
SELECT 'Admin database setup completed successfully!' as message,
       'Tables created: admin_users, admin_news, admin_umkm, admin_village_profile, admin_gallery, admin_agenda' as tables,
       'Sample data inserted for testing' as data_status;
