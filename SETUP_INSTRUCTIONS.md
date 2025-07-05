# Setup Instructions - Desa Kaliwungu Website

## 🎯 Step 1: Setup Neon Database

### A. Create Neon Account & Project
1. Go to [neon.tech](https://neon.tech)
2. Sign up with your email
3. Create new project:
   - Name: `desa-kaliwungu-db`
   - Region: `US East (Ohio)`
4. Click "Create Project"

### B. Get Connection String
1. After project creation, click "Connect"
2. Copy the connection string (looks like):
   \`\`\`
   postgresql://username:password@ep-xxx.us-east-1.neon.tech/neondb?sslmode=require
   \`\`\`
3. Save this connection string!

### C. Run Database Setup
1. In Neon Console, click "SQL Editor"
2. Copy entire content from `scripts/setup-neon-database.sql`
3. Paste in SQL Editor
4. Click "Run" button
5. Wait for completion (30-60 seconds)
6. You should see "Database setup completed successfully!"

## 🎯 Step 2: Configure Vercel Environment Variables

### A. Access Vercel Settings
1. Login to [vercel.com](https://vercel.com)
2. Select your `desa-kaliwungu-website` project
3. Click "Settings" tab
4. Click "Environment Variables" in sidebar

### B. Add Required Variables

Click "Add New" for each variable:

#### 1. DATABASE_URL (Required)
\`\`\`
Name: DATABASE_URL
Value: [Your Neon connection string from Step 1B]
Environment: Production, Preview, Development (select all)
\`\`\`

#### 2. NEXTAUTH_URL (Required)
\`\`\`
Name: NEXTAUTH_URL
Value: https://your-project-name.vercel.app
Environment: Production, Preview, Development
\`\`\`
*Replace `your-project-name` with your actual Vercel URL*

#### 3. NEXTAUTH_SECRET (Required)
\`\`\`
Name: NEXTAUTH_SECRET
Value: desa-kaliwungu-secret-key-2024-super-secure-random-string
Environment: Production, Preview, Development
\`\`\`

#### 4. ADMIN_EMAIL (Optional)
\`\`\`
Name: ADMIN_EMAIL
Value: admin@desakaliwungu.id
Environment: Production, Preview, Development
\`\`\`

#### 5. ADMIN_PASSWORD (Optional)
\`\`\`
Name: ADMIN_PASSWORD
Value: admin123
Environment: Production, Preview, Development
\`\`\`

### C. Redeploy
1. Go to "Deployments" tab
2. Click "..." on latest deployment
3. Click "Redeploy"
4. Wait 2-3 minutes for completion

## 🎯 Step 3: Test Your Website

### A. Check Homepage
- Visit your Vercel URL
- Verify all sections load properly
- Check responsive design on mobile

### B. Test Database Features
- Try contact form submission
- Check if news section loads
- Verify UMKM section displays

### C. Admin Access (Optional)
- Go to `/admin` page
- Login with: `admin@desakaliwungu.id` / `admin123`
- Test admin features

## 🎯 Step 4: Customize Content

### A. Update Village Information
1. Login to admin panel
2. Update village profile, officials
3. Add real news and UMKM data
4. Upload actual photos to gallery

### B. Configure Contact Information
1. Update contact details in footer
2. Set up email forwarding if needed
3. Configure Google Maps integration

## 🔧 Troubleshooting

### Database Connection Issues
- Verify DATABASE_URL is correct
- Check Neon database is active
- Ensure all environment variables are set

### Build Errors
- Check all syntax in React components
- Verify all imports are correct
- Review Vercel build logs

### Performance Issues
- Optimize images using Next.js Image component
- Enable caching for static content
- Monitor database query performance

## 📞 Support

If you encounter issues:
1. Check Vercel build logs
2. Review Neon database logs
3. Test locally with `npm run dev`
4. Contact support if needed

## 🎉 Success Checklist

- [ ] Neon database created and configured
- [ ] All environment variables set in Vercel
- [ ] Database tables created successfully
- [ ] Website deploys without errors
- [ ] Homepage loads completely
- [ ] Contact form works
- [ ] Admin panel accessible
- [ ] Mobile responsive design works
- [ ] All sections display properly

**Congratulations! Your Desa Kaliwungu website is now live! 🚀**
