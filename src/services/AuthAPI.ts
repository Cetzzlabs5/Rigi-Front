import api from "@/libs/axios";
import type { UserLoginForm } from "@/types/userType";
import { isAxiosError } from "axios";

export async function login(formData: UserLoginForm) {
    try {
        const url = '/auth/login'
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const errorData = error.response.data
            throw new Error(errorData.error)
        }
    }

}