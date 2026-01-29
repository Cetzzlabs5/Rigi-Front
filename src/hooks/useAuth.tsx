import { getSession, logoutUser } from "@/services/AuthAPI";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export const useAuth = () => {

    const navigate = useNavigate()

    const { data, isError, isLoading } = useQuery({
        queryKey: ['session'],
        queryFn: getSession,
        retry: false,
        refetchOnWindowFocus: false
    })

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            queryClient.removeQueries({ queryKey: ['session'] })
            navigate('/')
        }
    })

    const logout = () => mutate()

    return {
        data: data || null,
        isError,
        isLoading,
        logout
    }
}