-- Seed database with hashed password for admin user
-- Password: admin123 (hashed with bcrypt)
INSERT INTO users (email, password, name, role) VALUES
('admin@desakaliwungu.id', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSforHgK', 'Administrator Desa', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Update existing sample data with better content
UPDATE news SET 
  content = 'Pemerintah Desa Kaliwungu dengan bangga mengumumkan dimulainya pembangunan jalan desa tahap kedua. Proyek ini merupakan kelanjutan dari pembangunan infrastruktur yang telah dimulai tahun lalu dan diharapkan dapat meningkatkan akses transportasi warga serta mendukung kegiatan ekonomi desa.

Pembangunan jalan sepanjang 2,5 kilometer ini akan menghubungkan Dusun Kaliwungu Lor dengan Dusun Tegalsari, memudahkan akses warga untuk beraktivitas sehari-hari. Dana pembangunan berasal dari Anggaran Pendapatan dan Belanja Desa (APBDes) tahun 2024 dengan total anggaran Rp 850 juta.

"Kami berharap dengan adanya jalan yang baik, aktivitas ekonomi masyarakat akan semakin meningkat dan kesejahteraan warga akan lebih baik," ujar Kepala Desa Kaliwungu, Budi Santoso, S.Sos.

Pembangunan direncanakan selesai dalam waktu 4 bulan dan akan dikerjakan oleh kontraktor lokal untuk memberikan dampak ekonomi langsung kepada masyarakat desa.'
WHERE id = 1;

UPDATE news SET 
  content = 'Festival UMKM Desa Kaliwungu 2024 akan diselenggarakan pada tanggal 15-17 Maret 2024 di halaman Balai Desa Kaliwungu. Acara tahunan ini bertujuan untuk mempromosikan produk-produk unggulan dari pelaku UMKM lokal dan meningkatkan perekonomian desa.

Tahun ini, festival akan menampilkan lebih dari 50 stand UMKM dengan berbagai produk unggulan seperti keripik singkong, batik tulis, anyaman bambu, dan produk olahan pertanian lainnya. Selain pameran produk, akan ada juga workshop pemasaran digital dan pelatihan pengemasan produk.

"Festival ini menjadi ajang untuk memperkenalkan produk UMKM kita ke masyarakat luas dan juga sebagai sarana pembelajaran bagi para pelaku usaha," kata Siti Aminah, S.Pd, Sekretaris Desa.

Acara akan dibuka langsung oleh Bupati Cilacap dan dihadiri oleh berbagai instansi terkait. Masyarakat umum diundang untuk hadir dan mendukung produk-produk lokal Desa Kaliwungu.'
WHERE id = 2;

-- Add more sample UMKM data
INSERT INTO umkm (name, description, category, owner, phone, address, rating, featured) VALUES
('Warung Gudeg Bu Tini', 'Gudeg khas Yogya dengan cita rasa autentik dan bumbu tradisional yang kaya rempah.', 'Makanan & Minuman', 'Bu Tini', '0816-7890-1234', 'Dusun Kaliwungu Tengah', 4.5, false),
('Konveksi Berkah Jaya', 'Jasa konveksi untuk seragam sekolah, kantor, dan pakaian custom dengan kualitas terjamin.', 'Fashion', 'Pak Hadi', '0817-8901-2345', 'Dusun Wangon', 4.3, false),
('Toko Kelontong Sumber Rejeki', 'Toko kelontong lengkap dengan berbagai kebutuhan sehari-hari dan harga terjangkau.', 'Lainnya', 'Bu Sari', '0818-9012-3456', 'Dusun Kaliwungu Lor', 4.4, false);

-- Add sample gallery items
INSERT INTO gallery (title, description, image, category) VALUES
('Gotong Royong Pembersihan Desa', 'Kegiatan gotong royong rutin setiap bulan untuk menjaga kebersihan lingkungan desa', '/placeholder.svg?height=300&width=400', 'Kegiatan'),
('Panen Raya Padi 2024', 'Dokumentasi panen raya padi di sawah Desa Kaliwungu dengan hasil yang melimpah', '/placeholder.svg?height=300&width=400', 'Pertanian'),
('Pelatihan Komputer untuk Remaja', 'Program pelatihan komputer gratis untuk remaja desa dalam rangka peningkatan SDM', '/placeholder.svg?height=300&width=400', 'Pendidikan'),
('Renovasi Balai Desa', 'Proses renovasi Balai Desa Kaliwungu untuk meningkatkan pelayanan kepada masyarakat', '/placeholder.svg?height=300&width=400', 'Pembangunan');

-- Add sample agenda
INSERT INTO agenda (title, description, event_date, location, organizer) VALUES
('Rapat Koordinasi RT/RW', 'Rapat koordinasi bulanan dengan seluruh RT/RW untuk membahas program kerja desa', '2024-02-15', 'Balai Desa Kaliwungu', 'Pemerintah Desa'),
('Posyandu Balita', 'Kegiatan posyandu rutin untuk pemeriksaan kesehatan balita dan ibu hamil', '2024-02-20', 'Balai Dusun Kaliwungu Lor', 'Kader Posyandu'),
('Pelatihan UMKM Digital Marketing', 'Pelatihan pemasaran digital untuk pelaku UMKM desa', '2024-02-25', 'Aula Balai Desa', 'Dinas Koperasi & UMKM'),
('Festival UMKM Desa Kaliwungu', 'Festival tahunan untuk mempromosikan produk UMKM lokal', '2024-03-15', 'Halaman Balai Desa', 'Pemerintah Desa'),
('Musyawarah Desa', 'Musyawarah desa untuk pembahasan APBDes tahun 2024', '2024-03-30', 'Balai Desa Kaliwungu', 'Pemerintah Desa');
