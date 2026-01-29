import Loader from "@/components/UI/Loader"
import { useAuth } from "@/hooks/useAuth"
import { Navigate, Outlet, useNavigate, useLocation } from "react-router"
import { MdDiamond, MdLogout, MdDashboard, MdChevronLeft } from "react-icons/md"
import { useState } from "react"


export default function AppLayout() {
    const { data, isLoading, logout } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)

    if (isLoading) return <Loader />
    if (!data) return <Navigate to='/auth/login' />

    const menuItems = [
        { icon: MdDashboard, label: 'Dashboard', path: '/dashboard' },
    ]

    const isActive = (path: string) => location.pathname === path

    return (
        <div className="min-h-screen bg-background flex">
            <aside
                className={`fixed left-0 top-0 h-full bg-surface border-r border-border transition-all duration-300 z-30 ${isSidebarOpen ? 'w-64' : 'w-20'}`}
            >
                <div className="h-16 flex items-center justify-center px-4 border-b border-border">
                    {isSidebarOpen ? (
                        <>
                            <div className="flex items-center gap-3 flex-1">
                                <div className="w-10 h-10 rounded-lg bg-accent-900/10 flex items-center justify-center">
                                    <MdDiamond className="text-accent-900 size-6" />
                                </div>
                                <span className="font-bold text-primary-900 text-lg">RIGI</span>
                            </div>
                            <button
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                className="p-1.5 hover:bg-primary-100 rounded-md transition-colors"
                            >
                                <MdChevronLeft className="size-5 text-main transition-transform" />
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-1.5 hover:bg-primary-100 rounded-md transition-colors"
                        >
                            <MdChevronLeft className="size-5 text-main transition-transform rotate-180" />
                        </button>
                    )}
                </div>

                <nav className="p-4 space-y-2">
                    {menuItems.map((item) => (
                        <button
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${isActive(item.path)
                                ? 'bg-primary-100 text-primary-900 font-medium'
                                : 'text-secondary hover:bg-primary-50 hover:text-primary-900'
                                }`}
                        >
                            <item.icon className="size-5 shrink-0" />
                            {isSidebarOpen && <span className="text-body-sm">{item.label}</span>}
                        </button>
                    ))}
                </nav>
            </aside>

            <div
                className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'
                    }`}
            >
                <header className="h-16 bg-surface border-b border-border flex items-center justify-between px-6 sticky top-0 z-20">
                    <div>
                        <h1 className="text-h3 text-main">
                            {menuItems.find((item) => isActive(item.path))?.label || 'Dashboard'}
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3 px-4 py-2 bg-primary-50 rounded-lg">
                            <div className="w-8 h-8 rounded-full bg-linear-to-br from-primary-600 to-accent-500 flex items-center justify-center">
                                <span className="text-white text-body-sm font-semibold">
                                    {data.legalName.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-body-sm font-medium text-main">
                                    {data.legalName}
                                </span>
                                <span className="text-caption text-muted">{data.role}</span>
                            </div>
                        </div>

                        <button
                            onClick={logout}
                            className="p-2.5 hover:bg-error/10 text-error rounded-lg transition-colors"
                            title="Cerrar sesión"
                        >
                            <MdLogout className="size-5" />
                        </button>
                    </div>
                </header>

                <main className="flex-1 p-6 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
