# 🚀 PANDUAN LENGKAP SETUP WEBSITE DESA KALIWUNGU
## Ikuti langkah ini sampai selesai!

### 📋 YANG ANDA BUTUHKAN:
1. Akun GitHub (gratis)
2. Akun Vercel (gratis) 
3. Akun Neon (database gratis)
4. Akun Resend (email gratis)

---

## 🎯 LANGKAH 1: SETUP DATABASE NEON (5 menit)

### A. Buat Akun Neon
1. Buka browser, kunjungi: **https://neon.tech**
2. Klik **"Sign Up"** 
3. Daftar dengan email Anda
4. Verifikasi email yang masuk
5. Login ke dashboard Neon

### B. Buat Database Baru
1. Di dashboard Neon, klik **"Create Project"**
2. Isi nama project: **"desa-kaliwungu"**
3. Pilih region: **"US East (Ohio)"** (yang terdekat)
4. Klik **"Create Project"**
5. Tunggu sampai selesai (1-2 menit)

### C. Ambil Connection String
1. Setelah project dibuat, klik **"Connect"** atau **"Connection Details"**
2. Copy seluruh text yang seperti ini:
   \`\`\`
   postgresql://username:password@ep-xxx.us-east-1.neon.tech/neondb?sslmode=require
   \`\`\`
3. **SIMPAN** text ini di notepad, kita butuh nanti!

---

## 🎯 LANGKAH 2: SETUP VERCEL (3 menit)

### A. Buat Akun Vercel
1. Buka: **https://vercel.com**
2. Klik **"Sign Up"**
3. Pilih **"Continue with GitHub"**
4. Login dengan GitHub Anda

### B. Deploy Website
1. Di dashboard Vercel, klik **"Add New"** → **"Project"**
2. Import repository GitHub Anda (desa-kaliwungu-website)
3. Klik **"Deploy"**
4. Tunggu deploy selesai (2-3 menit)

---

## 🎯 LANGKAH 3: SETUP ENVIRONMENT VARIABLES (2 menit)

### A. Buka Settings Vercel
1. Setelah deploy selesai, klik **"Settings"** di tab atas
2. Klik **"Environment Variables"** di sidebar kiri

### B. Tambahkan Variables Satu Per Satu
Klik **"Add"** dan masukkan:

**Variable 1:**
- Name: `DATABASE_URL`
- Value: (paste connection string dari Neon tadi)
- Environment: Production, Preview, Development

**Variable 2:**
- Name: `NEXTAUTH_SECRET`
- Value: `desa-kaliwungu-secret-key-2024`
- Environment: Production, Preview, Development

**Variable 3:**
- Name: `NEXTAUTH_URL`
- Value: `https://your-vercel-url.vercel.app` (ganti dengan URL Vercel Anda)
- Environment: Production, Preview, Development

**Variable 4:**
- Name: `BLOB_READ_WRITE_TOKEN`
- Value: `blob_readonly_xxx` (kita setup nanti)
- Environment: Production, Preview, Development

**Variable 5:**
- Name: `RESEND_API_KEY`
- Value: `re_xxx` (kita setup nanti)
- Environment: Production, Preview, Development

### C. Redeploy
1. Klik **"Deployments"** di tab atas
2. Klik titik 3 di deployment teratas
3. Klik **"Redeploy"**

---

## 🎯 LANGKAH 4: SETUP DATABASE (1 menit)

### A. Buka Neon SQL Editor
1. Kembali ke dashboard Neon: **https://console.neon.tech**
2. Klik project **"desa-kaliwungu"** Anda
3. Klik **"SQL Editor"** di sidebar kiri

### B. Jalankan Script Database
1. Copy seluruh isi file `scripts/run-init-production.sql`
2. Paste di SQL Editor Neon
3. Klik **"Run"** 
4. Tunggu sampai selesai (30 detik)
5. Anda akan lihat pesan sukses dan data tabel

---

## 🎯 LANGKAH 5: TEST WEBSITE (1 menit)

### A. Buka Website Anda
1. Kembali ke Vercel dashboard
2. Klik **"Visit"** untuk buka website
3. Website sudah jalan dengan data sample!

### B. Test Admin Panel
1. Buka: `https://your-website.vercel.app/admin`
2. Login dengan:
   - Email: `admin@desakaliwungu.id`
   - Password: `admin123`
3. Anda bisa kelola berita, UMKM, dll!

---

## 🎯 LANGKAH 6: SETUP EMAIL (OPSIONAL - 2 menit)

### A. Buat Akun Resend
1. Buka: **https://resend.com**
2. Sign up dengan email
3. Verifikasi email
4. Di dashboard, klik **"API Keys"**
5. Klik **"Create API Key"**
6. Copy API key yang dimulai dengan `re_`

### B. Update Environment Variable
1. Kembali ke Vercel Settings → Environment Variables
2. Edit `RESEND_API_KEY`
3. Paste API key dari Resend
4. Save dan redeploy

---

## 🎯 LANGKAH 7: SETUP FILE UPLOAD (OPSIONAL - 1 menit)

### A. Aktifkan Vercel Blob
1. Di Vercel dashboard, klik **"Storage"**
2. Klik **"Create Database"** → **"Blob"**
3. Beri nama: `desa-kaliwungu-blob`
4. Klik **"Create"**

### B. Update Environment Variable
1. Copy token yang muncul
2. Update `BLOB_READ_WRITE_TOKEN` di Environment Variables
3. Save dan redeploy

---

## ✅ SELESAI! WEBSITE ANDA SUDAH LIVE!

### 🎉 Yang Sudah Berfungsi:
- ✅ Website publik dengan data sample
- ✅ Admin panel untuk kelola konten
- ✅ Database PostgreSQL di cloud
- ✅ Hosting di Vercel (gratis)
- ✅ SSL certificate otomatis
- ✅ Responsive design

### 🔗 Link Penting:
- **Website**: https://your-project.vercel.app
- **Admin Panel**: https://your-project.vercel.app/admin
- **Database**: https://console.neon.tech
- **Hosting**: https://vercel.com/dashboard

### 🔐 Login Admin:
- Email: `admin@desakaliwungu.id`
- Password: `admin123`

---

## 🛠️ LANGKAH SELANJUTNYA:

1. **Ganti Password Admin** di admin panel
2. **Edit Profil Desa** sesuai data asli
3. **Tambah Berita** dan hapus yang sample
4. **Tambah Data UMKM** yang real
5. **Upload Foto** ke galeri
6. **Customize** warna dan logo

---

## 🆘 BUTUH BANTUAN?

Jika ada error atau tidak jalan:

1. **Cek Environment Variables** - pastikan semua terisi
2. **Cek Database** - pastikan script SQL sudah jalan
3. **Cek Deployment** - pastikan tidak ada error di Vercel
4. **Contact Support** - screenshot error dan kirim ke developer

**WEBSITE DESA KALIWUNGU ANDA SUDAH SIAP DIGUNAKAN! 🎉**
