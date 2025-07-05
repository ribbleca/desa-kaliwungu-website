"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Building, Calendar, Plus, Edit, Trash2, Save, Loader2, ImageIcon, MapPin } from "lucide-react"
import { NewsForm } from "@/components/admin/news-form"
import { UMKMForm } from "@/components/admin/umkm-form"
import { GalleryUpload } from "@/components/admin/gallery-upload"
import { useToast } from "@/hooks/use-toast"
import type { FormEvent } from "react"

interface User {
  id: number
  email: string
  name: string
  role: string
}

interface NewsItem {
  id: number
  title: string
  content: string
  excerpt?: string
  category: string
  image?: string
  published: boolean
  created_at: string
}

interface UMKMItem {
  id: number
  name: string
  description: string
  category: string
  owner?: string
  phone?: string
  address?: string
  image?: string
  featured: boolean
}

interface VillageProfile {
  vision?: string
  mission?: string
  history?: string
  population?: number
  area_size?: string
  villages_count?: number
  rw_count?: number
  rt_count?: number
}

interface GalleryItem {
  id: number
  title: string
  description?: string
  image: string
  category: string
  created_at: string
}

interface AgendaItem {
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

interface Statistics {
  news: number
  umkm: number
  gallery: number
  agenda: number
}

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [loginForm, setLoginForm] = useState({ email: "", password: "" })
  const [loginLoading, setLoginLoading] = useState(false)
  const { toast } = useToast()

  // Data states
  const [news, setNews] = useState<NewsItem[]>([])
  const [umkm, setUmkm] = useState<UMKMItem[]>([])
  const [profile, setProfile] = useState<VillageProfile>({})
  const [gallery, setGallery] = useState<GalleryItem[]>([])
  const [agenda, setAgenda] = useState<AgendaItem[]>([])
  const [statistics, setStatistics] = useState<Statistics>({ news: 0, umkm: 0, gallery: 0, agenda: 0 })

