#!/bin/bash

# Production Database Setup Script for Desa Kaliwungu
# This script helps you set up the database in production

echo "🚀 Desa Kaliwungu - Production Database Setup"
echo "=============================================="

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "❌ ERROR: DATABASE_URL environment variable is not set"
    echo ""
    echo "Please set your Neon database URL:"
    echo "export DATABASE_URL='postgresql://username:password@host/database?sslmode=require'"
    echo ""
    echo "You can find this URL in your Neon dashboard under 'Connection Details'"
    exit 1
fi

echo "✅ DATABASE_URL is set"
echo "🔗 Database URL: ${DATABASE_URL:0:30}..."

# Check if psql is available
if command -v psql &> /dev/null; then
    echo "✅ psql is available"
    
    echo ""
    echo "🗃️  Running database initialization script..."
    echo "This will create all tables and insert sample data."
    echo ""
    
    # Run the SQL script
    psql "$DATABASE_URL" -f scripts/run-init-production.sql
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "🎉 Database initialization completed successfully!"
        echo ""
        echo "📝 Admin Login Credentials:"
        echo "Email: admin@desakaliwungu.id"
        echo "Password: admin123"
        echo ""
        echo "🔗 You can now access the admin panel at: /admin"
        echo ""
        echo "📊 Your database now contains:"
        echo "- 1 admin user"
        echo "- 4 sample news articles"
        echo "- 6 UMKM businesses"
        echo "- 6 village officials"
        echo "- 6 gallery items"
        echo "- 7 agenda events"
        echo "- 1 village profile"
    else
        echo "❌ Database initialization failed"
        exit 1
    fi
    
elif command -v node &> /dev/null; then
    echo "✅ Node.js is available"
    echo "🗃️  Running database initialization via Node.js..."
    
    # Install required dependency if not present
    if [ ! -d "node_modules/@neondatabase" ]; then
        echo "📦 Installing @neondatabase/serverless..."
        npm install @neondatabase/serverless
    fi
    
    # Run the Node.js script
    node scripts/run-database-init.js
    
else
    echo "❌ Neither psql nor Node.js is available"
    echo ""
    echo "Please install one of the following:"
    echo "1. PostgreSQL client (psql) - recommended"
    echo "2. Node.js - alternative method"
    echo ""
    echo "Or manually run the SQL script in your Neon dashboard:"
    echo "📁 File: scripts/run-init-production.sql"
    exit 1
fi

echo ""
echo "🔧 Next Steps:"
echo "1. Deploy your application to Vercel"
echo "2. Set up environment variables in Vercel dashboard"
echo "3. Test the admin panel and all features"
echo "4. Customize content as needed"
echo ""
echo "✨ Your Desa Kaliwungu website is ready!"
