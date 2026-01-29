import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { MdDiamond } from 'react-icons/md'
import { IoCheckmarkCircleOutline, IoCloseCircleOutline } from 'react-icons/io5'

import Button from "@/components/UI/Button"
import Input from "@/components/UI/Input"
import Linked from "@/components/UI/Linked"
import Modal from '@/components/UI/Modal'
import { registerAccount } from '@/services/AuthAPI'
import { ConfirmAccountForm } from './ConfirmAccountForm'

export function RegisterForm() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [errorState, setErrorState] = useState<string | null>(null)

    // Usamos las buenas prácticas del teammate: defaultValues y react-hook-form
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            legalName: '',
            cuit: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    })

    const passwordValue = watch("password", "")
    const emailValue = watch("email")

    // Lógica de validación visual
    const validations = {
        minLength: passwordValue.length >= 6,
        hasUpper: /[A-Z]/.test(passwordValue),
        hasNumber: /\d/.test(passwordValue),
    }
    const isPasswordValid = Object.values(validations).every(Boolean)

    const { mutate, isPending } = useMutation({
        mutationFn: registerAccount,
        onError: (error: any) => {
            setErrorState(error.response?.data?.message || error.message || 'Error al registrar')
        },
        onSuccess: () => {
            setIsModalOpen(true)
        }
    })

    const onSubmit = (formData: any) => {
        if (!isPasswordValid) return
        const { confirmPassword, ...registerData } = formData
        mutate(registerData)
    }

    const ValidationRequirement = ({ label, isMet }: { label: string, isMet: boolean }) => (
        <div className={`flex items-center gap-2 text-[13px] transition-colors duration-200 ${isMet ? 'text-green-600' : 'text-red-500'}`}>
            {isMet ? <IoCheckmarkCircleOutline size={16} /> : <IoCloseCircleOutline size={16} />}
            <span>{label}</span>
        </div>
    )

    return (
        <>
            {/* Header: Exactamente igual al Login */}
            <div className="bg-accent-900/10 p-2 rounded-lg">
                <MdDiamond className="size-12 text-accent-900" />
            </div>

            <div className="w-full">
                <h2 className="text-h1 text-primary-900 mb-4">Crear Cuenta</h2>
                <p className="text-body text-primary-900">Registrate para acceder al sistema de gestión de proveedores Rigi</p>
            </div>

            {/* Formulario: Usa el gap-4 del teammate */}
            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
                <Input
                    id="legalName"
                    label="Razón Social"
                    placeholder="Nombre legal de la empresa"
                    {...register("legalName", { required: "La razón social es requerida" })}
                    error={errors.legalName?.message}
                />
                
                <Input
                    id="cuit"
                    label="CUIT"
                    placeholder="Ej: 20301234567"
                    {...register("cuit", { required: "El CUIT es requerido" })}
                    error={errors.cuit?.message}
                />

                <Input
                    type="email"
                    id="email"
                    label="Correo Electrónico"
                    placeholder="nombre@empresa.com"
                    {...register("email", { 
                        required: "El email es requerido",
                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Email inválido" }
                    })}
                    error={errors.email?.message}
                />

                <div className="flex flex-col gap-2">
                    <Input
                        type="password"
                        id="password"
                        label="Contraseña"
                        placeholder="********"
                        {...register("password", { required: "La contraseña es requerida" })}
                        error={errors.password?.message}
                    />
                    
                    {passwordValue.length > 0 && (
                        <div className="flex flex-col gap-1 mt-1 ml-1 bg-accent-900/5 p-2 rounded-md border border-accent-900/10">
                            <ValidationRequirement label="Mínimo 6 caracteres" isMet={validations.minLength} />
                            <ValidationRequirement label="Una mayúscula" isMet={validations.hasUpper} />
                            <ValidationRequirement label="Un número" isMet={validations.hasNumber} />
                        </div>
                    )}
                </div>

                <Input
                    type="password"
                    id="confirmPassword"
                    label="Confirmar Contraseña"
                    placeholder="********"
                    {...register("confirmPassword", { 
                        required: "Confirma tu contraseña",
                        validate: value => value === passwordValue || "Las contraseñas no coinciden"
                    })}
                    error={errors.confirmPassword?.message}
                />

                <Button 
                    type="submit" 
                    className="w-full mt-4" 
                    loading={isPending}
                    disabled={!isPasswordValid}
                >
                    Crear cuenta
                </Button>
            </form>

            {errorState && (
                <p className="bg-error/10 text-error p-2 rounded-lg text-sm w-full text-center font-semibold">
                    {errorState}
                </p>
            )}

            {/* Navegación final */}
            <nav className="text-center">
                <Linked variant="ghost" to="/auth/login">
                    ¿Ya tienes una cuenta? <span className="text-primary-900 font-semibold">Inicia Sesión</span>
                </Linked>
            </nav>

            {isModalOpen && (
                <Modal title="Verifica tu cuenta" onClose={() => setIsModalOpen(false)}>
                    <ConfirmAccountForm email={emailValue} />
                </Modal>
            )}
        </>
    )
}