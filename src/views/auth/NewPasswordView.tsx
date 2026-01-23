import NewPasswordForm from "@/components/auth/NewPasswordForm";
import NewPasswordToken from "@/components/auth/NewPasswordToken";
import type { ConfirmToken } from "@/types/userType";
import { useState } from "react";

export default function NewPasswordView() {
    const [token, setToken] = useState<ConfirmToken['token']>('')
    const [isValidToken, setIsValidToken] = useState(false)

    return (
        <>
            <div>
                <h2 className="text-h1 text-primary-900 mb-4">Reestablecer constraseña</h2>
                <p className="text-body text-primary-900">Ingrese el codigo que recibiste por email</p>
            </div>

            {!isValidToken ? <NewPasswordToken token={token} setToken={setToken} setIsValidToken={setIsValidToken} /> :
                <NewPasswordForm token={token} />}

        </>
    )
}
