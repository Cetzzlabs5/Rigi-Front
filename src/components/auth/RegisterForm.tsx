import { useState } from 'react'
import Input from '../UI/Input'
import Button from '../UI/Button'
import Modal from '../UI/Modal'
import { registerAccount } from '@/services/AuthAPI'
import { ConfirmAccountForm } from './ConfirmAccountForm'

export function RegisterForm() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [form, setForm] = useState({
        legalName: '',
        cuit: '',
        email: '',
        password: '',
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)

        try {
            await registerAccount(form)
            setIsModalOpen(true) // Abrir modal de confirmación al tener éxito
        } catch (error: any) {
            // Si el backend devuelve errores de Zod o duplicados
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors)
            } else {
                setErrors({ general: error.message || 'Error al registrar' })
            }
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="bg-surface rounded-lg shadow-sm max-w-md w-full">
            <div className="border-b border-border p-6">
                <h2 className="text-h2 text-main">Crear Cuenta</h2>
                <p className="text-body-sm text-muted mt-1">Registrate para acceder al sistema Rigi</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-6">
                <Input
                    id="legalName"
                    label="Razón Social"
                    placeholder="Nombre legal de la empresa"
                    value={form.legalName}
                    onChange={(e) => setForm({ ...form, legalName: e.target.value })}
                    error={errors.legalName}
                />
                <Input
                    id="cuit"
                    label="CUIT"
                    placeholder="Ej: 20301234567"
                    value={form.cuit}
                    onChange={(e) => setForm({ ...form, cuit: e.target.value })}
                    error={errors.cuit}
                />
                <Input
                    id="email"
                    label="Correo Electrónico"
                    type="email"
                    placeholder="empresa@ejemplo.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    error={errors.email}
                />
                <Input
                    id="password"
                    label="Contraseña"
                    type="password"
                    placeholder="Mínimo 6 caracteres"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    error={errors.password}
                />

                {errors.general && <p className="text-error text-caption text-center">{errors.general}</p>}

                <Button 
                    type="submit" 
                    variant="primary" 
                    loading={submitting} 
                    disabled={submitting} 
                    className="w-full"
                >
                    Crear cuenta
                </Button>
            </form>

            {/* Modal de Confirmación */}
            {isModalOpen && (
                <Modal 
                    title="Verifica tu cuenta" 
                    onClose={() => setIsModalOpen(false)}
                >
                    <ConfirmAccountForm email={form.email} />
                </Modal>
            )}
        </div>
    )
}