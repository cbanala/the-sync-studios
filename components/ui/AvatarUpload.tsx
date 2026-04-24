'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'

interface AvatarUploadProps {
  currentUrl: string
  name: string
  onChange: (file: File) => void
}

export default function AvatarUpload({ currentUrl, name, onChange }: AvatarUploadProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    onChange(file)
    setPreview(URL.createObjectURL(file))
  }

  const displayUrl = preview || currentUrl || null

  return (
    <div className="flex items-center gap-5">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        aria-label="Upload profile photo"
        className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0 group focus:outline-none focus:ring-2"
        style={{ border: '2px solid rgba(237,224,196,0.4)' }}
      >
        {displayUrl ? (
          <Image
            src={displayUrl}
            alt={name}
            fill
            className="object-cover"
            unoptimized={displayUrl.startsWith('blob:')}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-2xl font-bold text-white"
            style={{ background: 'rgba(237,224,196,0.1)' }}
          >
            {name[0]?.toUpperCase() ?? '?'}
          </div>
        )}
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-white text-xs font-semibold">Change</span>
        </div>
      </button>

      <div>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="text-sm hover:opacity-80 transition-opacity"
          style={{ color: 'var(--color-cream)' }}
        >
          Upload photo
        </button>
        <p className="text-xs text-slate-600 mt-0.5">JPG, PNG or WebP — max 2 MB</p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleChange}
        className="sr-only"
        aria-hidden="true"
        tabIndex={-1}
      />
    </div>
  )
}
