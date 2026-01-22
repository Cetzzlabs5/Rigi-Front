import { useState } from 'react'
import Button from '../UI/Button'
import { PinInput, PinInputField } from '@chakra-ui/pin-input'
import { confirmAccount } from '@/services/AuthAPI'

export function ConfirmAccountForm({ email }: { email: string }) {
    const [token, setToken] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState('')

    // Actualiza el estado mientras el usuario escribe
    const handleChange = (value: string) => {
        setToken(value)
        if (error) setError('') // Limpia el error si vuelve a escribir
    }

    // Opcional: Ejecuta la confirmación automáticamente al llenar los 6 campos
    const handleComplete = (value: string) => {
        setToken(value)
    }

    const handleConfirm = async (e?: React.FormEvent) => {
        if (e) e.preventDefault()
        if (token.length < 6) return

        setSubmitting(true)
        setError('')

        try {
            await confirmAccount({ token, email })
            // Redirección al completar el perfil
            window.location.href = '/auth/login'
        } catch (err: any) {
            setError(err.message || 'Código inválido o expirado')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleConfirm} className="flex flex-col gap-8 pt-4 items-center">
            <p className="text-body-sm text-muted text-center">
                Hemos enviado un código a <span className="font-bold text-main">{email}</span>. 
                Por favor, ingrésalo debajo.
            </p>
            
            <div className="flex flex-col gap-2">
                <div className="flex justify-center gap-2">
                    <PinInput
                        value={token} 
                        onChange={handleChange} 
                        onComplete={handleComplete}
                        placeholder=""
                    >
                        <PinInputField className="w-12 h-12 text-center text-xl font-bold rounded-lg border-border border bg-surface focus:border-primary-800 focus:ring-2 focus:ring-primary-800/20 outline-none transition-all" />
                        <PinInputField className="w-12 h-12 text-center text-xl font-bold rounded-lg border-border border bg-surface focus:border-primary-800 focus:ring-2 focus:ring-primary-800/20 outline-none transition-all" />
                        <PinInputField className="w-12 h-12 text-center text-xl font-bold rounded-lg border-border border bg-surface focus:border-primary-800 focus:ring-2 focus:ring-primary-800/20 outline-none transition-all" />
                        <PinInputField className="w-12 h-12 text-center text-xl font-bold rounded-lg border-border border bg-surface focus:border-primary-800 focus:ring-2 focus:ring-primary-800/20 outline-none transition-all" />
                        <PinInputField className="w-12 h-12 text-center text-xl font-bold rounded-lg border-border border bg-surface focus:border-primary-800 focus:ring-2 focus:ring-primary-800/20 outline-none transition-all" />
                        <PinInputField className="w-12 h-12 text-center text-xl font-bold rounded-lg border-border border bg-surface focus:border-primary-800 focus:ring-2 focus:ring-primary-800/20 outline-none transition-all" />
                    </PinInput>
                </div>
                {error && <p className="text-error text-caption text-center mt-2">{error}</p>}
            </div>

            <Button 
                type="submit" 
                variant="primary" 
                loading={submitting} 
                disabled={submitting || token.length < 6}
                className="w-full"
            >
                Confirmar y Activar
            </Button>
        </form>
    )
}