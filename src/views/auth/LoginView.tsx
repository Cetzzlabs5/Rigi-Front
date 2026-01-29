import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import Linked from "@/components/UI/Linked";
import { getSession, login } from "@/services/AuthAPI";
import type { UserLoginForm } from "@/types/userType";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdDiamond } from "react-icons/md";
import { useNavigate } from "react-router";

export default function LoginView() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const [errorState, setErrorState] = useState<string | null>(null)
    const defaultValues: UserLoginForm = {
        email: "",
        password: ""
    }

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues })

    const { mutate, isPending } = useMutation({
        mutationFn: login,
        onError: (error) => {
            setErrorState(error.message)
        },
        onSuccess: async () => {
            // Invalidar y esperar a que se actualice la sesión
            await queryClient.invalidateQueries({ queryKey: ['session'] })

            // Obtener sesión actualizada
            const session = await queryClient.fetchQuery({
                queryKey: ['session'],
                queryFn: getSession
            })

            // Verificar si es proveedor y si completó el perfil
            if (session?.role === 'PROVIDER' && session?.hasCompletedProfile === false) {
                navigate('/dashboard/provider/complete-profile')
            } else {
                navigate('/dashboard')
            }
        }
    })

    const onSubmit = (formData: UserLoginForm) => {
        mutate(formData)
    }

    return (

        <>
            <div className="bg-accent-900/10 p-2 rounded-lg">
                <MdDiamond className="size-12 text-accent-900" />
            </div>
            <div>
                <h2 className="text-h1 text-primary-900 mb-4">Bienvenido</h2>
                <p className="text-body text-primary-900">Ingrese sus credenciales para acceder al sistema de gestion de proveedores</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
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
                <Input
                    type="password"
                    label="Contraseña"
                    placeholder="********"
                    id="password"
                    {...register("password", {
                        required: "El password es requerido",
                        minLength: {
                            value: 6,
                            message: "El password debe tener al menos 6 caracteres"
                        }
                    })}
                    error={errors.password?.message}
                />
                <Button type="submit" className="w-full mt-4" loading={isPending}>Iniciar Sesión</Button>
            </form>
            {errorState && <p className="bg-error/10 text-error p-2 rounded-lg text-sm w-full text-center font-semibold">{errorState}</p>}

            <nav className="text-center">
                <Linked variant="ghost" to="/auth/forgot-password" >¿Olvidaste tu contraseña? <span className="text-primary-900 font-semibold">Recuperala</span></Linked>
                <Linked variant="ghost" to="/auth/register" >¿No tienes una cuenta? <span className="text-primary-900 font-semibold">Registrate</span></Linked>
            </nav>
        </>
    )
}
