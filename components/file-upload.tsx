"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Upload, X, FileText, ImageIcon, CheckCircle2, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileUploadProps {
  accept?: string
  maxSize?: number // in MB
  maxFiles?: number
  multiple?: boolean
  onFilesChange?: (files: File[]) => void
  className?: string
}

interface UploadedFile {
  file: File
  progress: number
  status: "uploading" | "success" | "error"
  error?: string
}

export function FileUpload({
  accept = ".pdf,.jpg,.jpeg,.png",
  maxSize = 10,
  maxFiles = 5,
  multiple = false,
  onFilesChange,
  className,
}: FileUploadProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isDragging, setIsDragging] = useState(false)

  const validateFile = (file: File): string | null => {
    const maxSizeBytes = maxSize * 1024 * 1024
    if (file.size > maxSizeBytes) {
      return `File size exceeds ${maxSize}MB limit`
    }

    const acceptedTypes = accept.split(",").map((type) => type.trim())
    const fileExtension = `.${file.name.split(".").pop()?.toLowerCase()}`
    const isAccepted = acceptedTypes.some((type) => type === fileExtension || type === file.type || type === "*")

    if (!isAccepted) {
      return `File type not accepted. Accepted types: ${accept}`
    }

    return null
  }

  const simulateUpload = (file: File, index: number) => {
    // Simulate upload progress
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 30
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
        setUploadedFiles((prev) =>
          prev.map((f, i) => (i === index ? { ...f, progress: 100, status: "success" as const } : f)),
        )
      } else {
        setUploadedFiles((prev) => prev.map((f, i) => (i === index ? { ...f, progress } : f)))
      }
    }, 300)
  }

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files) return

      const newFiles = Array.from(files).slice(0, multiple ? maxFiles : 1)

      const validatedFiles: UploadedFile[] = []
      for (const file of newFiles) {
        const error = validateFile(file)
        if (error) {
          validatedFiles.push({
            file,
            progress: 0,
            status: "error",
            error,
          })
        } else {
          validatedFiles.push({
            file,
            progress: 0,
            status: "uploading",
          })
        }
      }

      setUploadedFiles((prev) => {
        const combined = multiple ? [...prev, ...validatedFiles] : validatedFiles
        return combined.slice(0, maxFiles)
      })

      // Simulate upload for valid files
      validatedFiles.forEach((uploadFile, index) => {
        if (uploadFile.status === "uploading") {
          simulateUpload(uploadFile.file, uploadedFiles.length + index)
        }
      })

      // Notify parent component
      if (onFilesChange) {
        const allFiles = multiple
          ? [...uploadedFiles.map((uf) => uf.file), ...validatedFiles.map((vf) => vf.file)]
          : validatedFiles.map((vf) => vf.file)
        onFilesChange(allFiles.slice(0, maxFiles))
      }
    },
    [uploadedFiles, multiple, maxFiles, onFilesChange],
  )

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setIsDragging(false)
      handleFiles(e.dataTransfer.files)
    },
    [handleFiles],
  )

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
    if (onFilesChange) {
      const updatedFiles = uploadedFiles.filter((_, i) => i !== index).map((uf) => uf.file)
      onFilesChange(updatedFiles)
    }
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) {
      return <ImageIcon className="size-5 text-primary" />
    }
    return <FileText className="size-5 text-primary" />
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          "relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30 p-8 transition-colors hover:border-primary/50 hover:bg-muted/50",
          isDragging && "border-primary bg-primary/5",
        )}
      >
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => handleFiles(e.target.files)}
          className="absolute inset-0 cursor-pointer opacity-0"
        />
        <Upload className="size-10 text-muted-foreground" />
        <p className="mt-4 text-sm font-medium text-center">Drag and drop files here, or click to browse</p>
        <p className="mt-1 text-xs text-muted-foreground text-center">
          {accept.split(",").join(", ")} up to {maxSize}MB
          {multiple && ` (max ${maxFiles} files)`}
        </p>
      </div>

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          {uploadedFiles.map((uploadedFile, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="flex items-center gap-3 p-3">
                <div className="shrink-0">{getFileIcon(uploadedFile.file)}</div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-medium">{uploadedFile.file.name}</p>
                    <Button variant="ghost" size="sm" onClick={() => removeFile(index)} className="size-8 shrink-0 p-0">
                      <X className="size-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-muted-foreground">
                      {(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    {uploadedFile.status === "success" && (
                      <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                        <CheckCircle2 className="size-3" />
                        <span>Uploaded</span>
                      </div>
                    )}
                    {uploadedFile.status === "error" && (
                      <div className="flex items-center gap-1 text-xs text-destructive">
                        <AlertCircle className="size-3" />
                        <span>{uploadedFile.error}</span>
                      </div>
                    )}
                  </div>
                  {uploadedFile.status === "uploading" && (
                    <Progress value={uploadedFile.progress} className="mt-2 h-1" />
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
