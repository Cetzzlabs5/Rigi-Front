// Document types and interfaces for provider document management

export type DocumentType = 'AFIP' | 'DGR_SALTA' | 'F931'

export type DocumentStatus =
    | 'not_uploaded'
    | 'uploading'
    | 'pending'
    | 'verified'
    | 'rejected'

// DTOs for API requests/responses
export interface UploadDocumentDTO {
    providerId: string
    documentType: DocumentType
    file: File
}

export interface DocumentResponse {
    id: string
    status: Exclude<DocumentStatus, 'not_uploaded' | 'uploading'>
    fileName: string
    fileSize: number
    uploadedAt: string
    rejectionReason?: string
}

export interface DocumentMetadata {
    id?: string
    fileName?: string
    fileSize?: number
    uploadedAt?: string
    rejectionReason?: string
}

// UI-specific document interface
export interface ProviderDocument {
    type: DocumentType
    label: string
    status: DocumentStatus
    file: File | null
    metadata: DocumentMetadata
}
