import { neon } from "@neondatabase/serverless"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set")
}

const sql = neon(process.env.DATABASE_URL)

// Types
export interface News {
  id: number
  title: string
  content: string
  excerpt?: string
  image?: string
  category: string
  published: boolean
  author_id?: number
  created_at: string
  updated_at: string
}

export interface UMKM {
  id: number
  name: string
  description: string
  category: string
  owner?: string
  phone?: string
  address?: string
  image?: string
  rating?: number
  featured: boolean
  created_at: string
  updated_at: string
}

export interface VillageProfile {
  id: number
  vision?: string
  mission?: string
  history?: string
  area_size?: string
  population?: number
  villages_count?: number
  rw_count?: number
  rt_count?: number
  updated_at: string
}

export interface Gallery {
  id: number
  title: string
  description?: string
  image: string
  category: string
  created_at: string
}

export interface Agenda {
  id: number
  title: string
  description?: string
  event_date: string
  event_time?: string
  location?: string
  organizer?: string
  category: string
  created_at: string
}

// News functions - Using admin_news table for integration
export async function getAllNews(): Promise<News[]> {
  try {
    const news = await sql`
      SELECT * FROM admin_news 
      WHERE published = true 
      ORDER BY created_at DESC
    `
    return news as News[]
  } catch (error) {
    console.error("Error fetching news:", error)
    throw new Error("Failed to fetch news")
  }
}

export async function getNewsById(id: number): Promise<News | null> {
  try {
    const news = await sql`
      SELECT * FROM admin_news 
      WHERE id = ${id} AND published = true
    `
    return (news[0] as News) || null
  } catch (error) {
    console.error("Error fetching news by id:", error)
    throw new Error("Failed to fetch news")
  }
}

export async function getLatestNews(limit = 6): Promise<News[]> {
  try {
    const news = await sql`
      SELECT * FROM admin_news 
      WHERE published = true 
      ORDER BY created_at DESC 
      LIMIT ${limit}
    `
    return news as News[]
  } catch (error) {
    console.error("Error fetching latest news:", error)
    throw new Error("Failed to fetch latest news")
  }
}

// UMKM functions - Using admin_umkm table for integration
export async function getAllUMKM(): Promise<UMKM[]> {
  try {
    const umkm = await sql`
      SELECT * FROM admin_umkm 
      ORDER BY featured DESC, rating DESC, created_at DESC
    `
    return umkm as UMKM[]
  } catch (error) {
    console.error("Error fetching UMKM:", error)
    throw new Error("Failed to fetch UMKM")
  }
}

export async function getFeaturedUMKM(limit = 8): Promise<UMKM[]> {
  try {
    const umkm = await sql`
      SELECT * FROM admin_umkm 
      WHERE featured = true 
      ORDER BY rating DESC, created_at DESC 
      LIMIT ${limit}
    `
    return umkm as UMKM[]
  } catch (error) {
    console.error("Error fetching featured UMKM:", error)
    throw new Error("Failed to fetch featured UMKM")
  }
}

export async function getUMKMById(id: number): Promise<UMKM | null> {
  try {
    const umkm = await sql`
      SELECT * FROM admin_umkm 
      WHERE id = ${id}
    `
    return (umkm[0] as UMKM) || null
  } catch (error) {
    console.error("Error fetching UMKM by id:", error)
    throw new Error("Failed to fetch UMKM")
  }
}

// Village Profile functions - Using admin_village_profile table for integration
export async function getVillageProfile(): Promise<VillageProfile | null> {
  try {
    const profile = await sql`
      SELECT * FROM admin_village_profile 
      ORDER BY id DESC 
      LIMIT 1
    `
    return (profile[0] as VillageProfile) || null
  } catch (error) {
    console.error("Error fetching village profile:", error)
    throw new Error("Failed to fetch village profile")
  }
}

// Gallery functions - Using admin_gallery table for integration
export async function getAllGallery(): Promise<Gallery[]> {
  try {
    const gallery = await sql`
      SELECT * FROM admin_gallery 
      ORDER BY created_at DESC
    `
    return gallery as Gallery[]
  } catch (error) {
    console.error("Error fetching gallery:", error)
    throw new Error("Failed to fetch gallery")
  }
}

export async function getLatestGallery(limit = 12): Promise<Gallery[]> {
  try {
    const gallery = await sql`
      SELECT * FROM admin_gallery 
      ORDER BY created_at DESC 
      LIMIT ${limit}
    `
    return gallery as Gallery[]
  } catch (error) {
    console.error("Error fetching latest gallery:", error)
    throw new Error("Failed to fetch latest gallery")
  }
}

// Agenda functions - Using admin_agenda table for integration
export async function getAllAgenda(): Promise<Agenda[]> {
  try {
    const agenda = await sql`
      SELECT * FROM admin_agenda 
      ORDER BY event_date ASC
    `
    return agenda as Agenda[]
  } catch (error) {
    console.error("Error fetching agenda:", error)
    throw new Error("Failed to fetch agenda")
  }
}

export async function getUpcomingAgenda(limit = 5): Promise<Agenda[]> {
  try {
    const agenda = await sql`
      SELECT * FROM admin_agenda 
      WHERE event_date >= CURRENT_DATE 
      ORDER BY event_date ASC 
      LIMIT ${limit}
    `
    return agenda as Agenda[]
  } catch (error) {
    console.error("Error fetching upcoming agenda:", error)
    throw new Error("Failed to fetch upcoming agenda")
  }
}

// Statistics functions
export async function getStatistics() {
  try {
    const newsCount = await sql`SELECT COUNT(*) as count FROM admin_news WHERE published = true`
    const umkmCount = await sql`SELECT COUNT(*) as count FROM admin_umkm`
    const galleryCount = await sql`SELECT COUNT(*) as count FROM admin_gallery`
    const agendaCount = await sql`SELECT COUNT(*) as count FROM admin_agenda WHERE event_date >= CURRENT_DATE`

    return {
      news: Number(newsCount[0].count),
      umkm: Number(umkmCount[0].count),
      gallery: Number(galleryCount[0].count),
      agenda: Number(agendaCount[0].count),
    }
  } catch (error) {
    console.error("Error fetching statistics:", error)
    throw new Error("Failed to fetch statistics")
  }
}

// Contact form submission
export async function submitContactForm(data: {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}) {
  try {
    const result = await sql`
      INSERT INTO contact_submissions (name, email, phone, subject, message)
      VALUES (${data.name}, ${data.email}, ${data.phone || ""}, ${data.subject}, ${data.message})
      RETURNING *
    `
    return result[0]
  } catch (error) {
    console.error("Error submitting contact form:", error)
    throw new Error("Failed to submit contact form")
  }
}
