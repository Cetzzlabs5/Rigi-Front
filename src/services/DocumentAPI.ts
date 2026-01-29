import api from '@/libs/axios'
import { isAxiosError } from 'axios'
import type {
    UploadDocumentDTO,
    DocumentResponse,
} from '@/types/documentType'



export async function uploadDocument(data: UploadDocumentDTO): Promise<DocumentResponse> {
    try {
        const formData = new FormData()
        formData.append('file', data.file)
        formData.append('documentType', data.documentType)
        formData.append('requirementId', '1')

        const response = await api.post<any>(
            '/providerActivity/upload',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )

        // Mapear la respuesta del backend al formato esperado por el frontend
        return {
            id: response.data.id,
            status: response.data.status.toLowerCase(),
            fileName: response.data.originalName,
            fileSize: response.data.size,
            uploadedAt: new Date(response.data.createdAt).toISOString(),
            rejectionReason: response.data.rejectionReason
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            // Caso especial: documento rechazado (422)
            // El documento está guardado en BD pero fue rechazado por validación
            if (error.response.status === 422) {
                return {
                    id: '', // No retornamos ID en caso de rechazo
                    status: 'rejected',
                    fileName: data.file.name,
                    fileSize: data.file.size,
                    uploadedAt: new Date().toISOString(),
                    rejectionReason: error.response.data.rejectionReason
                }
            }
            throw new Error(
                error.response.data.message || 'Error al subir documento'
            )
        }
        throw new Error('Error de conexión con el servidor')
    }
}

export async function getProviderDocuments(providerId: string): Promise<DocumentResponse[]> {
    try {
        const { data } = await api.get<DocumentResponse[]>(
            `/provider/${providerId}/documents`
        )
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(
                error.response.data.message || 'Error al obtener documentos'
            )
        }
        throw new Error('Error de conexión con el servidor')
    }
}
