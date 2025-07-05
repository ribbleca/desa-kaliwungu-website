"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, X, ImageIcon } from "lucide-react"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"
import type { ChangeEvent } from "react"

interface ImageUploadProps {
  onImageUploaded: (url: string) => void
  currentImage?: string
  folder?: string
  maxSize?: number // in MB
}

export function ImageUpload({ onImageUploaded, currentImage, folder = "general", maxSize = 5 }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(currentImage || null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFileSelect = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Error",
        description: "Please select an image file",
        variant: "destructive",
      })
      return
    }

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      toast({
        title: "Error",
        description: `File size must be less than ${maxSize}MB`,
        variant: "destructive",
      })
      return
    }

    setUploading(true)

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("folder", folder)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Upload failed")
      }

      const { url } = await response.json()
      setPreview(url)
      onImageUploaded(url)

      toast({
        title: "Success",
        description: "Image uploaded successfully",
      })
    } catch (error) {
      console.error("Upload error:", error)
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = () => {
    setPreview(null)
    onImageUploaded("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-4">
      <Label>Upload Image</Label>

      {preview ? (
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <div className="relative h-48 w-full rounded-lg overflow-hidden">
                <Image src={preview || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
              </div>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={handleRemove}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-dashed border-2 border-muted-foreground/25">
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center space-y-4">
              <ImageIcon className="h-12 w-12 text-muted-foreground" />
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Click to upload or drag and drop</p>
                <p className="text-xs text-muted-foreground">PNG, JPG, WEBP up to {maxSize}MB</p>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
              >
                <Upload className="h-4 w-4 mr-2" />
                {uploading ? "Uploading..." : "Choose File"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
    </div>
  )
}
