#!/bin/bash

echo "🚀 QUICK DEPLOY DESA KALIWUNGU WEBSITE"
echo "======================================"
echo ""

echo "📋 Checklist sebelum deploy:"
echo "1. ✅ Kode sudah di GitHub"
echo "2. ✅ Akun Vercel sudah ada"
echo "3. ✅ Akun Neon sudah ada"
echo ""

read -p "Apakah semua sudah siap? (y/n): " ready

if [ "$ready" != "y" ]; then
    echo "❌ Silakan siapkan dulu semua requirement"
    exit 1
fi

echo ""
echo "🔗 LANGKAH DEPLOY:"
echo "=================="
echo ""

echo "1. DEPLOY KE VERCEL:"
echo "   - Buka: https://vercel.com/new"
echo "   - Import repository GitHub Anda"
echo "   - Klik Deploy"
echo ""

echo "2. SETUP DATABASE:"
echo "   - Buka: https://console.neon.tech"
echo "   - Buat project baru: 'desa-kaliwungu'"
echo "   - Copy connection string"
echo ""

echo "3. SET ENVIRONMENT VARIABLES di Vercel:"
echo "   DATABASE_URL=postgresql://user:pass@host/db?sslmode=require"
echo "   NEXTAUTH_SECRET=desa-kaliwungu-secret-2024"
echo "   NEXTAUTH_URL=https://your-app.vercel.app"
echo ""

echo "4. INISIALISASI DATABASE:"
echo "   - Buka Neon SQL Editor"
echo "   - Copy-paste scripts/run-init-production.sql"
echo "   - Klik Run"
echo ""

echo "5. REDEPLOY VERCEL:"
echo "   - Kembali ke Vercel"
echo "   - Klik Redeploy"
echo ""

echo "✅ SELESAI! Website Anda akan live dalam 5 menit"
echo ""
echo "🔐 Login admin:"
echo "   Email: admin@desakaliwungu.id"
echo "   Password: admin123"
echo ""
echo "📱 Jangan lupa ganti password setelah login!"
