// Database configuration for Neon PostgreSQL
// This would be implemented with actual database connection

export interface News {
  id: number
  title: string
  content: string
  excerpt: string
  image?: string
  category: string
  published: boolean
  createdAt: Date
  updatedAt: Date
}

export interface UMKM {
  id: number
  name: string
  description: string
  category: string
  owner: string
  phone: string
  address: string
  image?: string
  rating: number
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Gallery {
  id: number
  title: string
  description?: string
  image: string
  category: string
  createdAt: Date
}

export interface Agenda {
  id: number
  title: string
  description: string
  date: Date
  location: string
  organizer: string
  createdAt: Date
}

// Mock data for demonstration
export const mockNews: News[] = [
  {
    id: 1,
    title: "Pembangunan Jalan Desa Tahap II Dimulai",
    content: "Pemerintah desa memulai pembangunan jalan desa tahap kedua...",
    excerpt: "Pemerintah desa memulai pembangunan jalan desa tahap kedua untuk meningkatkan akses transportasi warga.",
    image: "/placeholder.svg?height=200&width=300",
    category: "Pembangunan",
    published: true,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  // Add more mock data as needed
]

export const mockUMKM: UMKM[] = [
  {
    id: 1,
    name: "Keripik Singkong Bu Sari",
    description: "Keripik singkong dengan berbagai varian rasa yang renyah dan gurih.",
    category: "Makanan & Minuman",
    owner: "Bu Sari",
    phone: "0812-3456-7890",
    address: "Dusun Kaliwungu Lor",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.8,
    featured: true,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  // Add more mock data as needed
]
