import { FiCheckCircle, FiClock, FiLoader, FiXCircle } from 'react-icons/fi'
import type { DocumentStatus } from '@/types/documentType'

interface StatusBadgeProps {
    status: DocumentStatus
    className?: string
}

interface StatusConfig {
    color: string
    bg: string
    label: string
    icon: React.ReactNode | null
}

const STATUS_CONFIGS: Record<DocumentStatus, StatusConfig> = {
    not_uploaded: {
        color: 'text-muted',
        bg: 'bg-muted/10',
        label: 'Sin subir',
        icon: null,
    },
    uploading: {
        color: 'text-primary-700',
        bg: 'bg-primary-700/10',
        label: 'Subiendo...',
        icon: <FiLoader className="size-4 animate-spin" />,
    },
    pending: {
        color: 'text-warning',
        bg: 'bg-warning/10',
        label: 'Pendiente',
        icon: <FiClock className="size-4" />,
    },
    verified: {
        color: 'text-success',
        bg: 'bg-success/10',
        label: 'Verificado',
        icon: <FiCheckCircle className="size-4" />,
    },
    rejected: {
        color: 'text-error',
        bg: 'bg-error/10',
        label: 'Rechazado',
        icon: <FiXCircle className="size-4" />,
    },
}

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
    const config = STATUS_CONFIGS[status]

    return (
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${config.bg} ${className}`}>
            {config.icon}
            <span className={`text-caption font-medium ${config.color}`}>{config.label}</span>
        </div>
    )
}
