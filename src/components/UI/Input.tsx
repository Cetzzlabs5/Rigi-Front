import { MdOutlineError } from "react-icons/md";

const baseInputStyles =
    "w-full rounded-md border bg-surface px-3 py-2 text-body text-main " +
    "placeholder:text-muted transition-all focus:outline-none";

const stateStyles = {
    default:
        "border-border focus:border-primary-800 focus:ring-2 focus:ring-primary-800/20",

    error:
        "border-error focus:border-error focus:ring-2 focus:ring-error/20",

    disabled:
        "bg-background text-muted cursor-not-allowed",
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label?: string;
    placeholder?: string;
    type?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    helperText?: string;
    disabled?: boolean;
    className?: string;
}

export default function Input({
    id,
    label,
    placeholder,
    type = "text",
    disabled = false,
    error,
    helperText,
    className = "",
    ...props
}: InputProps) {
    const hasError = Boolean(error);

    return (
        <div className="flex flex-col gap-1.5">

            {label && (
                <label
                    htmlFor={id}
                    className="text-caption font-medium text-main"
                >
                    {label}
                </label>
            )}

            <div className="relative">
                <input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`
            ${baseInputStyles}
            ${disabled
                            ? stateStyles.disabled
                            : hasError
                                ? stateStyles.error
                                : stateStyles.default}
            ${hasError ? "pr-10" : ""}
            ${className}
          `}
                    {...props}
                />

                {hasError && !disabled && (
                    <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-error">
                        <MdOutlineError />
                    </span>
                )}
            </div>

            {(helperText || error) && (
                <p
                    className={`text-caption ${hasError ? "text-error" : "text-muted"
                        }`}
                >
                    {error || helperText}
                </p>
            )}
        </div>
    );
}
