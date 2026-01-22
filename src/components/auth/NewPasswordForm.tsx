import { updatePasswordWithToken } from "@/services/AuthAPI";
import type { ConfirmToken, NewPasswordForm } from "@/types/userType";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import Input from "../UI/Input";
import Button from "../UI/Button";

type NewPasswordFormProps = {
    token: ConfirmToken['token']
}

export default function NewPasswordForm({ token }: NewPasswordFormProps) {
    const navigate = useNavigate()
    const defaultValues: NewPasswordForm = {
        password: '',
        password_confirm: '',
    }
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<NewPasswordForm>({ defaultValues });

    const { mutate } = useMutation({
        mutationFn: updatePasswordWithToken,
        onError: (error) => {
            console.error(error.message)
        },
        onSuccess: (data) => {
            console.log(data)
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
                className="space-y-8 p-10  bg-white mt-10"
                noValidate
            >

                <Input
                    id="password"
                    type="password"
                    placeholder="Password de Registro"
                    error={errors.password?.message}
                    className="w-full p-3  border-gray-300 border"
                    {...register("password", {
                        required: "El Password es obligatorio",
                        minLength: {
                            value: 8,
                            message: 'El Password debe ser mínimo de 8 caracteres'
                        }
                    })}
                />

                <Input
                    id="password_confirm"
                    type="password"
                    placeholder="Repite Password de Registro"
                    error={errors.password_confirm?.message}
                    className="w-full p-3  border-gray-300 border"
                    {...register("password_confirm", {
                        required: "Repetir Password es obligatorio",
                        validate: value => value === password || 'Los Passwords no son iguales'
                    })}
                />

                <Button
                    type="submit"
                >Establecer Contraseña</Button>
            </form>
        </>
    )
}
