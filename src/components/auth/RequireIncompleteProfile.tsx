import { useAuth } from '@/hooks/useAuth'
import { Navigate } from 'react-router'

interface RequireIncompleteProfileProps {
    children: React.ReactNode
}

export function RequireIncompleteProfile({ children }: RequireIncompleteProfileProps) {
    const { data: session, isLoading } = useAuth()

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-900"></div>
            </div>
        )
    }

    if (session?.role !== 'PROVIDER' || session?.hasCompletedProfile === true) {
        return <Navigate to="/dashboard" replace />
    }

    return <>{children}</>
}
