# 🚀 Setup Instructions - Database Configuration

## ✅ Checklist Progress

### 1. Neon Database Setup
- [ ] Akun Neon dibuat
- [ ] Project database dibuat
- [ ] Connection string didapat

### 2. Vercel Environment Variables
- [ ] DATABASE_URL diset
- [ ] NEXTAUTH_URL diset  
- [ ] NEXTAUTH_SECRET diset
- [ ] ADMIN_EMAIL diset
- [ ] ADMIN_PASSWORD diset

### 3. Database Tables Setup
- [ ] SQL script dijalankan di Neon
- [ ] Tables berhasil dibuat
- [ ] Sample data berhasil diinsert

### 4. Deployment Test
- [ ] Vercel redeploy berhasil
- [ ] Website dapat diakses
- [ ] Database connection berhasil
- [ ] Admin panel dapat login

## 📋 Cara Setup Database di Neon

### Step 1: Buka Neon SQL Editor
1. Login ke [console.neon.tech](https://console.neon.tech)
2. Pilih project database Anda
3. Klik "SQL Editor" di sidebar kiri

### Step 2: Jalankan Script SQL
1. Copy seluruh isi file `setup-neon-database.sql`
2. Paste di SQL Editor
3. Klik "Run" untuk eksekusi
4. Tunggu sampai selesai (30-60 detik)

### Step 3: Verifikasi Setup
Setelah script selesai, Anda akan melihat:
- ✅ 7 tables berhasil dibuat
- ✅ Sample data berhasil diinsert
- ✅ Pesan "Database setup completed successfully!"

## 🔧 Troubleshooting

### Jika Environment Variables Error:
1. Pastikan DATABASE_URL benar
2. Cek format connection string
3. Pastikan semua environment variables diset
4. Redeploy setelah menambah variables

### Jika Database Connection Error:
1. Cek Neon database masih aktif
2. Verifikasi connection string
3. Pastikan sslmode=require ada di URL
4. Test connection di Neon dashboard

### Jika Build Error:
1. Cek build logs di Vercel
2. Fix TypeScript errors jika ada
3. Push fix ke GitHub
4. Auto-redeploy akan jalan

## 📞 Next Steps
Setelah database setup selesai:
1. Test website live
2. Login ke admin panel
3. Test semua fitur
4. Customize content sesuai kebutuhan
