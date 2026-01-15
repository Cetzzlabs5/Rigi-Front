import { useState } from "react";
import Modal from "./UI/Modal";
import Button from "./UI/Button";
import Linked from "./UI/Linked";
import Input from "./UI/Input";
import { useForm } from "react-hook-form";

export default function Demo() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleLoading = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }

    const defaultValues = {
        serial: "",
        cuit: "",
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({ defaultValues });

    const onSubmit = (data: typeof defaultValues) => {
        setIsLoading(true);
        setTimeout(() => {
            console.log(data);
            reset();
            setIsLoading(false);
        }, 2000);
    };


    return (
        <div>
            <h1 className="text-h1">Texto con el encabezado Principal</h1>
            <h2 className="text-h2">Texto con el encabezado Secundario</h2>
            {isModalOpen && (
                <Modal title="Modal Title" onClose={() => setIsModalOpen(false)}>
                    <p>Modal Content</p>
                </Modal>
            )}

            <div className="space-y-8">
                <div>
                    <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="tertiary">Tertiary</Button>
                    <Button onClick={handleLoading} loading={isLoading}>Loading</Button>
                </div>

                <div>
                    <Linked to="/" variant="ghost">Home</Linked>
                    <Linked to="/about" variant="secondary">About</Linked>
                    <Linked to="/contact" variant="primary" size="sm" disabled>Contact</Linked>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-xl p-4">
                    <Input
                        id="serial"
                        label="Número de Serie"
                        placeholder="ABC-123-456"
                        {...register("serial", {
                            required: "El número de serie es obligatorio",
                        })}
                        error={errors.serial?.message}
                    />

                    <Input
                        id="cuit"
                        label="CUIT"
                        placeholder="20-12345678-9"
                        {...register("cuit", {
                            required: "El CUIT es obligatorio",
                            pattern: {
                                value: /^\d{2}-\d{8}-\d$/,
                                message: "Formato de CUIT inválido",
                            },
                        })}
                        error={errors.cuit?.message}
                    />

                    <Button type="submit" className="w-full" loading={isLoading}>Enviar</Button>
                </form>
            </div>
        </div>
    )
}
