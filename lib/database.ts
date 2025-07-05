import { neon } from "@neondatabase/serverless"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set")
}

const sql = neon(process.env.DATABASE_URL)

// News functions - MENGGUNAKAN TABEL ADMIN_NEWS YANG SAMA
export async function getAllNews() {
  try {
    const news = await sql`
      SELECT * FROM admin_news 
      ORDER BY created_at DESC
    `
    return news
  } catch (error) {
    console.error("Error fetching news:", error)
    throw new Error("Failed to fetch news")
  }
}

export async function getPublishedNews() {
  try {
    const news = await sql`
      SELECT * FROM admin_news 
      WHERE published = true 
      ORDER BY created_at DESC
    `
    return news
  } catch (error) {
    console.error("Error fetching published news:", error)
    throw new Error("Failed to fetch published news")
  }
}

export async function getNewsById(id: number) {
  try {
    const news = await sql`
      SELECT * FROM admin_news 
      WHERE id = ${id}
    `
    return news[0] || null
  } catch (error) {
    console.error("Error fetching news by id:", error)
    throw new Error("Failed to fetch news")
  }
}

export async function createNews(data: {
  title: string
  content: string
  excerpt?: string
  image?: string
  category: string
  published: boolean
}) {
  try {
    const result = await sql`
      INSERT INTO admin_news (title, content, excerpt, image, category, published, author_id)
      VALUES (${data.title}, ${data.content}, ${data.excerpt || ""}, ${data.image || ""}, ${data.category}, ${data.published}, 1)
      RETURNING *
    `
    return result[0]
  } catch (error) {
    console.error("Error creating news:", error)
    throw new Error("Failed to create news")
  }
}

export async function updateNews(
  id: number,
  data: {
    title: string
    content: string
    excerpt?: string
    image?: string
    category: string
    published: boolean
  },
) {
  try {
    const result = await sql`
      UPDATE admin_news 
      SET title = ${data.title}, 
          content = ${data.content}, 
          excerpt = ${data.excerpt || ""}, 
          image = ${data.image || ""}, 
          category = ${data.category}, 
          published = ${data.published},
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `
    return result[0]
  } catch (error) {
    console.error("Error updating news:", error)
    throw new Error("Failed to update news")
  }
}

export async function deleteNews(id: number) {
  try {
    await sql`DELETE FROM admin_news WHERE id = ${id}`
    return true
  } catch (error) {
    console.error("Error deleting news:", error)
    throw new Error("Failed to delete news")
  }
}

// UMKM functions - MENGGUNAKAN TABEL ADMIN_UMKM YANG SAMA
export async function getAllUMKM() {
  try {
    const umkm = await sql`
      SELECT * FROM admin_umkm 
      ORDER BY created_at DESC
    `
    return umkm
  } catch (error) {
    console.error("Error fetching UMKM:", error)
    throw new Error("Failed to fetch UMKM")
  }
}

export async function getFeaturedUMKM() {
  try {
    const umkm = await sql`
      SELECT * FROM admin_umkm 
      WHERE featured = true 
      ORDER BY rating DESC
      LIMIT 8
    `
    return umkm
  } catch (error) {
    console.error("Error fetching featured UMKM:", error)
    throw new Error("Failed to fetch featured UMKM")
  }
}

export async function getUMKMById(id: number) {
  try {
    const umkm = await sql`
      SELECT * FROM admin_umkm 
      WHERE id = ${id}
    `
    return umkm[0] || null
  } catch (error) {
    console.error("Error fetching UMKM by id:", error)
    throw new Error("Failed to fetch UMKM")
  }
}

export async function createUMKM(data: {
  name: string
  description: string
  category: string
  owner: string
  phone: string
  address: string
  image?: string
  rating?: number
  featured: boolean
}) {
  try {
    const result = await sql`
      INSERT INTO admin_umkm (name, description, category, owner, phone, address, image, rating, featured)
      VALUES (${data.name}, ${data.description}, ${data.category}, ${data.owner}, ${data.phone}, ${data.address}, ${data.image || ""}, ${data.rating || 0}, ${data.featured})
      RETURNING *
    `
    return result[0]
  } catch (error) {
    console.error("Error creating UMKM:", error)
    throw new Error("Failed to create UMKM")
  }
}

