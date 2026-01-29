import { MdOutlineError } from 'react-icons/md';

const ARGENTINE_PROVINCES = [
    'Buenos Aires',
    'Ciudad Autónoma de Buenos Aires',
    'Catamarca',
    'Chaco',
    'Chubut',
    'Córdoba',
    'Corrientes',
    'Entre Ríos',
    'Formosa',
    'Jujuy',
    'La Pampa',
    'La Rioja',
    'Mendoza',
    'Misiones',
    'Neuquén',
    'Río Negro',
    'Salta',
    'San Juan',
    'San Luis',
    'Santa Cruz',
    'Santa Fe',
    'Santiago del Estero',
    'Tierra del Fuego',
    'Tucumán',
] as const;

interface ProvinceSelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
    id: string;
    label?: string;
    value?: string;
    onChange?: (value: string) => void;
    error?: string;
    helperText?: string;
    disabled?: boolean;
    placeholder?: string;
}

export default function ProvinceSelect({
    id,
    label,
    value,
    onChange,
    error,
    helperText,
    disabled = false,
    placeholder = "Seleccioná una provincia",
    ...props
}: ProvinceSelectProps) {
    const hasError = Boolean(error);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (onChange) {
            onChange(e.target.value);
        }
    };

    return (
        <div className="input-wrapper">
            {label && (
                <label htmlFor={id} className="input-label">
                    {label}
                </label>
            )}

            <div className="relative">
                <select
                    id={id}
                    value={value}
                    onChange={handleChange}
                    disabled={disabled}
                    className={`
                        select-base
                        ${disabled
                            ? 'select-disabled'
                            : hasError
                                ? 'select-error'
                                : 'select-default'}
                        ${hasError ? 'pr-10' : 'pr-10'}
                    `}
                    {...props}
                >
                    <option value="" disabled>
                        {placeholder}
                    </option>
                    {ARGENTINE_PROVINCES.map((province) => (
                        <option key={province} value={province}>
                            {province}
                        </option>
                    ))}
                </select>

                {/* Custom arrow icon */}
                <div className="input-icon-right text-main">
                    <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </div>

                {hasError && !disabled && (
                    <span className="input-icon-error">
                        <MdOutlineError />
                    </span>
                )}
            </div>

            {(helperText || error) && (
                <p className={hasError ? 'input-error-text' : 'input-helper-text'}>
                    {error || helperText}
                </p>
            )}
        </div>
    );
}
