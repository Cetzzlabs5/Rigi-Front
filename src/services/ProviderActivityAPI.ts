import api from "@/libs/axios"

export interface ProviderActivityDTO {
    id: string
    name: string
}

export const getProviderActivities = async (): Promise<ProviderActivityDTO[]> => {
    const response = await api.get<ProviderActivityDTO[]>('/api/providerActivity')
    return response.data
}
