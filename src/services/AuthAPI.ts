import api from "@/libs/axios"
import { isAxiosError } from "axios"
import { sessionSchema, type ConfirmToken, type ForgotPasswordForm, type NewPasswordForm, type UserLoginForm } from "@/types/userType";

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
        const { data } = await api.post('/auth/register', formData)
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
        const { data } = await api.post('/auth/confirm-account', formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || "Error al confirmar cuenta")
        }
        throw new Error("Error de red")
    }
}


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

export async function forgotPassword(formData: ForgotPasswordForm) {
    try {
        const url = '/auth/forgot-password'
        const { data } = await api.post<string>(url, formData)
        return data

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const errorData = error.response.data
            throw new Error(errorData.error)
        }
    }
}

export async function validateToken(formData: ConfirmToken) {
    try {
        const url = '/auth/validate-token'
        const { data } = await api.post<string>(url, formData)
        return data

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const errorData = error.response.data
            throw new Error(errorData.error)
        }
    }
}

export async function updatePasswordWithToken({ formData, token }: { formData: NewPasswordForm, token: ConfirmToken['token'] }) {
    try {
        const url = `/auth/update-password/${token}`
        const { data } = await api.post<string>(url, formData)
        return data

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const errorData = error.response.data
            throw new Error(errorData.error)
        }
    }
}

export async function logout() {
    try {
        const url = '/auth/logout'
        const { data } = await api.post<string>(url)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const errorData = error.response.data
            throw new Error(errorData.error)
        }
    }
}

export async function getSession() {
    try {
        const { data } = await api.get<string>('/auth/session')
        const response = sessionSchema.safeParse(data)
        if (response.success) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const errorData = error.response.data
            throw new Error(errorData.error)
        }
    }
}