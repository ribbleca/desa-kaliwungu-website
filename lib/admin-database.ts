import { neon } from "@neondatabase/serverless"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set")
}

const sql = neon(process.env.DATABASE_URL)

// Types
export interface AdminUser {
  id: number
  email: string
  name: string
  role: string
  created_at: string
}

export interface AdminNews {
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

export interface AdminUMKM {
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

export interface AdminVillageProfile {
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

export interface AdminGallery {
  id: number
  title: string
  description?: string
  image: string
  category: string
  created_at: string
}

export interface AdminAgenda {
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

export interface AdminVillageOfficial {
  id: number
  name: string
  position: string
  photo?: string
  phone?: string
  email?: string
  description?: string
  order_index: number
  created_at: string
}

// Auth functions
export async function authenticateAdmin(email: string, password: string): Promise<AdminUser | null> {
  try {
    // For demo purposes - in production, use proper password hashing
    if (email === "admin@desakaliwungu.id" && password === "admin123") {
      return {
        id: 1,
        email: "admin@desakaliwungu.id",
        name: "Administrator Desa",
        role: "admin",
        created_at: new Date().toISOString(),
      }
    }
    return null
  } catch (error) {
    console.error("Authentication error:", error)
    return null
  }
}

// News functions
export async function getAllAdminNews(): Promise<AdminNews[]> {
  try {
    const news = await sql`
      SELECT * FROM admin_news 
      ORDER BY created_at DESC
    `
    return news as AdminNews[]
  } catch (error) {
    console.error("Error fetching admin news:", error)
    throw new Error("Failed to fetch news")
  }
}

export async function getPublishedAdminNews(): Promise<AdminNews[]> {
  try {
    const news = await sql`
      SELECT * FROM admin_news 
      WHERE published = true 
      ORDER BY created_at DESC
    `
    return news as AdminNews[]
  } catch (error) {
    console.error("Error fetching published admin news:", error)
    throw new Error("Failed to fetch published news")
  }
}

export async function getAdminNewsById(id: number): Promise<AdminNews | null> {
  try {
    const news = await sql`
      SELECT * FROM admin_news 
      WHERE id = ${id}
    `
    return (news[0] as AdminNews) || null
  } catch (error) {
    console.error("Error fetching admin news by id:", error)
    throw new Error("Failed to fetch news")
  }
}

export async function createAdminNews(data: Omit<AdminNews, "id" | "created_at" | "updated_at">): Promise<AdminNews> {
  try {
    const result = await sql`
      INSERT INTO admin_news (title, content, excerpt, image, category, published, author_id)
      VALUES (${data.title}, ${data.content}, ${data.excerpt || ""}, ${data.image || ""}, ${data.category}, ${data.published}, ${data.author_id || 1})
      RETURNING *
    `
    return result[0] as AdminNews
  } catch (error) {
    console.error("Error creating admin news:", error)
    throw new Error("Failed to create news")
  }
}

export async function updateAdminNews(id: number, data: Partial<AdminNews>): Promise<AdminNews> {
  try {
    const result = await sql`
      UPDATE admin_news 
      SET title = COALESCE(${data.title}, title),
          content = COALESCE(${data.content}, content),
          excerpt = COALESCE(${data.excerpt}, excerpt),
          image = COALESCE(${data.image}, image),
          category = COALESCE(${data.category}, category),
          published = COALESCE(${data.published}, published),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `
    return result[0] as AdminNews
  } catch (error) {
    console.error("Error updating admin news:", error)
    throw new Error("Failed to update news")
  }
}

export async function deleteAdminNews(id: number): Promise<boolean> {
  try {
    await sql`DELETE FROM admin_news WHERE id = ${id}`
    return true
  } catch (error) {
    console.error("Error deleting admin news:", error)
    throw new Error("Failed to delete news")
  }
}

// UMKM functions
export async function getAllAdminUMKM(): Promise<AdminUMKM[]> {
  try {
    const umkm = await sql`
      SELECT * FROM admin_umkm 
      ORDER BY created_at DESC
    `
    return umkm as AdminUMKM[]
  } catch (error) {
    console.error("Error fetching admin UMKM:", error)
    throw new Error("Failed to fetch UMKM")
  }
}

export async function getFeaturedAdminUMKM(): Promise<AdminUMKM[]> {
  try {
    const umkm = await sql`
      SELECT * FROM admin_umkm 
      WHERE featured = true 
      ORDER BY rating DESC
      LIMIT 8
    `
    return umkm as AdminUMKM[]
  } catch (error) {
    console.error("Error fetching featured admin UMKM:", error)
    throw new Error("Failed to fetch featured UMKM")
  }
}

export async function createAdminUMKM(data: Omit<AdminUMKM, "id" | "created_at" | "updated_at">): Promise<AdminUMKM> {
  try {
    const result = await sql`
      INSERT INTO admin_umkm (name, description, category, owner, phone, address, image, rating, featured)
      VALUES (${data.name}, ${data.description}, ${data.category}, ${data.owner || ""}, ${data.phone || ""}, ${data.address || ""}, ${data.image || ""}, ${data.rating || 0}, ${data.featured})
      RETURNING *
    `
    return result[0] as AdminUMKM
  } catch (error) {
    console.error("Error creating admin UMKM:", error)
    throw new Error("Failed to create UMKM")
  }
}

export async function updateAdminUMKM(id: number, data: Partial<AdminUMKM>): Promise<AdminUMKM> {
  try {
    const result = await sql`
      UPDATE admin_umkm 
      SET name = COALESCE(${data.name}, name),
          description = COALESCE(${data.description}, description),
          category = COALESCE(${data.category}, category),
          owner = COALESCE(${data.owner}, owner),
          phone = COALESCE(${data.phone}, phone),
          address = COALESCE(${data.address}, address),
          image = COALESCE(${data.image}, image),
          rating = COALESCE(${data.rating}, rating),
          featured = COALESCE(${data.featured}, featured),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `
    return result[0] as AdminUMKM
  } catch (error) {
    console.error("Error updating admin UMKM:", error)
    throw new Error("Failed to update UMKM")
  }
}

export async function deleteAdminUMKM(id: number): Promise<boolean> {
  try {
    await sql`DELETE FROM admin_umkm WHERE id = ${id}`
    return true
  } catch (error) {
    console.error("Error deleting admin UMKM:", error)
    throw new Error("Failed to delete UMKM")
  }
}

// Village Profile functions
export async function getAdminVillageProfile(): Promise<AdminVillageProfile | null> {
  try {
    const profile = await sql`
      SELECT * FROM admin_village_profile 
      ORDER BY id DESC 
      LIMIT 1
    `
    return (profile[0] as AdminVillageProfile) || null
  } catch (error) {
    console.error("Error fetching admin village profile:", error)
    throw new Error("Failed to fetch village profile")
  }
}

export async function updateAdminVillageProfile(data: Partial<AdminVillageProfile>): Promise<AdminVillageProfile> {
  try {
    // First check if profile exists
    const existing = await getAdminVillageProfile()

    if (existing) {
      // Update existing profile
      const result = await sql`
        UPDATE admin_village_profile 
        SET vision = COALESCE(${data.vision}, vision),
            mission = COALESCE(${data.mission}, mission),
            history = COALESCE(${data.history}, history),
            area_size = COALESCE(${data.area_size}, area_size),
            population = COALESCE(${data.population}, population),
            villages_count = COALESCE(${data.villages_count}, villages_count),
            rw_count = COALESCE(${data.rw_count}, rw_count),
            rt_count = COALESCE(${data.rt_count}, rt_count),
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ${existing.id}
        RETURNING *
      `
      return result[0] as AdminVillageProfile
    } else {
      // Create new profile
      const result = await sql`
        INSERT INTO admin_village_profile (vision, mission, history, area_size, population, villages_count, rw_count, rt_count)
        VALUES (${data.vision || ""}, ${data.mission || ""}, ${data.history || ""}, ${data.area_size || ""}, ${data.population || 0}, ${data.villages_count || 0}, ${data.rw_count || 0}, ${data.rt_count || 0})
        RETURNING *
      `
      return result[0] as AdminVillageProfile
    }
  } catch (error) {
    console.error("Error updating admin village profile:", error)
    throw new Error("Failed to update village profile")
  }
}

// Gallery functions
export async function getAllAdminGallery(): Promise<AdminGallery[]> {
  try {
    const gallery = await sql`
      SELECT * FROM admin_gallery 
      ORDER BY created_at DESC
    `
    return gallery as AdminGallery[]
  } catch (error) {
    console.error("Error fetching admin gallery:", error)
    throw new Error("Failed to fetch gallery")
  }
}

export async function createAdminGallery(data: Omit<AdminGallery, "id" | "created_at">): Promise<AdminGallery> {
  try {
    const result = await sql`
      INSERT INTO admin_gallery (title, description, image, category)
      VALUES (${data.title}, ${data.description || ""}, ${data.image}, ${data.category})
      RETURNING *
    `
    return result[0] as AdminGallery
  } catch (error) {
    console.error("Error creating admin gallery:", error)
    throw new Error("Failed to create gallery item")
  }
}

export async function deleteAdminGallery(id: number): Promise<boolean> {
  try {
    await sql`DELETE FROM admin_gallery WHERE id = ${id}`
    return true
  } catch (error) {
    console.error("Error deleting admin gallery:", error)
    throw new Error("Failed to delete gallery item")
  }
}

// Agenda functions
export async function getAllAdminAgenda(): Promise<AdminAgenda[]> {
  try {
    const agenda = await sql`
      SELECT * FROM admin_agenda 
      ORDER BY event_date ASC
    `
    return agenda as AdminAgenda[]
  } catch (error) {
    console.error("Error fetching admin agenda:", error)
    throw new Error("Failed to fetch agenda")
  }
}

export async function getUpcomingAdminAgenda(): Promise<AdminAgenda[]> {
  try {
    const agenda = await sql`
      SELECT * FROM admin_agenda 
      WHERE event_date >= CURRENT_DATE 
      ORDER BY event_date ASC
      LIMIT 5
    `
    return agenda as AdminAgenda[]
  } catch (error) {
    console.error("Error fetching upcoming admin agenda:", error)
    throw new Error("Failed to fetch upcoming agenda")
  }
}

export async function createAdminAgenda(data: Omit<AdminAgenda, "id" | "created_at">): Promise<AdminAgenda> {
  try {
    const result = await sql`
      INSERT INTO admin_agenda (title, description, event_date, event_time, location, organizer, category)
      VALUES (${data.title}, ${data.description || ""}, ${data.event_date}, ${data.event_time || null}, ${data.location || ""}, ${data.organizer || ""}, ${data.category})
      RETURNING *
    `
    return result[0] as AdminAgenda
  } catch (error) {
    console.error("Error creating admin agenda:", error)
    throw new Error("Failed to create agenda")
  }
}

export async function updateAdminAgenda(id: number, data: Partial<AdminAgenda>): Promise<AdminAgenda> {
  try {
    const result = await sql`
      UPDATE admin_agenda 
      SET title = COALESCE(${data.title}, title),
          description = COALESCE(${data.description}, description),
          event_date = COALESCE(${data.event_date}, event_date),
          event_time = COALESCE(${data.event_time}, event_time),
          location = COALESCE(${data.location}, location),
          organizer = COALESCE(${data.organizer}, organizer),
          category = COALESCE(${data.category}, category)
      WHERE id = ${id}
      RETURNING *
    `
    return result[0] as AdminAgenda
  } catch (error) {
    console.error("Error updating admin agenda:", error)
    throw new Error("Failed to update agenda")
  }
}

export async function deleteAdminAgenda(id: number): Promise<boolean> {
  try {
    await sql`DELETE FROM admin_agenda WHERE id = ${id}`
    return true
  } catch (error) {
    console.error("Error deleting admin agenda:", error)
    throw new Error("Failed to delete agenda")
  }
}

// Village Officials functions
export async function getAllAdminVillageOfficials(): Promise<AdminVillageOfficial[]> {
  try {
    const officials = await sql`
      SELECT * FROM admin_village_officials 
      ORDER BY order_index ASC, created_at ASC
    `
    return officials as AdminVillageOfficial[]
  } catch (error) {
    console.error("Error fetching admin village officials:", error)
    throw new Error("Failed to fetch village officials")
  }
}

export async function createAdminVillageOfficial(
  data: Omit<AdminVillageOfficial, "id" | "created_at">,
): Promise<AdminVillageOfficial> {
  try {
    const result = await sql`
      INSERT INTO admin_village_officials (name, position, photo, phone, email, description, order_index)
      VALUES (${data.name}, ${data.position}, ${data.photo || ""}, ${data.phone || ""}, ${data.email || ""}, ${data.description || ""}, ${data.order_index})
      RETURNING *
    `
    return result[0] as AdminVillageOfficial
  } catch (error) {
    console.error("Error creating admin village official:", error)
    throw new Error("Failed to create village official")
  }
}

export async function updateAdminVillageOfficial(
  id: number,
  data: Partial<AdminVillageOfficial>,
): Promise<AdminVillageOfficial> {
  try {
    const result = await sql`
      UPDATE admin_village_officials 
      SET name = COALESCE(${data.name}, name),
          position = COALESCE(${data.position}, position),
          photo = COALESCE(${data.photo}, photo),
          phone = COALESCE(${data.phone}, phone),
          email = COALESCE(${data.email}, email),
          description = COALESCE(${data.description}, description),
          order_index = COALESCE(${data.order_index}, order_index)
      WHERE id = ${id}
      RETURNING *
    `
    return result[0] as AdminVillageOfficial
  } catch (error) {
    console.error("Error updating admin village official:", error)
    throw new Error("Failed to update village official")
  }
}

export async function deleteAdminVillageOfficial(id: number): Promise<boolean> {
  try {
    await sql`DELETE FROM admin_village_officials WHERE id = ${id}`
    return true
  } catch (error) {
    console.error("Error deleting admin village official:", error)
    throw new Error("Failed to delete village official")
  }
}

// Statistics functions
export async function getAdminStatistics() {
  try {
    const newsCount = await sql`SELECT COUNT(*) as count FROM admin_news`
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
    console.error("Error fetching admin statistics:", error)
    throw new Error("Failed to fetch statistics")
  }
}
