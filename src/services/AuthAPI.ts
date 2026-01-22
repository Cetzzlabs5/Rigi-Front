import api from "@/libs/axios"
import { isAxiosError } from "axios"

export interface RegisterAccountDTO {
    legalName: string
    cuit: string
    email: string
    password: string
}

export interface ConfirmTokenDTO {
    token: string
    email: string
}

export const registerAccount = async (formData: RegisterAccountDTO) => {
    try {
        const { data } = await api.post('/api/auth/register', formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw error 
        }
        throw new Error("Error de conexión con el servidor")
    }
}

export const confirmAccount = async (formData: ConfirmTokenDTO) => {
    try {
        const { data } = await api.post('/api/auth/confirm-account', formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || "Error al confirmar cuenta")
        }
        throw new Error("Error de red")
    }
}