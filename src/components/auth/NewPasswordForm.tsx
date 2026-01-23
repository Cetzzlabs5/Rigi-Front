import { updatePasswordWithToken } from "@/services/AuthAPI";
import type { ConfirmToken, NewPasswordForm } from "@/types/userType";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { useState } from "react";

type NewPasswordFormProps = {
    token: ConfirmToken['token']
}

export default function NewPasswordForm({ token }: NewPasswordFormProps) {
    const navigate = useNavigate()
    const [errorState, setErrorState] = useState<string | null>(null)
    const defaultValues: NewPasswordForm = {
        password: '',
        password_confirm: '',
    }
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<NewPasswordForm>({ defaultValues });

    const { mutate, isPending } = useMutation({
        mutationFn: updatePasswordWithToken,
        onError: (error) => {
            setErrorState(error.message)
        },
        onSuccess: () => {
            reset()
            navigate('/auth/login')
        }

    })

    const handleNewPassword = (formData: NewPasswordForm) => {
        const data = {
            formData,
            token
        }

        mutate(data)
    }

    const password = watch('password');

    return (
        <>
            <form
                onSubmit={handleSubmit(handleNewPassword)}
                className="w-full flex flex-col gap-4"
                noValidate
            >

                <Input
                    id="password"
                    type="password"
                    label="Nueva contraseña"
                    placeholder="********"
                    error={errors.password?.message}
                    {...register("password", {
                        required: "La contraseña es obligatoria",
                        minLength: {
                            value: 8,
                            message: 'El Password debe ser mínimo de 8 caracteres'
                        }
                    })}
                />

                <Input
                    id="password_confirm"
                    type="password"
                    label="Repite la nueva contraseña"
                    placeholder="********"
                    error={errors.password_confirm?.message}
                    {...register("password_confirm", {
                        required: "Repetir Contraseña es obligatorio",
                        validate: value => value === password || 'Las Contraseñas no son iguales'
                    })}
                />

                <Button
                    type="submit"
                    className="mt-4"
                    loading={isPending}
                >Establecer Contraseña</Button>
            </form>

            {errorState && <p className="bg-error/10 text-error p-2 rounded-lg text-sm w-full text-center font-semibold">{errorState}</p>}
        </>
    )
}
