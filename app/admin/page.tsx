"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { FileText, Users, Building, Calendar, Plus, Edit, Trash2, Save, Loader2 } from "lucide-react"
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

  // Data states
  const [news, setNews] = useState<NewsItem[]>([])
  const [umkm, setUmkm] = useState<UMKMItem[]>([])
  const [profile, setProfile] = useState<VillageProfile>({})
  const [statistics, setStatistics] = useState<Statistics>({ news: 0, umkm: 0, gallery: 0, agenda: 0 })

  // Form states
  const [showNewsForm, setShowNewsForm] = useState(false)
  const [showUMKMForm, setShowUMKMForm] = useState(false)
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null)
  const [editingUMKM, setEditingUMKM] = useState<UMKMItem | null>(null)

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
        alert("Login berhasil!")
      } else {
        alert("Email atau password salah!")
      }
    } catch (error) {
      alert("Terjadi kesalahan saat login")
    } finally {
      setLoginLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth", { method: "DELETE" })
      setUser(null)
      alert("Logout berhasil!")
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
          alert("Berita berhasil diupdate")
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
          alert("Berita berhasil ditambahkan")
        }
      }

      setShowNewsForm(false)
      setEditingNews(null)
      loadData() // Refresh statistics
    } catch (error) {
      alert("Gagal menyimpan berita")
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
          alert("Berita berhasil dihapus")
          loadData() // Refresh statistics
        }
      } catch (error) {
        alert("Gagal menghapus berita")
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
          alert("UMKM berhasil diupdate")
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
          alert("UMKM berhasil ditambahkan")
        }
      }

      setShowUMKMForm(false)
      setEditingUMKM(null)
      loadData() // Refresh statistics
    } catch (error) {
      alert("Gagal menyimpan UMKM")
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
          alert("UMKM berhasil dihapus")
          loadData() // Refresh statistics
        }
      } catch (error) {
        alert("Gagal menghapus UMKM")
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
        alert("Profil desa berhasil disimpan")
      }
    } catch (error) {
      alert("Gagal menyimpan profil desa")
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
    { title: "Foto Galeri", value: statistics.gallery.toString(), icon: Calendar, color: "text-purple-600" },
    { title: "Agenda Kegiatan", value: statistics.agenda.toString(), icon: Users, color: "text-orange-600" },
  ]

  return (
    <div className="min-h-screen bg-muted/50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container flex items-center justify-between h-16">
          <h1 className="text-xl font-bold">Admin Dashboard - Database Real</h1>
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
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="berita">Berita</TabsTrigger>
            <TabsTrigger value="umkm">UMKM</TabsTrigger>
            <TabsTrigger value="profil">Profil</TabsTrigger>
            <TabsTrigger value="galeri">Galeri</TabsTrigger>
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
                          <p className="text-sm text-muted-foreground">{umkmItem.category}</p>
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
                  <CardTitle>Kelola Berita (Database Real)</CardTitle>
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
                  <CardTitle>Kelola UMKM (Database Real)</CardTitle>
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
                <CardTitle>Kelola Profil Desa (Database Real)</CardTitle>
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
                  <Button type="submit">
                    <Save className="h-4 w-4 mr-2" />
                    Simpan Perubahan
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="galeri">
            <Card>
              <CardHeader>
                <CardTitle>Kelola Galeri (Database Real)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Fitur galeri dengan database real akan segera tersedia.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

// News Form Component
function NewsForm({
  initialData,
  onSubmit,
  onCancel,
}: {
  initialData: NewsItem | null
  onSubmit: (data: Omit<NewsItem, "id" | "created_at">) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    content: initialData?.content || "",
    excerpt: initialData?.excerpt || "",
    category: initialData?.category || "Umum",
    published: initialData?.published || false,
  })

  const categories = ["Umum", "Pembangunan", "Ekonomi", "Sosial", "Budaya", "Kesehatan", "Pendidikan", "Lingkungan"]

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{initialData ? "Edit Berita" : "Tambah Berita Baru"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Judul Berita *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Masukkan judul berita"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Ringkasan</Label>
            <Textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              placeholder="Ringkasan singkat berita"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Kategori</Label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full p-2 border rounded-md"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Konten Berita *</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Tulis konten berita lengkap di sini"
              rows={10}
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="published"
              checked={formData.published}
              onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
            />
            <Label htmlFor="published">Publikasikan berita</Label>
          </div>

          <div className="flex gap-4">
            <Button type="submit">{initialData ? "Update" : "Simpan"}</Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Batal
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

// UMKM Form Component
function UMKMForm({
  initialData,
  onSubmit,
  onCancel,
}: {
  initialData: UMKMItem | null
  onSubmit: (data: Omit<UMKMItem, "id">) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    category: initialData?.category || "Makanan & Minuman",
    owner: initialData?.owner || "",
    phone: initialData?.phone || "",
    address: initialData?.address || "",
    featured: initialData?.featured || false,
  })

  const categories = ["Makanan & Minuman", "Kerajinan", "Fashion", "Pertanian", "Jasa", "Teknologi", "Lainnya"]

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{initialData ? "Edit UMKM" : "Tambah UMKM Baru"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama UMKM *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Nama usaha"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="owner">Nama Pemilik</Label>
              <Input
                id="owner"
                value={formData.owner}
                onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                placeholder="Nama pemilik usaha"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Deskripsi produk atau layanan"
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Kategori</Label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-2 border rounded-md"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Nomor Telepon</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="08xx-xxxx-xxxx"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Alamat</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Alamat lengkap usaha"
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="featured"
              checked={formData.featured}
              onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
            />
            <Label htmlFor="featured">Jadikan UMKM unggulan</Label>
          </div>

          <div className="flex gap-4">
            <Button type="submit">{initialData ? "Update" : "Simpan"}</Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Batal
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
