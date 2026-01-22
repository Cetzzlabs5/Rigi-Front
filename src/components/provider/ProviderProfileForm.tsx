import { useEffect, useState } from 'react'
import { ProviderActivitySelect } from './ProviderActivitySelect'
import Input from '../UI/Input'
import Button from '../UI/Button'
import { getProviderActivities } from '@/services/ProviderActivityAPI'

export function ProviderProfileForm() {
    const [activities, setActivities] = useState<any[]>([])
    const [loadingActivities, setLoadingActivities] = useState(true)
    const [submitting, setSubmitting] = useState(false)

    const [form, setForm] = useState({
        legalName: '',
        phone: '',
        providerActivityId: '',
    })

    useEffect(() => {
        getProviderActivities()
            .then(setActivities)
            .catch(() => {
                console.error('Error al cargar actividades')
            })
            .finally(() => setLoadingActivities(false))
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)

        console.log(form)

        setTimeout(() => {
            setSubmitting(false)
        }, 1000)
    }

    if (loadingActivities) {
        return (
            <div className="bg-surface rounded-lg max-w-md w-full animate-pulse space-y-4">
                <div className="h-6 bg-border rounded w-2/3 m-6" />
                <div className="h-4 bg-border rounded w-2/3 m-6" />
                <hr className='border-border w-full' />
                <div className="h-12 bg-border rounded m-6" />
                <div className="h-12 bg-border rounded m-6" />
                <div className="h-12 bg-border rounded m-6" />
                <div className="h-12 bg-border rounded m-6" />
            </div>
        )
    }

    return (
        <div className="bg-surface rounded-lg shadow-sm max-w-md w-full">
            <div className="border-b border-border p-6">
                <h2 className="text-h2 text-main">
                    Perfil de Proveedor
                </h2>
                <p className="text-body-sm text-muted mt-1">
                    Completá los datos para finalizar tu registro
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-6 p-6"
            >
                <Input
                    id="legalName"
                    label="Razón Social"
                    placeholder="Nombre legal de la empresa"
                    value={form.legalName}
                    onChange={(e) =>
                        setForm({ ...form, legalName: e.target.value })
                    }
                    required
                />

                <Input
                    id="phone"
                    label="Teléfono de contacto"
                    placeholder="+54 9 11 1234 5678"
                    value={form.phone}
                    onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                    }
                    required
                />

                <ProviderActivitySelect
                    value={form.providerActivityId}
                    activities={activities}
                    onChange={(value) =>
                        setForm({ ...form, providerActivityId: value })
                    }
                />

                <div className="pt-2">
                    <Button
                        type="submit"
                        variant="primary"
                        loading={submitting}
                        disabled={submitting}
                        className="w-full"
                    >
                        Guardar y continuar
                    </Button>
                </div>
            </form>
        </div>
    )
}
