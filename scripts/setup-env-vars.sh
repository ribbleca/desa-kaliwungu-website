#!/bin/bash

echo "🔧 Environment Variables Setup for Desa Kaliwungu Website"
echo "========================================================"
echo ""

echo "📋 You need to set up the following environment variables:"
echo ""

# Check if we're in a development environment
if [ -f ".env.local" ]; then
    echo "✅ Found .env.local file"
    echo "📝 Current environment variables in .env.local:"
    echo ""
    grep -E "^[A-Z]" .env.local | head -10
    echo ""
else
    echo "📄 Creating .env.local file..."
    cat > .env.local << 'EOF'
# Database Configuration (Neon PostgreSQL)
# Get this from your Neon dashboard: https://console.neon.tech
DATABASE_URL="postgresql://username:password@host/database?sslmode=require"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-key-here"

# Vercel Blob Storage (for file uploads)
# Get this from Vercel dashboard: https://vercel.com/dashboard
BLOB_READ_WRITE_TOKEN="your-vercel-blob-token"

# Resend Email Service (for contact forms)
# Get this from Resend dashboard: https://resend.com/api-keys
RESEND_API_KEY="your-resend-api-key"

# Admin Default Credentials (change in production)
ADMIN_EMAIL="admin@desakaliwungu.id"
ADMIN_PASSWORD="admin123"
EOF
    echo "✅ Created .env.local template"
fi

echo ""
echo "🎯 STEP 1: Get your Neon Database URL"
echo "======================================"
echo "1. Go to https://console.neon.tech"
echo "2. Sign up or log in to your account"
echo "3. Create a new project (if you haven't already)"
echo "4. Go to your project dashboard"
echo "5. Click on 'Connection Details' or 'Connect'"
echo "6. Copy the connection string that looks like:"
echo "   postgresql://username:password@ep-xxx.region.neon.tech/dbname?sslmode=require"
echo ""

echo "🔧 STEP 2: Set the DATABASE_URL"
echo "==============================="
echo "Choose one of these methods:"
echo ""
echo "Method A - Export for current session:"
echo "export DATABASE_URL='your_neon_connection_string_here'"
echo ""
echo "Method B - Add to .env.local file:"
echo "Edit .env.local and replace the DATABASE_URL line with your actual URL"
echo ""
echo "Method C - Set permanently in your shell profile:"
echo "echo 'export DATABASE_URL=\"your_neon_connection_string_here\"' >> ~/.bashrc"
echo "source ~/.bashrc"
echo ""

echo "🔍 STEP 3: Verify the setup"
echo "============================"
echo "Run this command to check if DATABASE_URL is set:"
echo "echo \$DATABASE_URL"
echo ""
echo "If it shows your connection string, you're ready to run:"
echo "node scripts/run-database-init.js"
echo ""

echo "⚠️  IMPORTANT NOTES:"
echo "==================="
echo "• Keep your database credentials secure"
echo "• Never commit .env.local to version control"
echo "• The connection string contains your password"
echo "• Make sure to use the connection string with ?sslmode=require"
echo ""

echo "🆘 Need Help?"
echo "============="
echo "If you're having trouble:"
echo "1. Check that your Neon database is active"
echo "2. Verify the connection string format"
echo "3. Make sure you have network access to Neon"
echo "4. Try the manual setup via Neon dashboard instead"
