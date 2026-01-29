const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_TYPES = ['application/pdf']

export interface FileValidationResult {
    valid: boolean
    error?: string
}

export function validateDocumentFile(file: File): FileValidationResult {
    if (!ALLOWED_TYPES.includes(file.type)) {
        return {
            valid: false,
            error: 'Solo se permiten archivos PDF'
        }
    }

    if (!file.name.toLowerCase().endsWith('.pdf')) {
        return {
            valid: false,
            error: 'El archivo debe tener extensión .pdf'
        }
    }

    if (file.size > MAX_FILE_SIZE) {
        return {
            valid: false,
            error: 'El archivo no debe superar 5MB'
        }
    }

    if (file.size === 0) {
        return {
            valid: false,
            error: 'El archivo está vacío'
        }
    }

    return { valid: true }
}

export function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes'

    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}
