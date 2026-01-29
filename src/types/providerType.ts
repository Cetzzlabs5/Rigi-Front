// Provider types and interfaces

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

export interface ProviderProfile {
    id: string
    userId: string
    phone: string
    address?: string
    province?: string
    providerActivityId: string
    hasCompletedProfile: boolean
    createdAt: string
    updatedAt: string
}
