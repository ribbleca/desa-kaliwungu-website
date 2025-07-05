# Website Desa Kaliwungu

Website resmi Desa Kaliwungu, Kecamatan Sidareja, Kabupaten Cilacap yang dibangun untuk mendukung program kerja KKN dengan fitur yang informatif, inovatif, dan profesional.

## 🚀 Fitur Utama

### Frontend (Public)
- **Landing Page** dengan hero section, statistik desa, dan call-to-action
- **Profil Desa** lengkap dengan sejarah, visi misi, dan struktur organisasi
- **Berita & Pengumuman** dengan sistem kategori dan pencarian
- **Direktori UMKM** dengan rating dan informasi kontak
- **Galeri Foto & Video** dengan kategori dan filter
- **Agenda Kegiatan** desa yang terjadwal
- **Kontak & Peta Lokasi** terintegrasi Google Maps
- **Mode Gelap/Terang** untuk kenyamanan pengguna
- **Responsive Design** untuk semua perangkat

### Backend (Admin Panel)
- **Dashboard Admin** dengan statistik dan overview
- **Manajemen Berita** (Create, Read, Update, Delete)
- **Manajemen UMKM** dengan fitur unggulan
- **Manajemen Galeri** dengan upload foto/video
- **Manajemen Agenda** kegiatan desa
- **Manajemen Profil Desa** yang dapat diedit
- **Sistem Autentikasi** untuk admin

## 🛠️ Teknologi yang Digunakan

- **Framework**: Next.js 15 (App Router) dengan TypeScript
- **Styling**: TailwindCSS + shadcn/ui components
- **Database**: Neon PostgreSQL (free tier)
- **Authentication**: NextAuth.js
- **Deployment**: Vercel (optimized)
- **Upload**: Vercel Blob Storage
- **Email**: Resend (untuk form kontak)

## 📦 Instalasi & Setup

### 1. Clone Repository
\`\`\`bash
git clone <repository-url>
cd desa-kaliwungu-website
\`\`\`

### 2. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 3. Setup Environment Variables
Buat file `.env.local` dan isi dengan:

\`\`\`env
# Database (Neon PostgreSQL)
DATABASE_URL="postgresql://username:password@host/database?sslmode=require"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Vercel Blob (untuk upload file)
BLOB_READ_WRITE_TOKEN="your-blob-token"

# Resend (untuk email)
RESEND_API_KEY="your-resend-api-key"

# Admin Default Credentials (change in production)
ADMIN_EMAIL="admin@desakaliwungu.id"
ADMIN_PASSWORD="admin123"
\`\`\`

### 4. Setup Database
\`\`\`bash
# Jalankan script inisialisasi database
npm run db:init
\`\`\`

### 5. Jalankan Development Server
\`\`\`bash
npm run dev
\`\`\`

Website akan berjalan di `http://localhost:3000`

## 🚀 Deployment ke Vercel

### 1. Push ke GitHub
\`\`\`bash
git add .
git commit -m "Initial commit"
git push origin main
\`\`\`

### 2. Deploy ke Vercel
1. Buka [vercel.com](https://vercel.com)
2. Import repository dari GitHub
3. Tambahkan environment variables di Vercel dashboard
4. Deploy!

### 3. Setup Database di Neon
1. Buka [neon.tech](https://neon.tech)
2. Buat database baru (free tier)
3. Copy connection string ke `DATABASE_URL`
4. Jalankan script SQL untuk inisialisasi

## 📱 Fitur Responsif

Website ini dioptimalkan untuk:
- **Desktop** (1024px+)
- **Tablet** (768px - 1023px)
- **Mobile** (320px - 767px)

## 🎨 Kustomisasi

### Mengubah Warna Tema
Edit file `app/globals.css` pada bagian CSS variables:

\`\`\`css
:root {
  --primary: 142 76% 36%; /* Hijau desa */
  --secondary: 210 40% 96%;
  /* ... */
}
\`\`\`

### Menambah Halaman Baru
1. Buat folder baru di `app/nama-halaman/`
2. Tambahkan file `page.tsx`
3. Update navigasi di `components/header.tsx`

## 📊 Data & Konten

### Data Awal
Website sudah dilengkapi dengan data contoh untuk:
- Berita dan pengumuman
- Profil UMKM
- Struktur perangkat desa
- Statistik kependudukan
- Galeri foto

### Mengelola Konten
1. Login ke admin panel: `/admin`
2. Gunakan kredensial default:
   - Email: `admin@desakaliwungu.id`
   - Password: `admin123`
3. Kelola semua konten melalui dashboard

## 🔒 Keamanan

- Autentikasi admin dengan NextAuth.js
- Password hashing untuk keamanan
- Environment variables untuk data sensitif
- HTTPS enforcement di production
- Input validation dan sanitization

## 📈 SEO & Performance

- **Server-Side Rendering** untuk SEO optimal
- **Meta tags** dinamis untuk setiap halaman
- **Sitemap** otomatis
- **Image optimization** dengan Next.js Image
- **Lazy loading** untuk performa
- **Core Web Vitals** optimization

## 🤝 Kontribusi

1. Fork repository
2. Buat branch fitur (`git checkout -b feature/nama-fitur`)
3. Commit perubahan (`git commit -m 'Menambah fitur baru'`)
4. Push ke branch (`git push origin feature/nama-fitur`)
5. Buat Pull Request

## 📞 Support

Untuk bantuan teknis atau pertanyaan:
- Email: support@desakaliwungu.id
- WhatsApp: +62 812-3456-7890

## 📄 Lisensi

Website ini dibuat untuk kepentingan publik Desa Kaliwungu dan dapat digunakan sebagai referensi untuk desa lain.

---

**Dikembangkan dengan ❤️ untuk kemajuan Desa Kaliwungu**
