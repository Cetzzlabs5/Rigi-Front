import { useAuth } from "@/hooks/useAuth"
import { MdDescription } from "react-icons/md"
import { useNavigate } from "react-router"

export default function HomeView() {
    const { data: auth } = useAuth()
    const navigate = useNavigate()

    return (
        <div className="space-y-6">

            <div className="bg-linear-to-br from-primary-900 to-primary-700 rounded-2xl p-8 text-white">
                <h1 className="text-h1 mb-2">¡Bienvenido, {auth?.legalName}!</h1>
                <p className="text-body text-primary-100">
                    Gestiona tu perfil y documentación desde este panel
                </p>
            </div>

            <div className="bg-surface border border-border rounded-xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                        onClick={() => navigate('/dashboard/provider/documents')}
                        className="flex items-center gap-4 p-4 border border-border rounded-lg hover:border-primary-400 hover:bg-primary-50 transition-all text-left"
                    >
                        <div className="w-10 h-10 rounded-lg bg-accent-100 flex items-center justify-center">
                            <MdDescription className="size-5 text-accent-700" />
                        </div>
                        <div>
                            <h3 className="text-body font-medium text-main">Subir Documentos</h3>
                            <p className="text-caption text-muted">
                                Gestiona tu documentación requerida
                            </p>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}
