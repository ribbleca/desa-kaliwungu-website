import { put, del, list } from "@vercel/blob"

export async function uploadImage(file: File, folder = "general"): Promise<string> {
  try {
    const filename = `${folder}/${Date.now()}-${file.name}`
    const blob = await put(filename, file, {
      access: "public",
    })
    return blob.url
  } catch (error) {
    console.error("Error uploading image:", error)
    throw new Error("Failed to upload image")
  }
}

export async function deleteImage(url: string): Promise<void> {
  try {
    await del(url)
  } catch (error) {
    console.error("Error deleting image:", error)
    throw new Error("Failed to delete image")
  }
}

export async function listImages(folder?: string) {
  try {
    const { blobs } = await list({
      prefix: folder,
    })
    return blobs
  } catch (error) {
    console.error("Error listing images:", error)
    throw new Error("Failed to list images")
  }
}
