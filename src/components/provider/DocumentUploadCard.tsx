import { useRef, type DragEvent, useState } from 'react'

import { FiUpload, FiCheckCircle, FiClock, FiLoader, FiXCircle, FiAlertCircle } from 'react-icons/fi'
import { MdErrorOutline } from 'react-icons/md'

import Button from '@/components/UI/Button'
import { StatusBadge } from '@/components/UI/StatusBadge'
import type { DocumentMetadata, DocumentStatus } from '@/types/documentType'
import { formatFileSize } from '@/utils/fileValidation'

interface Props {
    label: string
    status: DocumentStatus
    file: File | null
    metadata: DocumentMetadata
    onFileSelect: (file: File) => void
    onVerify?: () => void
    disabled?: boolean
    validationError?: string
}

export function DocumentUploadCard({
    label,
    status,
    file,
    metadata,
    onFileSelect,
    onVerify,
    disabled = false,
    validationError,
}: Props) {
    const inputRef = useRef<HTMLInputElement>(null)
    const [isDragging, setIsDragging] = useState(false)

    const isUploading = status === 'uploading'
    const isDisabled = disabled || isUploading
    const canVerify = file && status === 'not_uploaded' && !validationError && onVerify

    const handleFile = (file: File) => {
        if (isDisabled) return
        onFileSelect(file)
        setIsDragging(false)
    }

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDragging(false)
        if (isDisabled) return
        const droppedFile = e.dataTransfer.files[0]
        if (droppedFile) handleFile(droppedFile)
    }

    const getBorderColor = () => {
        if (isDragging) return 'border-primary-600 bg-primary-50'
        if (status === 'verified') return 'border-success bg-success/5'
        if (status === 'rejected') return 'border-error bg-error/5'
        if (status === 'pending') return 'border-warning bg-warning/5'
        if (file) return 'border-primary-400 bg-primary-50/50'
        return 'border-border hover:border-primary-400 hover:bg-primary-50/50'
    }

    return (
        <div
            onDragOver={(e) => {
                e.preventDefault()
                if (!isDisabled) setIsDragging(true)
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => !isDisabled && !file && inputRef.current?.click()}
            className={`relative flex flex-col justify-between gap-4 rounded-xl p-6 transition-all border-2 border-dashed ${getBorderColor()} ${isDisabled ? 'cursor-not-allowed opacity-60' : file ? '' : 'cursor-pointer'}`}
        >
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 flex-1">
                    {status === 'verified' ? (
                        <FiCheckCircle className="text-success size-6 shrink-0" />
                    ) : status === 'rejected' ? (
                        <FiXCircle className="text-error size-6 shrink-0" />
                    ) : status === 'uploading' ? (
                        <FiLoader className="text-primary-700 size-6 shrink-0 animate-spin" />
                    ) : status === 'pending' ? (
                        <FiClock className="text-warning size-6 shrink-0" />
                    ) : (
                        <FiUpload className="text-primary-700 size-6 shrink-0" />
                    )}

                    <h3 className="text-body font-medium text-main">{label}</h3>
                </div>

                <StatusBadge status={status} />
            </div>

            {!file && status === 'not_uploaded' ? (
                <p className="text-body-sm text-muted">
                    Arrastrá un archivo PDF o hacé click para seleccionarlo
                </p>
            ) : file || metadata.fileName ? (
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <p className="text-body-sm text-main truncate flex-1">
                            {metadata.fileName || file?.name}
                        </p>
                        {(metadata.fileSize || file?.size) && (
                            <span className="text-caption text-muted ml-2">
                                {formatFileSize(metadata.fileSize || file!.size)}
                            </span>
                        )}
                    </div>

                    {metadata.uploadedAt && (
                        <p className="text-caption text-muted">
                            Subido: {new Date(metadata.uploadedAt).toLocaleDateString('es-AR')}
                        </p>
                    )}

                    <div className="flex gap-2">
                        {canVerify && (
                            <Button
                                variant="primary"
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    onVerify()
                                }}
                                className="flex-1"
                            >
                                Verificar
                            </Button>
                        )}

                        {(status === 'not_uploaded' || status === 'rejected') && !isUploading && (
                            <Button
                                variant={canVerify ? 'secondary' : 'tertiary'}
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    inputRef.current?.click()
                                }}
                                disabled={isDisabled}
                                className={canVerify ? '' : 'flex-1'}
                            >
                                {status === 'rejected' ? 'Cambiar archivo' : 'Reemplazar archivo'}
                            </Button>
                        )}
                    </div>
                </div>
            ) : null}

            {validationError && (
                <div className="flex items-center gap-2 p-3 bg-error/10 border border-error/20 rounded-md">
                    <FiAlertCircle className="text-error size-5 shrink-0 mt-0.5" />
                    <p className="text-caption text-error">{validationError}</p>
                </div>
            )}

            {status === 'rejected' && metadata.rejectionReason && (
                <div className="flex items-center gap-2 p-3 bg-error/10 border border-error/20 rounded-md">
                    <MdErrorOutline className="text-error size-5 shrink-0 mt-0.5" />
                    <p className="text-caption text-error">{metadata.rejectionReason}</p>
                </div>
            )}

            <input
                ref={inputRef}
                type="file"
                accept=".pdf,application/pdf"
                hidden
                disabled={isDisabled}
                onChange={(e) => {
                    const selectedFile = e.target.files?.[0]
                    if (selectedFile) handleFile(selectedFile)
                    e.target.value = ''
                }}
            />
        </div>
    )
}
