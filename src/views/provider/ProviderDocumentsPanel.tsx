import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'

import { DocumentUploadCard } from '../../components/provider/DocumentUploadCard'
import Button from '@/components/UI/Button'
import { useNavigate } from 'react-router'
import { useAuth } from '@/hooks/useAuth'
import { uploadDocument } from '@/services/DocumentAPI'
import type { DocumentType, ProviderDocument } from '@/types/documentType'
import { validateDocumentFile } from '@/utils/fileValidation'

const INITIAL_DOCUMENTS: ProviderDocument[] = [
    {
        type: 'AFIP',
        label: 'Constancia de Inscripción AFIP',
        status: 'not_uploaded',
        file: null,
        metadata: {},
    },
    {
        type: 'DGR_SALTA',
        label: 'Constancia de Inscripción DGR Salta',
        status: 'not_uploaded',
        file: null,
        metadata: {},
    },
    {
        type: 'F931',
        label: 'Formulario F.931',
        status: 'not_uploaded',
        file: null,
        metadata: {},
    },
]

export default function ProviderDocumentsPanel() {
    const { data: auth } = useAuth()
    const navigate = useNavigate()
    const [documents, setDocuments] = useState<ProviderDocument[]>(INITIAL_DOCUMENTS)
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
    const [globalError, setGlobalError] = useState<string>('')

    const uploadMutation = useMutation({
        mutationFn: ({ documentType, file }: { documentType: DocumentType; file: File }) => {
            if (!auth?.id) {
                throw new Error('No se encontró el ID del proveedor')
            }
            return uploadDocument({ providerId: auth.id, documentType, file })
        },
        onSuccess: (data, { documentType }) => {
            setDocuments((prev) =>
                prev.map((doc) =>
                    doc.type === documentType
                        ? {
                            ...doc,
                            status: data.status,
                            file: null,
                            metadata: {
                                id: data.id,
                                fileName: data.fileName,
                                fileSize: data.fileSize,
                                uploadedAt: data.uploadedAt,
                                rejectionReason: data.rejectionReason,
                            },
                        }
                        : doc
                )
            )
            setValidationErrors((prev) => {
                const newErrors = { ...prev }
                delete newErrors[documentType]
                return newErrors
            })
            setGlobalError('')
        },
        onError: (error: Error, { documentType }) => {
            setDocuments((prev) =>
                prev.map((doc) =>
                    doc.type === documentType
                        ? { ...doc, status: 'not_uploaded', file: doc.file, metadata: {} }
                        : doc
                )
            )
            setGlobalError(error.message)
        },
    })

    const handleFileChange = (type: DocumentType, file: File) => {
        const validation = validateDocumentFile(file)
        if (!validation.valid) {
            setValidationErrors((prev) => ({
                ...prev,
                [type]: validation.error!,
            }))
            return
        }

        setValidationErrors((prev) => {
            const newErrors = { ...prev }
            delete newErrors[type]
            return newErrors
        })

        setDocuments((prev) =>
            prev.map((doc) =>
                doc.type === type
                    ? {
                        ...doc,
                        file,
                        status: 'not_uploaded',
                        metadata: {
                            fileName: file.name,
                            fileSize: file.size,
                        },
                    }
                    : doc
            )
        )
    }

    const handleVerify = (type: DocumentType) => {
        const document = documents.find((doc) => doc.type === type)
        if (!document?.file) return

        // Actualizar el estado a 'uploading' antes de la mutación
        setDocuments((prev) =>
            prev.map((doc) =>
                doc.type === type
                    ? { ...doc, status: 'uploading' as const }
                    : doc
            )
        )

        uploadMutation.mutate({ documentType: type, file: document.file })
    }

    const verifiedCount = documents.filter((d) => d.status === 'verified').length
    const uploadedCount = documents.filter((d) => d.status !== 'not_uploaded').length
    const isComplete = verifiedCount === documents.length
    const hasAnyUploading = documents.some((d) => d.status === 'uploading')

    return (
        <main className=" bg-background flex items-center justify-center px-4 py-8">
            <section className="w-full max-w-6xl bg-surface rounded-2xl shadow-md border border-border p-10 flex flex-col gap-10">
                <header className="flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-h1 text-main">Documentación</h1>
                            <p className="text-body-sm text-muted max-w-2xl">
                                Para continuar con el proceso, necesitamos que subas la siguiente
                                documentación obligatoria en formato PDF (máximo 5MB por archivo).
                            </p>
                        </div>

                        <div className="flex flex-col gap-1 min-w-[180px]">
                            <span className="text-caption text-muted">Progreso</span>
                            <span className="text-body font-medium text-main">
                                {verifiedCount} de {documents.length} verificados
                            </span>

                            <div className="h-2 w-full bg-border rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-success transition-all"
                                    style={{
                                        width: `${(verifiedCount / documents.length) * 100}%`,
                                    }}
                                />
                            </div>

                            {uploadedCount > 0 && uploadedCount !== verifiedCount && (
                                <span className="text-caption text-muted mt-1">
                                    {uploadedCount - verifiedCount} en proceso
                                </span>
                            )}
                        </div>
                    </div>
                </header>

                {globalError && (
                    <div className="error-container">
                        <p className="text-error text-body-sm">{globalError}</p>
                    </div>
                )}

                <div className="grid gap-6 md:grid-cols-3">
                    {documents.map((doc) => (
                        <DocumentUploadCard
                            key={doc.type}
                            label={doc.label}
                            status={doc.status}
                            file={doc.file}
                            metadata={doc.metadata}
                            onFileSelect={(file) => handleFileChange(doc.type, file)}
                            onVerify={() => handleVerify(doc.type)}
                            disabled={doc.status === 'uploading'}
                            validationError={validationErrors[doc.type]}
                        />
                    ))}
                </div>

                <footer className="flex justify-end pt-4 gap-2 border-t border-border">
                    <Button
                        variant="secondary"
                        type="button"
                        onClick={() => navigate('/dashboard')}
                        disabled={hasAnyUploading}
                    >
                        Volver
                    </Button>
                    <Button
                        variant="primary"
                        type="submit"
                        disabled={!isComplete || hasAnyUploading}
                        onClick={() => navigate('/dashboard')}
                    >
                        Continuar
                    </Button>
                </footer>
            </section>
        </main>
    )
}
