import { getHealthCheck } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export default function HomeView() {
    const { data, isLoading } = useQuery({
        queryKey: ['health'],
        queryFn: getHealthCheck
    })

    if (isLoading) return <div>Loading...</div>

    if (data) return (
        <pre>{JSON.stringify(data, null, 2)}</pre>
    )
}
