import { useState } from 'react'
import { DocumentUploadCard } from '../../components/provider/DocumentUploadCard'
import Button from '@/components/UI/Button'
import { useNavigate } from 'react-router'

export interface ProviderDocument {
    type: 'AFIP' | 'DGR_SALTA' | 'F931'
    label: string
    file: File | null
}

const INITIAL_DOCUMENTS: ProviderDocument[] = [
    { type: 'AFIP', label: 'Constancia de Inscripción AFIP', file: null },
    { type: 'DGR_SALTA', label: 'Constancia de Inscripción DGR Salta', file: null },
    { type: 'F931', label: 'Formulario F.931', file: null },
]

export function ProviderDocumentsPanel() {
    const [documents, setDocuments] = useState(INITIAL_DOCUMENTS)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const completedCount = documents.filter(d => d.file).length
    const isComplete = completedCount === documents.length

    const handleFileChange = (type: string, file: File) => {
        setDocuments(prev =>
            prev.map(doc =>
                doc.type === type ? { ...doc, file } : doc
            )
        )
    }

    const handleSubmit = () => {
        setLoading(true)

        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }

    return (
        <main className="min-h-screen bg-background flex items-center justify-center px-4">
            <section className="w-full max-w-6xl bg-surface rounded-2xl shadow-md border border-border p-10 flex flex-col gap-10">

                <header className="flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-h1 text-main">
                                Documentación
                            </h1>
                            <p className="text-body-sm text-muted max-w-2xl">
                                Para continuar con el proceso, necesitamos que subas
                                la siguiente documentación obligatoria.
                            </p>
                        </div>

                        <div className="flex flex-col gap-1 min-w-[180px]">
                            <span className="text-caption text-muted">
                                Progreso
                            </span>
                            <span className="text-body font-medium text-main">
                                {completedCount} de {documents.length} documentos
                            </span>

                            <div className="h-2 w-full bg-border rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-primary-700 transition-all"
                                    style={{
                                        width: `${(completedCount / documents.length) * 100}%`,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </header>

                <div className="grid gap-6 md:grid-cols-3">
                    {documents.map(doc => (
                        <DocumentUploadCard
                            key={doc.type}
                            label={doc.label}
                            file={doc.file}
                            onFileSelect={(file) =>
                                handleFileChange(doc.type, file)
                            }
                        />
                    ))}
                </div>

                <footer className="flex justify-end pt-4 gap-2 border-t border-border">
                    <Button
                        variant="secondary"
                        type="button"
                        onClick={() => navigate('/')}
                    >
                        Volver
                    </Button>
                    <Button
                        variant="primary"
                        type="submit"
                        disabled={!isComplete || loading}
                        onClick={handleSubmit}
                        loading={loading}
                    >
                        Continuar
                    </Button>

                </footer>

            </section>
        </main>
    )
}
