import api from "@/libs/axios"

export interface ProviderActivityDTO {
    id: string
    name: string
}

export interface UpdateProviderProfilePayload {
    legalName: string
    phone: string
    providerActivityId: string
    address?: string
    province?: string
}

//---------

export async function updateProviderProfile(
    userId: string,
    payload: UpdateProviderProfilePayload
) {
    const { data } = await api.patch(
        `/api/provider/${userId}`,
        payload
    )

    return data
}

export const getProviderActivities = async (): Promise<ProviderActivityDTO[]> => {
    const response = await api.get<ProviderActivityDTO[]>('/api/providerActivity')
    return response.data
}
