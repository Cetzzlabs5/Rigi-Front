import { useNavigate } from 'react-router'
import { useForm, Controller } from 'react-hook-form'
import { useMutation, useQuery } from '@tanstack/react-query'
import { FaRegCircleCheck } from 'react-icons/fa6'

import { ProviderActivitySelect } from './ProviderActivitySelect'
import {
    updateProviderProfile,
    getProviderActivities,
    type UpdateProviderProfileDTO,
} from '@/services/ProviderAPI'

import Input from '../UI/Input'
import Button from '../UI/Button'
import Modal from '../UI/Modal'
import { useAuth } from '@/hooks/useAuth'
import { useState } from 'react'

export function ProviderProfileForm() {
    const navigate = useNavigate()
    const { data: auth, isLoading: authLoading } = useAuth()
    const [openModal, setOpenModal] = useState(false)
    const [error, setError] = useState('')

    const { register, handleSubmit, control, formState: { errors } } = useForm<UpdateProviderProfileDTO>({
        defaultValues: {
            phone: '',
            providerActivityId: '',
            address: '',
            province: '',
        },
    })

    const { data: activities = [], isLoading: activitiesLoading } = useQuery({
        queryKey: ['provider-activities'],
        queryFn: getProviderActivities,
    })

    const { mutate, isPending } = useMutation({
        mutationFn: ({ userId, data }: { userId: string; data: UpdateProviderProfileDTO }) =>
            updateProviderProfile(userId, data),
        onSuccess: () => {
            setOpenModal(true)
        },
        onError: (error) => {
            console.log(error)
            setError("Hubo un error al actualizar tu perfil")
        }
    })

    const onSubmit = (formData: UpdateProviderProfileDTO) => {
        mutate({
            userId: auth!.id,
            data: formData,
        })
    }

    if (authLoading || activitiesLoading) {
        return (
            <div className="bg-surface rounded-lg max-w-md w-full animate-pulse space-y-4 p-6">
                <div className="h-6 bg-border rounded w-2/3" />
                <div className="h-4 bg-border rounded w-1/2" />
                <div className="h-12 bg-border rounded" />
                <div className="h-12 bg-border rounded" />
                <div className="h-12 bg-border rounded" />
            </div>
        )
    }

    return (
        <div className="bg-surface rounded-lg shadow-sm max-w-md w-full">
            <div className="border-b border-border p-6">
                <h2 className="text-h2 text-main">Perfil de Proveedor</h2>
                <p className="text-body-sm text-muted mt-1">
                    Completá los datos para finalizar tu registro
                </p>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6 p-6"
            >

                <Controller
                    control={control}
                    name="providerActivityId"
                    rules={{ required: 'Seleccioná una actividad' }}
                    render={({ field }) => (
                        <ProviderActivitySelect
                            value={field.value}
                            activities={activities}
                            onChange={field.onChange}
                            error={errors.providerActivityId?.message}
                        />
                    )}
                />

                <Input
                    label="Teléfono"
                    id="phone"
                    {...register('phone', {
                        required: 'El teléfono es requerido',
                        pattern: {
                            value: /^\+?[0-9]+$/,
                            message: 'Teléfono inválido',
                        },
                    })}
                    error={errors.phone?.message}
                />



                <Input
                    label="Dirección"
                    id="address"
                    {...register('address', {
                        required: 'La dirección es requerida',
                    })}
                    error={errors.address?.message}
                />

                <Input
                    label="Provincia"
                    id="province"
                    {...register('province', {
                        required: 'La provincia es requerida',
                    })}
                    error={errors.province?.message}
                />

                <Button
                    type="submit"
                    loading={isPending}
                    disabled={isPending}
                    className="w-full"
                >
                    Guardar y continuar
                </Button>

                {error && (
                    <p className="text-error text-body-sm">{error}</p>
                )}
            </form>

            {openModal && (
                <Modal title="" onClose={() => navigate('/dashboard')}>
                    <div className="flex flex-col items-center gap-4 py-6 text-center">
                        <FaRegCircleCheck className="text-success size-14" />
                        <p>Tu perfil se completó correctamente.</p>
                        <Button onClick={() => navigate('/dashboard')}>Ir al panel</Button>
                    </div>
                </Modal>
            )}
        </div>
    )
}
