import Button from "@/components/UI/Button"
import Input from "@/components/UI/Input"
import { forgotPassword } from "@/services/AuthAPI"
import type { ForgotPasswordForm } from "@/types/userType"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

export default function ForgotPasswordView() {
    const defaultValues: ForgotPasswordForm = {
        email: ""
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues })

    const { mutate } = useMutation({
        mutationFn: forgotPassword,
        onError: (error) => {
            console.log(error)
        },
        onSuccess: (data) => {
            console.log(data)
            reset()
        }
    })

    const handleForgotPassword = (formData: ForgotPasswordForm) => mutate(formData)

    return (
        <form onSubmit={handleSubmit(handleForgotPassword)}>
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

            <Button type="submit" className="w-full mt-4">Enviar</Button>
        </form>
    )
}
