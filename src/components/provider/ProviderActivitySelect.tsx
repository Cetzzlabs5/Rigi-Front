interface Props {
    value: string
    onChange: (value: string) => void
    activities: { id: string; name: string }[]
}

export function ProviderActivitySelect({
    value,
    onChange,
    activities,
}: Props) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-body-sm text-main">
                Rubro Principal
            </label>

            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="rounded-md border border-border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-600"
            >
                <option value="">Seleccionar rubro</option>

                {activities.map((activity) => (
                    <option key={activity.id} value={activity.id}>
                        {activity.name}
                    </option>
                ))}
            </select>
        </div>
    )
}
