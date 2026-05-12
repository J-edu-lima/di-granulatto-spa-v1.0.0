"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { Upload, X, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ImageUploadProps {
  value?: string
  onChange: (url: string) => void
  className?: string
  aspectRatio?: "square" | "video" | "banner"
}

export function ImageUpload({ value, onChange, className, aspectRatio = "square" }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const aspectClasses = {
    square: "aspect-square",
    video: "aspect-video",
    banner: "aspect-[2/1]",
  }

  const handleFileChange = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      return
    }

    setIsLoading(true)

    // Simula upload - em producao, integrar com API de upload
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      onChange(result)
      setIsLoading(false)
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    if (file) {
      handleFileChange(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleClick = () => {
    inputRef.current?.click()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileChange(file)
    }
  }

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange("")
  }

  return (
    <div className={cn("relative", className)}>
      <input ref={inputRef} type="file" accept="image/*" onChange={handleInputChange} className="sr-only" />

      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          "relative cursor-pointer overflow-hidden rounded-lg border-2 border-dashed transition-colors",
          aspectClasses[aspectRatio],
          isDragging ? "border-primary bg-primary/5" : "border-[var(--border)] hover:border-primary/50",
          isLoading && "pointer-events-none opacity-50",
        )}
      >
        {value ? (
          <>
            <Image src={value || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
            <div className="absolute inset-0 flex items-center justify-center bg-foreground/0 opacity-0 transition-opacity hover:bg-foreground/30 hover:opacity-100">
              <Button type="button" variant="secondary" size="sm" onClick={handleRemove} className="gap-2">
                <X className="h-4 w-4" />
                Remover
              </Button>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
            {isLoading ? (
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            ) : (
              <>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                  {isDragging ? (
                    <Upload className="h-6 w-6 text-primary" />
                  ) : (
                    <ImageIcon className="h-6 w-6 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {isDragging ? "Solte a imagem aqui" : "Clique ou arraste uma imagem"}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">PNG, JPG ou WEBP</p>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
