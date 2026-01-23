import Button from "@/components/UI/Button"
import Input from "@/components/UI/Input"
import Linked from "@/components/UI/Linked"
import { forgotPassword } from "@/services/AuthAPI"
import type { ForgotPasswordForm } from "@/types/userType"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"

export default function ForgotPasswordView() {
    const [errorState, setErrorState] = useState<string | null>(null)
    const defaultValues: ForgotPasswordForm = {
        email: ""
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues })

    const { mutate } = useMutation({
        mutationFn: forgotPassword,
        onError: (error) => {
            setErrorState(error.message)
        },
        onSuccess: () => {
            reset()
        }
    })

    const handleForgotPassword = (formData: ForgotPasswordForm) => mutate(formData)

    return (
        <>
            <div>
                <h2 className="text-h1 text-primary-900 mb-4">¿Olvidaste tu contraseña?</h2>
                <p className="text-body text-primary-900">Ingrese su correo electronico institucional para recibir instrucciones de recuperación</p>
            </div>
            <form onSubmit={handleSubmit(handleForgotPassword)} className="w-full flex flex-col gap-4">
                <Input
                    type="email"
                    label="Correo Electronico"
                    placeholder="nombre@empresa.com"
                    id="email"
                    {...register("email", {
                        required: "El email es requerido",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "El email es invalido"
                        }
                    })}
                    error={errors.email?.message}
                />

                <Button type="submit" className="w-full mt-4">Enviar enlace de recuperación</Button>
            </form>
            {errorState && <p className="bg-error/10 text-error p-2 rounded-lg text-sm w-full text-center font-semibold">{errorState}</p>}
            <nav className="text-center w-full">
                <Linked variant="ghost" to="/auth/login" >¿Ya tienes una cuenta? <span className="text-primary-900 font-semibold">Inicia sesión</span></Linked>
            </nav>
        </>
    )
}