export async function updateUMKM(
  id: number,
  data: {
    name: string
    description: string
    category: string
    owner: string
    phone: string
    address: string
    image?: string
    rating?: number
    featured: boolean
  },
) {
  try {
    const result = await sql`
      UPDATE admin_umkm 
      SET name = ${data.name}, 
          description = ${data.description}, 
          category = ${data.category}, 
          owner = ${data.owner}, 
          phone = ${data.phone}, 
          address = ${data.address}, 
          image = ${data.image || ""}, 
          rating = ${data.rating || 0}, 
          featured = ${data.featured},
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `
    return result[0]
  } catch (error) {
    console.error("Error updating UMKM:", error)
    throw new Error("Failed to update UMKM")
  }
}

export async function deleteUMKM(id: number) {
  try {
    await sql`DELETE FROM admin_umkm WHERE id = ${id}`
    return true
  } catch (error) {
    console.error("Error deleting UMKM:", error)
    throw new Error("Failed to delete UMKM")
  }
}

// Gallery functions - MENGGUNAKAN TABEL ADMIN_GALLERY YANG SAMA
export async function getAllGallery() {
  try {
    const gallery = await sql`
      SELECT * FROM admin_gallery 
      ORDER BY created_at DESC
    `
    return gallery
  } catch (error) {
    console.error("Error fetching gallery:", error)
    throw new Error("Failed to fetch gallery")
  }
}

export async function createGalleryItem(data: {
  title: string
  description?: string
  image: string
  category: string
}) {
  try {
    const result = await sql`
      INSERT INTO admin_gallery (title, description, image, category)
      VALUES (${data.title}, ${data.description || ""}, ${data.image}, ${data.category})
      RETURNING *
    `
    return result[0]
  } catch (error) {
    console.error("Error creating gallery item:", error)
    throw new Error("Failed to create gallery item")
  }
}

export async function deleteGalleryItem(id: number) {
  try {
    await sql`DELETE FROM admin_gallery WHERE id = ${id}`
    return true
  } catch (error) {
    console.error("Error deleting gallery item:", error)
    throw new Error("Failed to delete gallery item")
  }
}

// Agenda functions - MENGGUNAKAN TABEL ADMIN_AGENDA YANG SAMA
export async function getAllAgenda() {
  try {
    const agenda = await sql`
      SELECT * FROM admin_agenda 
      ORDER BY event_date ASC
    `
    return agenda
  } catch (error) {
    console.error("Error fetching agenda:", error)
    throw new Error("Failed to fetch agenda")
  }
}

export async function getUpcomingAgenda() {
  try {
    const agenda = await sql`
      SELECT * FROM admin_agenda 
      WHERE event_date >= CURRENT_DATE 
      ORDER BY event_date ASC
      LIMIT 5
    `
    return agenda
  } catch (error) {
    console.error("Error fetching upcoming agenda:", error)
    throw new Error("Failed to fetch upcoming agenda")
  }
}

export async function createAgenda(data: {
  title: string
  description: string
  event_date: string
  location: string
  organizer: string
}) {
  try {
    const result = await sql`
      INSERT INTO admin_agenda (title, description, event_date, location, organizer, category)
      VALUES (${data.title}, ${data.description}, ${data.event_date}, ${data.location}, ${data.organizer}, 'umum')
      RETURNING *
    `
    return result[0]
  } catch (error) {
    console.error("Error creating agenda:", error)
    throw new Error("Failed to create agenda")
  }
}

export async function updateAgenda(
  id: number,
  data: {
    title: string
    description: string
    event_date: string
    location: string
    organizer: string
  },
) {
  try {
    const result = await sql`
      UPDATE admin_agenda 
      SET title = ${data.title}, 
          description = ${data.description}, 
          event_date = ${data.event_date}, 
          location = ${data.location}, 
          organizer = ${data.organizer}
      WHERE id = ${id}
      RETURNING *
    `
    return result[0]
  } catch (error) {
    console.error("Error updating agenda:", error)
    throw new Error("Failed to update agenda")
  }
}

export async function deleteAgenda(id: number) {
  try {
    await sql`DELETE FROM admin_agenda WHERE id = ${id}`
    return true
  } catch (error) {
    console.error("Error deleting agenda:", error)
    throw new Error("Failed to delete agenda")
  }
}

// Village Profile functions - MENGGUNAKAN TABEL ADMIN_VILLAGE_PROFILE YANG SAMA
export async function getVillageProfile() {
  try {
    const profile = await sql`
      SELECT * FROM admin_village_profile 
      ORDER BY id DESC 
      LIMIT 1
    `
    return profile[0] || null
  } catch (error) {
    console.error("Error fetching village profile:", error)
    throw new Error("Failed to fetch village profile")
  }
}

