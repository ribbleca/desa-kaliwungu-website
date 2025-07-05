# 🚀 Setup Instructions - Desa Kaliwungu Website

## ✅ **LANGKAH 1: Setup Database di Neon**

### A. Buat Akun Neon
1. Buka [neon.tech](https://neon.tech)
2. Klik **"Sign Up"** 
3. Daftar dengan email/GitHub
4. Verifikasi email jika diminta

### B. Buat Database Project
1. Setelah login, klik **"Create Project"**
2. Isi form:
   \`\`\`
   Project Name: desa-kaliwungu-db
   Database Name: neondb (default)
   Region: US East (Ohio) - recommended
   \`\`\`
3. Klik **"Create Project"**
4. Tunggu 30-60 detik sampai selesai

### C. Ambil Connection String
1. Setelah project dibuat, klik **"Connect"**
2. Pilih tab **"Pooled connection"**
3. Copy connection string yang seperti ini:
   \`\`\`
   postgresql://username:password@ep-xxx.us-east-1.neon.tech/neondb?sslmode=require
   \`\`\`
4. **SIMPAN** connection string ini untuk step berikutnya!

---

## ✅ **LANGKAH 2: Setup Environment Variables di Vercel**

### A. Buka Vercel Dashboard
1. Login ke [vercel.com](https://vercel.com)
2. Pilih project **"desa-kaliwungu-website"**
3. Klik tab **"Settings"**
4. Klik **"Environment Variables"** di sidebar

### B. Tambahkan Variables (WAJIB)

**Klik "Add New" untuk setiap variable:**

#### 1. DATABASE_URL
\`\`\`
Name: DATABASE_URL
Value: [paste connection string dari Neon]
Environment: Production, Preview, Development (centang semua)
\`\`\`

#### 2. NEXTAUTH_URL
\`\`\`
Name: NEXTAUTH_URL
Value: https://[your-vercel-url].vercel.app
Environment: Production, Preview, Development
\`\`\`
*Ganti [your-vercel-url] dengan URL deployment Anda*

#### 3. NEXTAUTH_SECRET
\`\`\`
Name: NEXTAUTH_SECRET
Value: desa-kaliwungu-secret-2024-super-secure-key
Environment: Production, Preview, Development
\`\`\`

#### 4. BLOB_READ_WRITE_TOKEN (Sudah ada)
\`\`\`
Ini sudah otomatis tersedia dari Vercel
\`\`\`

### C. Save & Redeploy
1. Klik **"Save"** untuk setiap variable
2. Kembali ke tab **"Deployments"**
3. Klik **titik 3 (...)** di deployment teratas
4. Klik **"Redeploy"**

---

## ✅ **LANGKAH 3: Setup Database Tables**

### A. Buka Neon SQL Editor
1. Login ke [console.neon.tech](https://console.neon.tech)
2. Pilih project database Anda
3. Klik **"SQL Editor"** di sidebar kiri

### B. Jalankan Setup Script
1. Copy **SELURUH ISI** file `setup-neon-database.sql`
2. Paste di SQL Editor
3. Klik **"Run"** (tombol hijau)
4. Tunggu 30-60 detik
5. Lihat pesan **"Database setup completed successfully!"**

---

## ✅ **LANGKAH 4: Verifikasi Setup**

### A. Cek Deployment
1. Tunggu redeploy Vercel selesai (2-3 menit)
2. Buka URL website Anda
3. Pastikan tidak ada error 500

### B. Test Fitur
1. **Homepage** - harus load dengan data
2. **Berita** - harus menampilkan artikel sample
3. **Kontak** - form harus bisa submit
4. **Admin** - `/admin` harus bisa login

---

## 🆘 **Troubleshooting**

### Error: "No database connection"
- Pastikan `DATABASE_URL` sudah diset di Vercel
- Pastikan connection string benar (copy dari Neon)
- Redeploy setelah set environment variables

### Error: "Table doesn't exist"
- Jalankan ulang script `setup-neon-database.sql`
- Pastikan script berjalan tanpa error
- Cek di Neon console apakah tables sudah dibuat

### Error: Build failed
- Cek build logs di Vercel
- Pastikan semua dependencies terinstall
- Cek syntax error di code

---

## 📞 **Butuh Bantuan?**

Jika ada masalah, laporkan:
1. **Screenshot error** (jika ada)
2. **URL website** Anda
3. **Step mana** yang bermasalah
4. **Pesan error** lengkap

**Selamat! Website Desa Kaliwungu siap digunakan! 🎉**
