import { useNavigate } from 'react-router'
import { useForm, Controller } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { FaRegCircleCheck } from 'react-icons/fa6'
import { MdErrorOutline, MdRefresh } from 'react-icons/md'
import { isValidPhoneNumber } from 'react-phone-number-input'

import { ProviderActivitySelect } from './ProviderActivitySelect'
import {
    updateProviderProfile,
    getProviderActivities,
} from '@/services/ProviderAPI'

import type { UpdateProviderProfileDTO } from '@/types/providerType'

import Input from '../UI/Input'
import PhoneInput from '../UI/PhoneInput'
import ProvinceSelect from '../UI/ProvinceSelect'
import Button from '../UI/Button'
import Modal from '../UI/Modal'
import { useAuth } from '@/hooks/useAuth'
import { useState } from 'react'

type FormData = Omit<UpdateProviderProfileDTO, 'phone'> & {
    phone: string | undefined;
}

export function ProviderProfileForm() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { data: auth, isLoading: authLoading } = useAuth()
    const [openModal, setOpenModal] = useState(false)
    const [error, setError] = useState('')

    const { register, handleSubmit, control, formState: { errors } } = useForm<FormData>({
        defaultValues: {
            phone: undefined,
            providerActivityId: '',
            address: '',
            province: '',
        },
    })

    const {
        data: activities = [],
        isLoading: activitiesLoading,
        isError: activitiesError,
        refetch: refetchActivities
    } = useQuery({
        queryKey: ['provider-activities'],
        queryFn: getProviderActivities,
        retry: 2,
        retryDelay: 1000,
    })

    const { mutate, isPending } = useMutation({
        mutationFn: ({ userId, data }: { userId: string; data: UpdateProviderProfileDTO }) =>
            updateProviderProfile(userId, data),
        onSuccess: async () => {
            setError('')
            await queryClient.invalidateQueries({ queryKey: ['session'] })
            setOpenModal(true)
        },
        onError: (error: any) => {
            console.error('Error al actualizar perfil:', error)

            if (error.response?.status === 400) {
                setError('Los datos ingresados no son válidos. Verificá la información.')
            } else if (error.response?.status === 404) {
                setError('No se encontró el perfil. Contactá con soporte.')
            } else if (error.response?.status === 500) {
                setError('Error del servidor. Intentá nuevamente en unos minutos.')
            } else if (error.message === 'Network Error' || !error.response) {
                setError('No se pudo conectar con el servidor. Verificá tu conexión a internet.')
            } else {
                setError('Hubo un error al actualizar tu perfil. Intentá nuevamente.')
            }
        }
    })

    const onSubmit = (formData: FormData) => {
        setError('')

        if (!formData.phone) {
            setError('El número de teléfono es requerido')
            return
        }

        if (!isValidPhoneNumber(formData.phone)) {
            setError('El número de teléfono no es válido')
            return
        }

        mutate({
            userId: auth!.id,
            data: {
                ...formData,
                phone: formData.phone,
            },
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
                <div className="h-12 bg-border rounded" />
            </div>
        )
    }

    if (activitiesError) {
        return (
            <div className="bg-surface rounded-lg shadow-sm max-w-md w-full p-6">
                <div className="flex flex-col items-center gap-4 text-center">
                    <MdErrorOutline className="text-error size-14" />
                    <div>
                        <h3 className="text-h3 text-main mb-2">Error al cargar datos</h3>
                        <p className="text-body-sm text-muted">
                            No se pudieron cargar las actividades de proveedor.
                            Verificá tu conexión a internet.
                        </p>
                    </div>
                    <Button
                        onClick={() => refetchActivities()}
                        className="base-styles btn-secondary"
                    >
                        <MdRefresh className="size-5" />
                        Reintentar
                    </Button>
                </div>
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

                <Controller
                    control={control}
                    name="phone"
                    rules={{
                        required: 'El número de teléfono es requerido',
                        validate: (value) => {
                            if (!value) return 'El número de teléfono es requerido'
                            if (!isValidPhoneNumber(value)) {
                                return 'El número de teléfono no es válido'
                            }
                            return true
                        }
                    }}
                    render={({ field }) => (
                        <PhoneInput
                            id="phone"
                            label="Teléfono"
                            value={field.value}
                            onChange={field.onChange}
                            error={errors.phone?.message}
                            helperText="Incluye el código de área sin el 0 inicial"
                            placeholder="Ej: 11 1234-5678"
                        />
                    )}
                />

                <Input
                    label="Dirección"
                    id="address"
                    placeholder="Ej: Av. Corrientes 1234"
                    {...register('address', {
                        required: 'La dirección es requerida',
                        minLength: {
                            value: 5,
                            message: 'La dirección debe tener al menos 5 caracteres'
                        }
                    })}
                    error={errors.address?.message}
                />

                <Controller
                    control={control}
                    name="province"
                    rules={{ required: 'Seleccioná una provincia' }}
                    render={({ field }) => (
                        <ProvinceSelect
                            id="province"
                            label="Provincia"
                            value={field.value}
                            onChange={field.onChange}
                            error={errors.province?.message}
                        />
                    )}
                />

                {error && (
                    <div className="error-container">
                        <MdErrorOutline className="error-icon" />
                        <p className="text-error text-body-sm">{error}</p>
                    </div>
                )}

                <Button
                    type="submit"
                    loading={isPending}
                    disabled={isPending}
                    className="w-full"
                >
                    Guardar y continuar
                </Button>
            </form>

            {openModal && (
                <Modal title="" onClose={() => navigate('/dashboard')}>
                    <div className="flex flex-col items-center gap-4 py-6 text-center">
                        <FaRegCircleCheck className="text-success size-14" />
                        <div>
                            <h3 className="text-h3 text-main mb-1">¡Perfil completado!</h3>
                            <p className="text-body-sm text-muted">
                                Tu perfil se guardó correctamente.
                            </p>
                        </div>
                        <Button onClick={() => navigate('/dashboard')}>Ir al panel</Button>
                    </div>
                </Modal>
            )}
        </div>
    )
}
