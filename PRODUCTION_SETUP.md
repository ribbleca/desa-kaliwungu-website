# Production Database Setup Guide

This guide will help you set up the Neon PostgreSQL database for the Desa Kaliwungu website in production.

## 🎯 Prerequisites

1. **Neon Database Account**: Sign up at [neon.tech](https://neon.tech)
2. **Database Created**: Create a new database in your Neon dashboard
3. **Connection String**: Get your DATABASE_URL from Neon dashboard

## 🚀 Setup Methods

### Method 1: Using the Setup Script (Recommended)

1. **Set Environment Variable**:
   \`\`\`bash
   export DATABASE_URL="postgresql://username:password@host/database?sslmode=require"
   \`\`\`

2. **Run Setup Script**:
   \`\`\`bash
   chmod +x scripts/setup-production-db.sh
   ./scripts/setup-production-db.sh
   \`\`\`

### Method 2: Using Node.js Script

1. **Set Environment Variable**:
   \`\`\`bash
   export DATABASE_URL="your_neon_connection_string"
   \`\`\`

2. **Install Dependencies**:
   \`\`\`bash
   npm install @neondatabase/serverless
   \`\`\`

3. **Run Script**:
   \`\`\`bash
   node scripts/run-database-init.js
   \`\`\`

### Method 3: Manual Setup via Neon Dashboard

1. **Open Neon Dashboard**: Go to your project in [console.neon.tech](https://console.neon.tech)
2. **Open SQL Editor**: Click on "SQL Editor" in the sidebar
3. **Copy & Paste**: Copy the entire content of `scripts/run-init-production.sql`
4. **Execute**: Click "Run" to execute the script

### Method 4: Using psql Command Line

1. **Install PostgreSQL Client**: 
   \`\`\`bash
   # Ubuntu/Debian
   sudo apt-get install postgresql-client
   
   # macOS
   brew install postgresql
   
   # Windows
   # Download from https://www.postgresql.org/download/windows/
   \`\`\`

2. **Run Script**:
   \`\`\`bash
   psql "your_neon_connection_string" -f scripts/run-init-production.sql
   \`\`\`

## 📊 What Gets Created

The initialization script will create:

### 📋 Database Tables
- **users** - Admin authentication
- **news** - News articles and announcements
- **umkm** - Local business directory
- **gallery** - Photo gallery
- **agenda** - Village events and activities
- **village_officials** - Village government structure
- **village_profile** - Village information and statistics

### 📝 Sample Data
- **1 Admin User** - Login credentials provided
- **4 News Articles** - Sample news content
- **6 UMKM Businesses** - Local business examples
- **6 Village Officials** - Government structure
- **6 Gallery Items** - Photo gallery samples
- **7 Agenda Events** - Upcoming activities
- **1 Village Profile** - Complete village information

## 🔐 Admin Access

After setup, you can access the admin panel with:

- **URL**: `https://your-domain.com/admin`
- **Email**: `admin@desakaliwungu.id`
- **Password**: `admin123`

> ⚠️ **Important**: Change the admin password after first login!

## ✅ Verification

After running the script, verify the setup:

1. **Check Tables**: All 7 tables should be created
2. **Check Data**: Each table should have sample records
3. **Test Login**: Try logging into the admin panel
4. **Test Website**: Visit the public pages to see sample content

## 🔧 Troubleshooting

### Connection Issues
- Verify your DATABASE_URL is correct
- Check if your IP is whitelisted in Neon (if applicable)
- Ensure SSL mode is enabled

### Permission Issues
- Make sure your database user has CREATE and INSERT permissions
- Check if the database exists and is accessible

### Script Errors
- If some statements fail, check the error messages
- Most warnings can be ignored (like "table already exists")
- The verification query at the end shows if setup was successful

## 🔄 Re-running the Script

If you need to reset the database:

1. The script includes `DROP TABLE IF EXISTS` statements
2. This will **delete all existing data**
3. Only run this if you want a fresh start

## 📞 Support

If you encounter issues:

1. Check the error messages carefully
2. Verify your DATABASE_URL format
3. Ensure your Neon database is active
4. Try the manual method via Neon dashboard

## 🎉 Next Steps

After successful database setup:

1. **Deploy to Vercel**: Your app should now work in production
2. **Configure Environment Variables**: Set all required env vars in Vercel
3. **Test All Features**: Verify CRUD operations work
4. **Customize Content**: Update the sample data with real content
5. **Setup Email**: Configure Resend for contact form functionality

Your Desa Kaliwungu website is now ready for production! 🌟
