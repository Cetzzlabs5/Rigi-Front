import { getSession } from "@/services/AuthAPI";
import { useQuery } from "@tanstack/react-query";

export const useAuth = () => {

    const { data, isError, isLoading } = useQuery({
        queryKey: ['session'],
        queryFn: getSession,
        retry: false,
        refetchOnWindowFocus: false
    })
    return {
        data: data || null,
        isError,
        isLoading
    }
}