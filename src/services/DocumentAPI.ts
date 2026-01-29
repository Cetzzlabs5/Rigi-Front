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
        formData.append('providerId', data.providerId)

        const response = await api.post<DocumentResponse>(
            '/provider/documents/upload',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )

        return response.data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
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
