"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { FileText, ImageIcon, Calendar, Building, Plus, Edit, Trash2, Eye } from "lucide-react"
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
  category: string
  published: boolean
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
  const [showNewsForm, setShowNewsForm] = useState(false)
  const [showUMKMForm, setShowUMKMForm] = useState(false)
  const [showGalleryForm, setShowGalleryForm] = useState(false)
  const [editingNews, setEditingNews] = useState(null)
  const [editingUMKM, setEditingUMKM] = useState(null)
  const [news, setNews] = useState<NewsItem[]>([])
  const [statistics, setStatistics] = useState<Statistics>({ news: 0, umkm: 0, gallery: 0, agenda: 0 })
  const { toast } = useToast()

  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    if (user) {
      fetchData()
    }
  }, [user])

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/me")
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

  const fetchData = async () => {
    try {
      // Fetch news
      const newsResponse = await fetch("/api/news")
      if (newsResponse.ok) {
        const newsData = await newsResponse.json()
        setNews(newsData.slice(0, 5)) // Show latest 5 news
      }

      // Fetch statistics
      const statsResponse = await fetch("/api/statistics")
      if (statsResponse.ok) {
        const statsData = await statsResponse.json()
        setStatistics(statsData)
      }
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch("/api/auth/login", {
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
          title: "Berhasil",
          description: "Login berhasil!",
        })
      } else {
        toast({
          title: "Error",
          description: "Email atau password salah!",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat login",
        variant: "destructive",
      })
    }
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      setUser(null)
      toast({
        title: "Berhasil",
        description: "Logout berhasil!",
      })
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const handleDeleteNews = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus berita ini?")) return

    try {
      const response = await fetch(`/api/news/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setNews(news.filter((item) => item.id !== id))
        toast({
          title: "Berhasil",
          description: "Berita berhasil dihapus",
        })
      } else {
        throw new Error("Failed to delete news")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menghapus berita",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
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
              <Button type="submit" className="w-full">
                Masuk
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
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
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
            <TabsTrigger value="galeri">Galeri</TabsTrigger>
            <TabsTrigger value="agenda">Agenda</TabsTrigger>
            <TabsTrigger value="profil">Profil</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Berita Terbaru</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {news.map((newsItem) => (
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
                  <CardTitle>Statistik Pengunjung</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Hari ini</span>
                      <span className="font-bold">1,234</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Minggu ini</span>
                      <span className="font-bold">8,567</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Bulan ini</span>
                      <span className="font-bold">34,892</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Total</span>
                      <span className="font-bold">156,789</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="berita">
            {showNewsForm ? (
              <NewsForm
                initialData={editingNews}
                onSubmit={async (data) => {
                  try {
                    const url = editingNews ? `/api/news/${editingNews.id}` : "/api/news"
                    const method = editingNews ? "PUT" : "POST"

                    const response = await fetch(url, {
                      method,
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(data),
                    })

                    if (response.ok) {
                      setShowNewsForm(false)
                      setEditingNews(null)
                      fetchData() // Refresh data
                      toast({
                        title: "Berhasil",
                        description: editingNews ? "Berita berhasil diupdate" : "Berita berhasil dibuat",
                      })
                    } else {
                      throw new Error("Failed to save news")
                    }
                  } catch (error) {
                    toast({
                      title: "Error",
                      description: "Gagal menyimpan berita",
                      variant: "destructive",
                    })
                  }
                }}
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
                          <Button size="sm" variant="outline" asChild>
                            <a href={`/berita/${newsItem.id}`} target="_blank" rel="noreferrer">
                              <Eye className="h-4 w-4" />
                            </a>
                          </Button>
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
                onSubmit={async (data) => {
                  try {
                    const url = editingUMKM ? `/api/umkm/${editingUMKM.id}` : "/api/umkm"
                    const method = editingUMKM ? "PUT" : "POST"

                    const response = await fetch(url, {
                      method,
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(data),
                    })

                    if (response.ok) {
                      setShowUMKMForm(false)
                      setEditingUMKM(null)
                      fetchData() // Refresh data
                      toast({
                        title: "Berhasil",
                        description: editingUMKM ? "UMKM berhasil diupdate" : "UMKM berhasil dibuat",
                      })
                    } else {
                      throw new Error("Failed to save UMKM")
                    }
                  } catch (error) {
                    toast({
                      title: "Error",
                      description: "Gagal menyimpan UMKM",
                      variant: "destructive",
                    })
                  }
                }}
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
                  <p className="text-muted-foreground">Fitur kelola UMKM dengan database terintegrasi</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="galeri">
            {showGalleryForm ? (
              <GalleryUpload
                onSubmit={async (data) => {
                  try {
                    const response = await fetch("/api/gallery", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(data),
                    })

                    if (response.ok) {
                      setShowGalleryForm(false)
                      fetchData() // Refresh data
                      toast({
                        title: "Berhasil",
                        description: "Foto berhasil ditambahkan ke galeri",
                      })
                    } else {
                      throw new Error("Failed to save gallery item")
                    }
                  } catch (error) {
                    toast({
                      title: "Error",
                      description: "Gagal menambahkan foto ke galeri",
                      variant: "destructive",
                    })
                  }
                }}
                onCancel={() => setShowGalleryForm(false)}
              />
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
                  <p className="text-muted-foreground">Fitur kelola galeri dengan upload ke Vercel Blob</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="agenda">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Kelola Agenda</CardTitle>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah Agenda
                </Button>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Fitur kelola agenda dengan database terintegrasi</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profil">
            <Card>
              <CardHeader>
                <CardTitle>Kelola Profil Desa</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="visi">Visi Desa</Label>
                    <Input id="visi" placeholder="Masukkan visi desa" />
                  </div>
                  <div>
                    <Label htmlFor="misi">Misi Desa</Label>
                    <Input id="misi" placeholder="Masukkan misi desa" />
                  </div>
                  <Button>Simpan Perubahan</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
