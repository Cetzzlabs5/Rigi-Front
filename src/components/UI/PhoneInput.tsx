import PhoneInputWithCountry from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { MdOutlineError } from 'react-icons/md';

interface PhoneInputProps {
    id: string;
    label?: string;
    value?: string;
    onChange?: (value: string | undefined) => void;
    error?: string;
    helperText?: string;
    disabled?: boolean;
    placeholder?: string;
}

export default function PhoneInput({
    id,
    label,
    value,
    onChange,
    error,
    helperText,
    disabled = false,
    placeholder = "Ej: 11 1234-5678"
}: PhoneInputProps) {
    const hasError = Boolean(error);

    return (
        <div className="input-wrapper">
            {label && (
                <label htmlFor={id} className="input-label">
                    {label}
                </label>
            )}

            <div className="phone-input-container">
                <PhoneInputWithCountry
                    id={id}
                    international
                    defaultCountry="AR"
                    value={value}
                    onChange={(val) => {
                        if (onChange) {
                            onChange(val);
                        }
                    }}
                    disabled={disabled}
                    placeholder={placeholder}
                    className={`
                            phone-input-wrapper
                            ${disabled ? 'phone-input-disabled' : ''}
                            ${hasError ? 'phone-input-error' : ''}
                        `}
                />

                {hasError && !disabled && (
                    <span className="input-icon-right text-error">
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
