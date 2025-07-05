"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ImageUpload } from "@/components/image-upload"
import { useToast } from "@/hooks/use-toast"
import type { FormEvent } from "react"

interface GalleryUploadProps {
  onSubmit: (data: any) => void
  onCancel: () => void
}

export function GalleryUpload({ onSubmit, onCancel }: GalleryUploadProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Kegiatan",
    image: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const categories = ["Kegiatan", "Pembangunan", "Alam", "Budaya", "UMKM", "Fasilitas", "Lainnya"]

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.image) {
      toast({
        title: "Error",
        description: "Title and image are required",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit(formData)
      toast({
        title: "Success",
        description: "Image uploaded to gallery successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload to gallery",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload ke Galeri</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Judul Foto *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Judul atau nama foto"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Deskripsi foto (opsional)"
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
            folder="gallery"
            maxSize={10}
          />

          <div className="flex gap-4">
            <Button type="submit" disabled={isSubmitting || !formData.image}>
              {isSubmitting ? "Mengupload..." : "Upload ke Galeri"}
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
