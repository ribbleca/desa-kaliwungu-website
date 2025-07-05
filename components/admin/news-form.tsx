"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ImageUpload } from "@/components/image-upload"
import { useToast } from "@/hooks/use-toast"
import type { FormEvent } from "react"

interface NewsFormProps {
  initialData?: {
    id?: number
    title: string
    content: string
    excerpt: string
    category: string
    image?: string
    published: boolean
  }
  onSubmit: (data: any) => void
  onCancel: () => void
}

export function NewsForm({ initialData, onSubmit, onCancel }: NewsFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    content: initialData?.content || "",
    excerpt: initialData?.excerpt || "",
    category: initialData?.category || "Umum",
    image: initialData?.image || "",
    published: initialData?.published || false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const categories = ["Umum", "Pembangunan", "Ekonomi", "Sosial", "Budaya", "Kesehatan", "Pendidikan", "Lingkungan"]

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.content) {
      toast({
        title: "Error",
        description: "Title and content are required",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit(formData)
      toast({
        title: "Success",
        description: initialData?.id ? "News updated successfully" : "News created successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save news",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{initialData?.id ? "Edit Berita" : "Tambah Berita Baru"}</CardTitle>
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
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih kategori" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <ImageUpload
            currentImage={formData.image}
            onImageUploaded={(url) => setFormData({ ...formData, image: url })}
            folder="news"
            maxSize={5}
          />

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
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Menyimpan..." : initialData?.id ? "Update" : "Simpan"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Batal
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
