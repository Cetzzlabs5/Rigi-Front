import { useRef, type DragEvent, useState } from 'react'
import { FiUpload, FiCheckCircle } from 'react-icons/fi'
import Button from '@/components/UI/Button'

interface Props {
    label: string
    file: File | null
    onFileSelect: (file: File) => void
}

export function DocumentUploadCard({ label, file, onFileSelect }: Props) {
    const inputRef = useRef<HTMLInputElement>(null)
    const [isDragging, setIsDragging] = useState(false)

    const handleFile = (file: File) => {
        onFileSelect(file)
        setIsDragging(false)
    }

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDragging(false)
        const droppedFile = e.dataTransfer.files[0]
        if (droppedFile) handleFile(droppedFile)
    }

    return (
        <div
            onDragOver={(e) => {
                e.preventDefault()
                setIsDragging(true)
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={`
                relative flex flex-col gap-4 rounded-xl p-6 cursor-pointer transition-all
                border-2 border-dashed
                ${isDragging
                    ? 'border-primary-600 bg-primary-50'
                    : file
                        ? 'border-success bg-success/5'
                        : 'border-border hover:border-primary-400 hover:bg-primary-50/50'
                }
            `}
        >
            <div className="flex items-center gap-3">
                {file ? (
                    <FiCheckCircle className="text-success size-6" />
                ) : (
                    <FiUpload className="text-primary-700 size-6" />
                )}

                <h3 className="text-body font-medium text-main">
                    {label}
                </h3>
            </div>

            {!file ? (
                <p className="text-body-sm text-muted">
                    Arrastrá un archivo o hacé click para seleccionarlo
                </p>
            ) : (
                <div className="flex flex-col gap-2">
                    <p className="text-body-sm text-main truncate">
                        {file.name}
                    </p>

                    <Button
                        variant="tertiary"
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation()
                            inputRef.current?.click()
                        }}
                    >
                        Reemplazar archivo
                    </Button>
                </div>
            )}

            <input
                ref={inputRef}
                type="file"
                hidden
                onChange={(e) => {
                    const selectedFile = e.target.files?.[0]
                    if (selectedFile) handleFile(selectedFile)
                }}
            />
        </div>
    )
}
