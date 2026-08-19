'use client'

import { useState, useRef } from 'react'
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { Input } from './form'

interface ImageUploadProps {
  value: string[]
  onChange: (urls: string[]) => void
  bucket?: string
  folder?: string
  maxFiles?: number
}

export function ImageUpload({ value = [], onChange, bucket = 'products', folder = 'images', maxFiles = 5 }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const uploadFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Chỉ chấp nhận file ảnh')
      return null
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Kích thước tối đa 5MB')
      return null
    }

    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`
    const filePath = `${folder}/${fileName}`

    const { error: uploadErr } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, { upsert: true })

    if (uploadErr) {
      setError(uploadErr.message)
      return null
    }

    const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(filePath)
    return publicUrl
  }

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return
    setError(null)
    setUploading(true)

    const remaining = maxFiles - value.length
    const filesToUpload = Array.from(files).slice(0, remaining)

    const urls: string[] = []
    for (const file of filesToUpload) {
      const url = await uploadFile(file)
      if (url) urls.push(url)
    }

    onChange([...value, ...urls])
    setUploading(false)
  }

  const removeImage = (idx: number) => {
    onChange(value.filter((_, i) => i !== idx))
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {value.map((url, idx) => (
          <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-neutral-200 group">
            <img src={url} alt="" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => removeImage(idx)}
              className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-3 h-3" />
            </button>
            {idx === 0 && (
              <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-[#e30019] text-white text-[10px] rounded">
                Ảnh chính
              </span>
            )}
          </div>
        ))}

        {value.length < maxFiles && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="aspect-square rounded-lg border-2 border-dashed border-neutral-300 hover:border-[#e30019] flex flex-col items-center justify-center gap-1 text-neutral-500 hover:text-[#e30019] transition-colors disabled:opacity-50"
          >
            {uploading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <>
                <Upload className="w-6 h-6" />
                <span className="text-xs">Tải ảnh lên</span>
              </>
            )}
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => handleFiles(e.target.files)}
        className="hidden"
      />

      <p className="text-xs text-neutral-500">
        Tối đa {maxFiles} ảnh, mỗi ảnh ≤ 5MB. Hỗ trợ JPG, PNG, WebP
      </p>

      {error && <p className="text-xs text-red-500">{error}</p>}

      {/* Manual URL input */}
      <details className="text-xs">
        <summary className="cursor-pointer text-neutral-500 hover:text-neutral-700">Hoặc nhập URL ảnh</summary>
        <Input
          placeholder="https://example.com/image.jpg"
          className="mt-2"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              const url = (e.target as HTMLInputElement).value.trim()
              if (url && value.length < maxFiles) {
                onChange([...value, url])
                ;(e.target as HTMLInputElement).value = ''
              }
            }
          }}
        />
      </details>
    </div>
  )
}