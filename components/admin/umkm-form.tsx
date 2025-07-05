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

interface UMKMFormProps {
  initialData?: {
    id?: number
    name: string
    description: string
    category: string
    owner: string
    phone: string
    address: string
    image?: string
    featured: boolean
  }
  onSubmit: (data: any) => void
  onCancel: () => void
}

export function UMKMForm({ initialData, onSubmit, onCancel }: UMKMFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    category: initialData?.category || "Makanan & Minuman",
    owner: initialData?.owner || "",
    phone: initialData?.phone || "",
    address: initialData?.address || "",
    image: initialData?.image || "",
    featured: initialData?.featured || false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const categories = ["Makanan & Minuman", "Kerajinan", "Fashion", "Pertanian", "Jasa", "Teknologi", "Lainnya"]

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.description) {
      toast({
        title: "Error",
        description: "Name and description are required",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit(formData)
      toast({
        title: "Success",
        description: initialData?.id ? "UMKM updated successfully" : "UMKM created successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save UMKM",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{initialData?.id ? "Edit UMKM" : "Tambah UMKM Baru"}</CardTitle>
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
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
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

          <ImageUpload
            currentImage={formData.image}
            onImageUploaded={(url) => setFormData({ ...formData, image: url })}
            folder="umkm"
            maxSize={5}
          />

          <div className="flex items-center space-x-2">
            <Switch
              id="featured"
              checked={formData.featured}
              onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
            />
            <Label htmlFor="featured">Jadikan UMKM unggulan</Label>
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
