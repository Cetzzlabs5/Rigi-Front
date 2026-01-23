import api from '@/libs/axios'

export interface ProviderActivityDTO {
    id: string
    name: string
}

export interface UpdateProviderProfileDTO {
    phone: string
    providerActivityId: string
    address?: string
    province?: string
}

export const updateProviderProfile = async (userId: string, payload: UpdateProviderProfileDTO) => {
    const { data } = await api.patch(`/provider/${userId}`, payload)
    return data
}

export const getProviderActivities = async (): Promise<ProviderActivityDTO[]> => {
    const { data } = await api.get<ProviderActivityDTO[]>('/providerActivity')
    return data
}
