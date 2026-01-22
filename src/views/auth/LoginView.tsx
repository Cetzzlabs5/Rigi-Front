import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import Linked from "@/components/UI/Linked";
import { login } from "@/services/AuthAPI";
import type { UserLoginForm } from "@/types/userType";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdDiamond, MdEngineering, MdOutlineVerifiedUser } from "react-icons/md";

export default function LoginView() {
    const [errorState, setErrorState] = useState<string | null>(null)
    const defaultValues: UserLoginForm = {
        email: "",
        password: ""
    }

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues })

    const { mutate, isPending } = useMutation({
        mutationFn: login,
        onError: (error) => {
            console.log(error)
            setErrorState(error.message)
        },
        onSuccess: () => {
            console.log("success")
        }
    })

    const onSubmit = (formData: UserLoginForm) => {
        mutate(formData)
    }

    return (
        <section className="flex min-h-screen overflow-y-hidden">
            <div className="grow relative p-12 flex flex-col justify-end">
                <div className="absolute inset-0 z-0">
                    <div className="size-full min-h-screen bg-center bg-no-repeat bg-cover opacity-60 mix-blend-overlay bg-[url('../public/login-image.webp')]"></div>
                    <div className="absolute inset-0 bg-linear-to-t from-primary-900/90 via-primary-900/50 to-primary-900/30"></div>
                </div>
                <div className="z-10 text-on-primary max-w-lg">
                    <MdEngineering className="size-12 mb-6" />
                    <h1 className="text-5xl font-bold mb-4 tracking-tight">Seguridad y Eficiencia Operativa</h1>
                    <p className="text-gray-200 leading-relaxed">Plataforma integral para la gestión de proveedores. Control de identidades y eficiencia operativa.</p>
                    <small className="text-caption flex gap-2 items-center text-gray-400 mt-12">
                        <MdOutlineVerifiedUser />
                        <span>Sistema protegido y encriptado</span>
                    </small>
                </div>
            </div>
            <div className="min-w-5/12 flex flex-col justify-center items-center px-6 lg:px-12 overflow-y-hidden">
                <div className="flex flex-col items-start gap-8 max-w-[440px] w-full">
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

                    <div className="text-center">
                        <Linked variant="ghost" to="/register" >¿Olvidaste tu contraseña? <span className="text-primary-900 font-semibold">Recuperala</span></Linked>
                        <Linked variant="ghost" to="/register" >¿No tienes una cuenta? <span className="text-primary-900 font-semibold">Registrate</span></Linked>
                    </div>
                </div>
            </div>
        </section>
    )
}
