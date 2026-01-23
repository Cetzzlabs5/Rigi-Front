import { useAuth } from "@/hooks/useAuth"
import { Outlet } from "react-router"

export default function AppLayout() {
    const { data, isLoading } = useAuth()

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (data) return (
        <>
            <h1 className="text-h1">Bienvenido {data.legalName}</h1>
            <Outlet />
        </>
    )
}
