import { validateToken } from "@/services/AuthAPI";
import type { ConfirmToken } from "@/types/userType";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useMutation } from "@tanstack/react-query";
import { useState, type Dispatch, type SetStateAction } from "react";

type NewPasswordTokenProps = {
    token: ConfirmToken['token']
    setToken: Dispatch<SetStateAction<string>>
    setIsValidToken: Dispatch<SetStateAction<boolean>>
}

export default function NewPasswordToken({ token, setToken, setIsValidToken }: NewPasswordTokenProps) {
    const [errorState, setErrorState] = useState<string | null>(null)

    const handleChange = (token: ConfirmToken['token']) => {
        setToken(token)
    }

    const { mutate } = useMutation({
        mutationFn: validateToken,
        onError: (error) => {
            setErrorState(error.message)
        },
        onSuccess: (data) => {
            console.log(data)
            setIsValidToken(true)
        }
    })

    const handleComplete = (token: ConfirmToken['token']) => mutate({ token })


    return (
        <>
            <form
                className="w-full flex flex-col gap-4"
            >
                <label
                    className="font-semibold text-main text-center"
                >Código de 6 dígitos</label>
                <div className="flex justify-center gap-5">
                    <PinInput otp value={token} onChange={handleChange} onComplete={handleComplete}>
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white focus:border-primary-800 focus:ring-2 focus:ring-primary-800/20" />
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white focus:border-primary-800 focus:ring-2 focus:ring-primary-800/20" />
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white focus:border-primary-800 focus:ring-2 focus:ring-primary-800/20" />
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white focus:border-primary-800 focus:ring-2 focus:ring-primary-800/20" />
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white focus:border-primary-800 focus:ring-2 focus:ring-primary-800/20" />
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white focus:border-primary-800 focus:ring-2 focus:ring-primary-800/20" />
                    </PinInput>
                </div>
            </form>
            {errorState && <p className="bg-error/10 text-error p-2 rounded-lg text-sm w-full text-center font-semibold">{errorState}</p>}
        </>
    )
}