  // Form states
  const [showNewsForm, setShowNewsForm] = useState(false)
  const [showUMKMForm, setShowUMKMForm] = useState(false)
  const [showGalleryForm, setShowGalleryForm] = useState(false)
  const [showAgendaForm, setShowAgendaForm] = useState(false)
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null)
  const [editingUMKM, setEditingUMKM] = useState<UMKMItem | null>(null)
  const [editingAgenda, setEditingAgenda] = useState<AgendaItem | null>(null)

  // Agenda form state
  const [agendaForm, setAgendaForm] = useState({
    title: "",
    description: "",
    event_date: "",
    event_time: "",
    location: "",
    organizer: "",
    category: "Kegiatan Desa",
  })

  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    if (user) {
      loadData()
    }
  }, [user])

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/admin/auth")
      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
      }
    } catch (error) {
      console.error("Auth check error:", error)
    } finally {
      setLoading(false)
    }
  }

  const loadData = async () => {
    try {
      // Load statistics
      const statsResponse = await fetch("/api/admin/statistics")
      if (statsResponse.ok) {
        const statsData = await statsResponse.json()
        setStatistics(statsData)
      }

      // Load news
      const newsResponse = await fetch("/api/admin/news")
      if (newsResponse.ok) {
        const newsData = await newsResponse.json()
        setNews(newsData)
      }

      // Load UMKM
      const umkmResponse = await fetch("/api/admin/umkm")
      if (umkmResponse.ok) {
        const umkmData = await umkmResponse.json()
        setUmkm(umkmData)
      }

      // Load profile
      const profileResponse = await fetch("/api/admin/profile")
      if (profileResponse.ok) {
        const profileData = await profileResponse.json()
        setProfile(profileData || {})
      }

      // Load gallery
      const galleryResponse = await fetch("/api/admin/gallery")
      if (galleryResponse.ok) {
        const galleryData = await galleryResponse.json()
        setGallery(galleryData)
      }

      // Load agenda
      const agendaResponse = await fetch("/api/admin/agenda")
      if (agendaResponse.ok) {
        const agendaData = await agendaResponse.json()
        setAgenda(agendaData)
      }
    } catch (error) {
      console.error("Error loading data:", error)
    }
  }

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    setLoginLoading(true)

    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginForm),
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
        toast({
          title: "Login berhasil!",
          description: "Selamat datang di admin panel",
        })
      } else {
        toast({
          title: "Login gagal",
          description: "Email atau password salah",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat login",
        variant: "destructive",
      })
    } finally {
      setLoginLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth", { method: "DELETE" })
      setUser(null)
      toast({
        title: "Logout berhasil",
        description: "Anda telah keluar dari admin panel",
      })
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  // News functions
  const handleSaveNews = async (newsData: Omit<NewsItem, "id" | "created_at">) => {
    try {
      if (editingNews) {
        // Update existing news
        const response = await fetch(`/api/admin/news/${editingNews.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newsData),
        })
        if (response.ok) {
          const updatedNews = await response.json()
          setNews(news.map((item) => (item.id === editingNews.id ? updatedNews : item)))
          toast({
            title: "Berhasil",
            description: "Berita berhasil diupdate",
          })
        }
      } else {
        // Add new news
        const response = await fetch("/api/admin/news", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newsData),
        })
        if (response.ok) {
          const newNews = await response.json()
          setNews([newNews, ...news])
          toast({
            title: "Berhasil",
            description: "Berita berhasil ditambahkan",
          })
        }
      }

      setShowNewsForm(false)
      setEditingNews(null)
      loadData() // Refresh statistics
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menyimpan berita",
        variant: "destructive",
      })
    }
  }

  const handleDeleteNews = async (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus berita ini?")) {
      try {
        const response = await fetch(`/api/admin/news/${id}`, {
          method: "DELETE",
        })
        if (response.ok) {
          setNews(news.filter((item) => item.id !== id))
          toast({
            title: "Berhasil",
            description: "Berita berhasil dihapus",
          })
          loadData() // Refresh statistics
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Gagal menghapus berita",
          variant: "destructive",
        })
      }
    }
  }

  // UMKM functions
  const handleSaveUMKM = async (umkmData: Omit<UMKMItem, "id">) => {
    try {
      if (editingUMKM) {
        // Update existing UMKM
        const response = await fetch(`/api/admin/umkm/${editingUMKM.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(umkmData),
        })
        if (response.ok) {
          const updatedUMKM = await response.json()
          setUmkm(umkm.map((item) => (item.id === editingUMKM.id ? updatedUMKM : item)))
          toast({
            title: "Berhasil",
            description: "UMKM berhasil diupdate",
          })
        }
      } else {
        // Add new UMKM
        const response = await fetch("/api/admin/umkm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(umkmData),
        })
        if (response.ok) {
          const newUMKM = await response.json()
          setUmkm([newUMKM, ...umkm])
          toast({
            title: "Berhasil",
            description: "UMKM berhasil ditambahkan",
          })
        }
      }

      setShowUMKMForm(false)
      setEditingUMKM(null)
      loadData() // Refresh statistics
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menyimpan UMKM",
        variant: "destructive",
      })
    }
  }

  const handleDeleteUMKM = async (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus UMKM ini?")) {
      try {
        const response = await fetch(`/api/admin/umkm/${id}`, {
          method: "DELETE",
        })
        if (response.ok) {
          setUmkm(umkm.filter((item) => item.id !== id))
          toast({
            title: "Berhasil",
            description: "UMKM berhasil dihapus",
          })
          loadData() // Refresh statistics
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Gagal menghapus UMKM",
          variant: "destructive",
        })
      }
    }
  }

  // Gallery functions
  const handleSaveGallery = async (galleryData: Omit<GalleryItem, "id" | "created_at">) => {
    try {
      const response = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(galleryData),
      })
      if (response.ok) {
        const newGallery = await response.json()
        setGallery([newGallery, ...gallery])
        toast({
          title: "Berhasil",
          description: "Foto berhasil ditambahkan ke galeri",
        })
        setShowGalleryForm(false)
        loadData() // Refresh statistics
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menambahkan foto ke galeri",
        variant: "destructive",
      })
    }
  }

  const handleDeleteGallery = async (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus foto ini?")) {
      try {
        const response = await fetch(`/api/admin/gallery/${id}`, {
          method: "DELETE",
        })
        if (response.ok) {
          setGallery(gallery.filter((item) => item.id !== id))
          toast({
            title: "Berhasil",
            description: "Foto berhasil dihapus",
          })
          loadData() // Refresh statistics
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Gagal menghapus foto",
          variant: "destructive",
        })
      }
    }
  }

  // Agenda functions
  const handleSaveAgenda = async (e: FormEvent) => {
    e.preventDefault()
    try {
      if (editingAgenda) {
        // Update existing agenda
        const response = await fetch(`/api/admin/agenda/${editingAgenda.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(agendaForm),
        })
        if (response.ok) {
          const updatedAgenda = await response.json()
          setAgenda(agenda.map((item) => (item.id === editingAgenda.id ? updatedAgenda : item)))
          toast({
            title: "Berhasil",
            description: "Agenda berhasil diupdate",
          })
        }
      } else {
        // Add new agenda
        const response = await fetch("/api/admin/agenda", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(agendaForm),
        })
        if (response.ok) {
          const newAgenda = await response.json()
          setAgenda([newAgenda, ...agenda])
          toast({
            title: "Berhasil",
            description: "Agenda berhasil ditambahkan",
          })
        }
      }

      setShowAgendaForm(false)
      setEditingAgenda(null)
      setAgendaForm({
        title: "",
        description: "",
        event_date: "",
        event_time: "",
        location: "",
        organizer: "",
        category: "Kegiatan Desa",
      })
      loadData() // Refresh statistics
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menyimpan agenda",
        variant: "destructive",
      })
    }
  }

  const handleDeleteAgenda = async (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus agenda ini?")) {
      try {
        const response = await fetch(`/api/admin/agenda/${id}`, {
          method: "DELETE",
        })
        if (response.ok) {
          setAgenda(agenda.filter((item) => item.id !== id))
          toast({
            title: "Berhasil",
            description: "Agenda berhasil dihapus",
          })
          loadData() // Refresh statistics
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Gagal menghapus agenda",
          variant: "destructive",
        })
      }
    }
  }

  const handleSaveProfile = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/admin/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      })
      if (response.ok) {
        toast({
          title: "Berhasil",
          description: "Profil desa berhasil disimpan",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menyimpan profil desa",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/50">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Admin Login</CardTitle>
            <p className="text-muted-foreground">Masuk ke panel admin Desa Kaliwungu</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@desakaliwungu.id"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loginLoading}>
                {loginLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Masuk...
                  </>
                ) : (
                  "Masuk"
                )}
              </Button>
            </form>
            <div className="mt-4 p-3 bg-muted rounded-lg text-sm">
              <p className="font-medium">Demo Login:</p>
              <p>Email: admin@desakaliwungu.id</p>
              <p>Password: admin123</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const stats = [
    { title: "Total Berita", value: statistics.news.toString(), icon: FileText, color: "text-blue-600" },
    { title: "UMKM Terdaftar", value: statistics.umkm.toString(), icon: Building, color: "text-green-600" },
    { title: "Foto Galeri", value: statistics.gallery.toString(), icon: ImageIcon, color: "text-purple-600" },
    { title: "Agenda Kegiatan", value: statistics.agenda.toString(), icon: Calendar, color: "text-orange-600" },
  ]

  return (
    <div className="min-h-screen bg-muted/50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container flex items-center justify-between h-16">
          <h1 className="text-xl font-bold">Admin Dashboard - Desa Kaliwungu</h1>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              🟢 Database Connected
            </Badge>
            <span className="text-sm text-muted-foreground">Selamat datang, {user.name}</span>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="berita">Berita</TabsTrigger>
            <TabsTrigger value="umkm">UMKM</TabsTrigger>
            <TabsTrigger value="profil">Profil</TabsTrigger>
            <TabsTrigger value="galeri">Galeri</TabsTrigger>
            <TabsTrigger value="agenda">Agenda</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Berita Terbaru</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {news.slice(0, 5).map((newsItem) => (
                      <div key={newsItem.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{newsItem.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {new Date(newsItem.created_at).toLocaleDateString("id-ID")}
                          </p>
                        </div>
                        <Badge variant={newsItem.published ? "default" : "secondary"}>
                          {newsItem.published ? "Published" : "Draft"}
                        </Badge>
                      </div>
                    ))}
                    {news.length === 0 && <p className="text-muted-foreground text-center py-4">Belum ada berita</p>}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>UMKM Terbaru</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {umkm.slice(0, 5).map((umkmItem) => (
                      <div key={umkmItem.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{umkmItem.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {umkmItem.category} • {umkmItem.owner}
                          </p>
                        </div>
                        <Badge variant={umkmItem.featured ? "default" : "secondary"}>
                          {umkmItem.featured ? "Unggulan" : "Biasa"}
                        </Badge>
                      </div>
                    ))}
                    {umkm.length === 0 && <p className="text-muted-foreground text-center py-4">Belum ada UMKM</p>}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="berita">
            {showNewsForm ? (
              <NewsForm
                initialData={editingNews}
                onSubmit={handleSaveNews}
                onCancel={() => {
                  setShowNewsForm(false)
                  setEditingNews(null)
                }}
              />
            ) : (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Kelola Berita</CardTitle>
                  <Button onClick={() => setShowNewsForm(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Tambah Berita
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {news.map((newsItem) => (
                      <div key={newsItem.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{newsItem.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {new Date(newsItem.created_at).toLocaleDateString("id-ID")} • {newsItem.category}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={newsItem.published ? "default" : "secondary"}>
                            {newsItem.published ? "Published" : "Draft"}
                          </Badge>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingNews(newsItem)
                              setShowNewsForm(true)
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleDeleteNews(newsItem.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    {news.length === 0 && <p className="text-muted-foreground text-center py-8">Belum ada berita</p>}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="umkm">
            {showUMKMForm ? (
              <UMKMForm
                initialData={editingUMKM}
                onSubmit={handleSaveUMKM}
                onCancel={() => {
                  setShowUMKMForm(false)
                  setEditingUMKM(null)
                }}
              />
            ) : (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Kelola UMKM</CardTitle>
                  <Button onClick={() => setShowUMKMForm(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Tambah UMKM
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {umkm.map((umkmItem) => (
                      <div key={umkmItem.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{umkmItem.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {umkmItem.category} • {umkmItem.owner}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={umkmItem.featured ? "default" : "secondary"}>
                            {umkmItem.featured ? "Unggulan" : "Biasa"}
                          </Badge>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingUMKM(umkmItem)
                              setShowUMKMForm(true)
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleDeleteUMKM(umkmItem.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    {umkm.length === 0 && <p className="text-muted-foreground text-center py-8">Belum ada UMKM</p>}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="profil">
            <Card>
              <CardHeader>
                <CardTitle>Kelola Profil Desa</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div>
                    <Label htmlFor="vision">Visi Desa</Label>
                    <Textarea
                      id="vision"
                      placeholder="Masukkan visi desa"
                      value={profile.vision || ""}
                      onChange={(e) => setProfile({ ...profile, vision: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="mission">Misi Desa</Label>
                    <Textarea
                      id="mission"
                      placeholder="Masukkan misi desa"
                      value={profile.mission || ""}
                      onChange={(e) => setProfile({ ...profile, mission: e.target.value })}
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label htmlFor="history">Sejarah Desa</Label>
                    <Textarea
                      id="history"
                      placeholder="Masukkan sejarah desa"
                      value={profile.history || ""}
                      onChange={(e) => setProfile({ ...profile, history: e.target.value })}
                      rows={5}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="population">Jumlah Penduduk</Label>
                      <Input
                        id="population"
                        type="number"
                        placeholder="Jumlah penduduk"
                        value={profile.population || ""}
                        onChange={(e) => setProfile({ ...profile, population: Number.parseInt(e.target.value) || 0 })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="area_size">Luas Wilayah</Label>
                      <Input
                        id="area_size"
                        placeholder="Luas wilayah (contoh: 450 Ha)"
                        value={profile.area_size || ""}
                        onChange={(e) => setProfile({ ...profile, area_size: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="villages_count">Jumlah Dusun</Label>
                      <Input
                        id="villages_count"
                        type="number"
                        placeholder="Jumlah dusun"
                        value={profile.villages_count || ""}
                        onChange={(e) =>
                          setProfile({ ...profile, villages_count: Number.parseInt(e.target.value) || 0 })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="rw_count">Jumlah RW</Label>
                      <Input
                        id="rw_count"
                        type="number"
                        placeholder="Jumlah RW"
                        value={profile.rw_count || ""}
                        onChange={(e) => setProfile({ ...profile, rw_count: Number.parseInt(e.target.value) || 0 })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="rt_count">Jumlah RT</Label>
                      <Input
                        id="rt_count"
                        type="number"
                        placeholder="Jumlah RT"
                        value={profile.rt_count || ""}
                        onChange={(e) => setProfile({ ...profile, rt_count: Number.parseInt(e.target.value) || 0 })}
                      />
                    </div>
                  </div>
                  <Button type="submit">
                    <Save className="h-4 w-4 mr-2" />
                    Simpan Perubahan
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="galeri">
            {showGalleryForm ? (
              <GalleryUpload onSubmit={handleSaveGallery} onCancel={() => setShowGalleryForm(false)} />
            ) : (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Kelola Galeri</CardTitle>
                  <Button onClick={() => setShowGalleryForm(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Upload Foto
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {gallery.map((item) => (
                      <div key={item.id} className="border rounded-lg overflow-hidden">
                        <div className="aspect-video bg-muted">
                          {item.image ? (
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ImageIcon className="h-8 w-8 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h4 className="font-medium">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">{item.category}</p>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-muted-foreground">
                              {new Date(item.created_at).toLocaleDateString("id-ID")}
                            </span>
                            <Button size="sm" variant="outline" onClick={() => handleDeleteGallery(item.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {gallery.length === 0 && (
                      <div className="col-span-full text-center py-8">
                        <p className="text-muted-foreground">Belum ada foto di galeri</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="agenda">
            {showAgendaForm ? (
              <Card>
                <CardHeader>
                  <CardTitle>{editingAgenda ? "Edit Agenda" : "Tambah Agenda Baru"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSaveAgenda} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="agenda-title">Judul Kegiatan *</Label>
                      <Input
                        id="agenda-title"
                        value={agendaForm.title}
                        onChange={(e) => setAgendaForm({ ...agendaForm, title: e.target.value })}
                        placeholder="Masukkan judul kegiatan"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="agenda-description">Deskripsi</Label>
                      <Textarea
                        id="agenda-description"
                        value={agendaForm.description}
                        onChange={(e) => setAgendaForm({ ...agendaForm, description: e.target.value })}
                        placeholder="Deskripsi kegiatan"
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="agenda-date">Tanggal Kegiatan *</Label>
                        <Input
                          id="agenda-date"
                          type="date"
                          value={agendaForm.event_date}
                          onChange={(e) => setAgendaForm({ ...agendaForm, event_date: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="agenda-time">Waktu</Label>
                        <Input
                          id="agenda-time"
                          type="time"
                          value={agendaForm.event_time}
                          onChange={(e) => setAgendaForm({ ...agendaForm, event_time: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="agenda-location">Lokasi</Label>
                        <Input
                          id="agenda-location"
                          value={agendaForm.location}
                          onChange={(e) => setAgendaForm({ ...agendaForm, location: e.target.value })}
                          placeholder="Lokasi kegiatan"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="agenda-organizer">Penyelenggara</Label>
                        <Input
                          id="agenda-organizer"
                          value={agendaForm.organizer}
                          onChange={(e) => setAgendaForm({ ...agendaForm, organizer: e.target.value })}
                          placeholder="Penyelenggara kegiatan"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="agenda-category">Kategori</Label>
                      <Select
                        value={agendaForm.category}
                        onValueChange={(value) => setAgendaForm({ ...agendaForm, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih kategori" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Kegiatan Desa">Kegiatan Desa</SelectItem>
                          <SelectItem value="Rapat">Rapat</SelectItem>
                          <SelectItem value="Gotong Royong">Gotong Royong</SelectItem>
                          <SelectItem value="Pelatihan">Pelatihan</SelectItem>
                          <SelectItem value="Sosial">Sosial</SelectItem>
                          <SelectItem value="Budaya">Budaya</SelectItem>
                          <SelectItem value="Olahraga">Olahraga</SelectItem>
                          <SelectItem value="Lainnya">Lainnya</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex gap-4">
                      <Button type="submit">{editingAgenda ? "Update" : "Simpan"}</Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setShowAgendaForm(false)
                          setEditingAgenda(null)
                          setAgendaForm({
                            title: "",
                            description: "",
                            event_date: "",
                            event_time: "",
                            location: "",
                            organizer: "",
                            category: "Kegiatan Desa",
                          })
                        }}
                      >
                        Batal
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Kelola Agenda</CardTitle>
                  <Button onClick={() => setShowAgendaForm(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Tambah Agenda
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {agenda.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium">{item.title}</h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {new Date(item.event_date).toLocaleDateString("id-ID")}
                              {item.event_time && ` • ${item.event_time}`}
                            </span>
                            {item.location && (
                              <span className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {item.location}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{item.category}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingAgenda(item)
                              setAgendaForm({
                                title: item.title,
                                description: item.description || "",
                                event_date: item.event_date,
                                event_time: item.event_time || "",
                                location: item.location || "",
                                organizer: item.organizer || "",
                                category: item.category,
                              })
                              setShowAgendaForm(true)
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleDeleteAgenda(item.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    {agenda.length === 0 && <p className="text-muted-foreground text-center py-8">Belum ada agenda</p>}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
