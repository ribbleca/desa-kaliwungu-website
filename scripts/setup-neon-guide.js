// Interactive guide to help set up Neon database
// Run with: node scripts/setup-neon-guide.js

const readline = require("readline")

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

console.log("🚀 Neon Database Setup Guide for Desa Kaliwungu")
console.log("================================================\n")

async function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim())
    })
  })
}

async function setupGuide() {
  console.log("This guide will help you set up your Neon PostgreSQL database.\n")

  const hasAccount = await askQuestion("Do you have a Neon account? (y/n): ")

  if (hasAccount.toLowerCase() !== "y") {
    console.log("\n📝 Step 1: Create a Neon Account")
    console.log("================================")
    console.log("1. Go to https://neon.tech")
    console.log('2. Click "Sign Up" and create an account')
    console.log("3. Verify your email address")
    console.log("4. Come back here when done\n")

    await askQuestion("Press Enter when you have created your account...")
  }

  console.log("\n🗄️  Step 2: Create a Database Project")
  console.log("=====================================")
  console.log("1. Go to https://console.neon.tech")
  console.log('2. Click "Create Project" or "New Project"')
  console.log('3. Choose a project name (e.g., "desa-kaliwungu")')
  console.log("4. Select a region (choose closest to your users)")
  console.log('5. Click "Create Project"\n')

  const hasProject = await askQuestion("Have you created your project? (y/n): ")

  if (hasProject.toLowerCase() === "y") {
    console.log("\n🔗 Step 3: Get Connection String")
    console.log("=================================")
    console.log("1. In your Neon dashboard, click on your project")
    console.log('2. Look for "Connection Details" or "Connect" button')
    console.log("3. Copy the connection string that looks like:")
    console.log("   postgresql://username:password@ep-xxx.region.neon.tech/dbname?sslmode=require")
    console.log('4. Make sure it includes "?sslmode=require" at the end\n')

    const connectionString = await askQuestion("Paste your connection string here: ")

    if (connectionString && connectionString.startsWith("postgresql://")) {
      console.log("\n✅ Connection string looks valid!")

      // Test the format
      try {
        const url = new URL(connectionString)
        console.log(`✅ Host: ${url.hostname}`)
        console.log(`✅ Database: ${url.pathname.substring(1)}`)

        if (!url.searchParams.get("sslmode")) {
          console.log("⚠️  Adding sslmode=require to your URL...")
          const fixedUrl = connectionString + (connectionString.includes("?") ? "&" : "?") + "sslmode=require"
          console.log(`Fixed URL: ${fixedUrl}`)
        }

        console.log("\n🔧 Step 4: Set Environment Variable")
        console.log("===================================")
        console.log("Run this command in your terminal:")
        console.log(`export DATABASE_URL="${connectionString}"`)
        console.log("\nOr add it to your .env.local file:")
        console.log(`DATABASE_URL="${connectionString}"`)

        console.log("\n🚀 Step 5: Run Database Setup")
        console.log("=============================")
        console.log("After setting the environment variable, run:")
        console.log("node scripts/run-database-init.js")
      } catch (error) {
        console.log("❌ Invalid connection string format")
        console.log("Please check the format and try again")
      }
    } else {
      console.log("❌ Invalid connection string")
      console.log("Please make sure you copied the full PostgreSQL connection string")
    }
  }

  console.log("\n📚 Additional Resources:")
  console.log("========================")
  console.log("• Neon Documentation: https://neon.tech/docs")
  console.log("• Connection Guide: https://neon.tech/docs/connect/connect-from-any-app")
  console.log("• Troubleshooting: https://neon.tech/docs/troubleshooting")

  console.log("\n🆘 Need Help?")
  console.log("=============")
  console.log("If you encounter issues:")
  console.log("1. Check your internet connection")
  console.log("2. Verify your Neon account is active")
  console.log("3. Make sure the connection string is complete")
  console.log("4. Try the manual setup via Neon dashboard")

  rl.close()
}

setupGuide().catch(console.error)