export async function updateVillageProfile(data: {
  vision?: string
  mission?: string
  history?: string
  area_size?: string
  population?: number
  villages_count?: number
  rw_count?: number
  rt_count?: number
}) {
  try {
    const existing = await getVillageProfile()

    if (existing) {
      const result = await sql`
        UPDATE admin_village_profile 
        SET vision = ${data.vision || ""}, 
            mission = ${data.mission || ""}, 
            history = ${data.history || ""}, 
            area_size = ${data.area_size || ""}, 
            population = ${data.population || 0}, 
            villages_count = ${data.villages_count || 0}, 
            rw_count = ${data.rw_count || 0}, 
            rt_count = ${data.rt_count || 0},
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ${existing.id}
        RETURNING *
      `
      return result[0]
    } else {
      const result = await sql`
        INSERT INTO admin_village_profile (vision, mission, history, area_size, population, villages_count, rw_count, rt_count)
        VALUES (${data.vision || ""}, ${data.mission || ""}, ${data.history || ""}, ${data.area_size || ""}, ${data.population || 0}, ${data.villages_count || 0}, ${data.rw_count || 0}, ${data.rt_count || 0})
        RETURNING *
      `
      return result[0]
    }
  } catch (error) {
    console.error("Error updating village profile:", error)
    throw new Error("Failed to update village profile")
  }
}

// Village Officials functions - MENGGUNAKAN TABEL ADMIN_VILLAGE_OFFICIALS YANG SAMA
export async function getAllVillageOfficials() {
  try {
    const officials = await sql`
      SELECT * FROM admin_village_officials 
      ORDER BY 
        CASE position 
          WHEN 'Kepala Desa' THEN 1
          WHEN 'Sekretaris Desa' THEN 2
          ELSE 3
        END,
        created_at ASC
    `
    return officials
  } catch (error) {
    console.error("Error fetching village officials:", error)
    throw new Error("Failed to fetch village officials")
  }
}

export async function createVillageOfficial(data: {
  name: string
  position: string
  photo?: string
  phone?: string
  email?: string
}) {
  try {
    const result = await sql`
      INSERT INTO admin_village_officials (name, position, photo, phone, email)
      VALUES (${data.name}, ${data.position}, ${data.photo || ""}, ${data.phone || ""}, ${data.email || ""})
      RETURNING *
    `
    return result[0]
  } catch (error) {
    console.error("Error creating village official:", error)
    throw new Error("Failed to create village official")
  }
}

export async function updateVillageOfficial(
  id: number,
  data: {
    name: string
    position: string
    photo?: string
    phone?: string
    email?: string
  },
) {
  try {
    const result = await sql`
      UPDATE admin_village_officials 
      SET name = ${data.name}, 
          position = ${data.position}, 
          photo = ${data.photo || ""}, 
          phone = ${data.phone || ""}, 
          email = ${data.email || ""}
      WHERE id = ${id}
      RETURNING *
    `
    return result[0]
  } catch (error) {
    console.error("Error updating village official:", error)
    throw new Error("Failed to update village official")
  }
}

export async function deleteVillageOfficial(id: number) {
  try {
    await sql`DELETE FROM admin_village_officials WHERE id = ${id}`
    return true
  } catch (error) {
    console.error("Error deleting village official:", error)
    throw new Error("Failed to delete village official")
  }
}

// User authentication functions - MENGGUNAKAN TABEL ADMIN_USERS YANG SAMA
export async function getUserByEmail(email: string) {
  try {
    const user = await sql`
      SELECT * FROM admin_users 
      WHERE email = ${email}
    `
    return user[0] || null
  } catch (error) {
    console.error("Error fetching user:", error)
    throw new Error("Failed to fetch user")
  }
}

export async function createUser(data: {
  email: string
  password: string
  name: string
  role?: string
}) {
  try {
    const result = await sql`
      INSERT INTO admin_users (email, password, name, role)
      VALUES (${data.email}, ${data.password}, ${data.name}, ${data.role || "admin"})
      RETURNING id, email, name, role, created_at
    `
    return result[0]
  } catch (error) {
    console.error("Error creating user:", error)
    throw new Error("Failed to create user")
  }
}

// Statistics functions - MENGGUNAKAN TABEL ADMIN_* YANG SAMA
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
