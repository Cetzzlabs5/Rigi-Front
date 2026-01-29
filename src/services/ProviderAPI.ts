import api from '@/libs/axios'
import type { ProviderActivityDTO, UpdateProviderProfileDTO } from '@/types/providerType'

export const updateProviderProfile = async (userId: string, payload: UpdateProviderProfileDTO) => {
    const { data } = await api.patch(`/provider/${userId}`, payload)
    return data
}

export const getProviderActivities = async (): Promise<ProviderActivityDTO[]> => {
    const { data } = await api.get<ProviderActivityDTO[]>('/providerActivity')
    return data
}
