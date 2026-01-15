
const baseStyles =
    "base-styles";

const variants = {
    primary:
        "btn-primary",

    secondary:
        "btn-secondary",

    tertiary:
        "btn-tertiary",
};

const disabledStyles =
    "btn-disabled";

const Spinner = () => (
    <svg
        className="size-6 animate-spin"
        viewBox="0 0 24 24"
        fill="none"
    >
        <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
        />
        <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
    </svg>
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: keyof typeof variants;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    loading?: boolean;
    children: React.ReactNode;
    className?: string;
}

export default function Button({ variant = "primary", type = "button", disabled = false, loading = false, children, className, ...props }: ButtonProps) {
    return (
        <button
            type={type}
            disabled={disabled}
            className={`
        ${baseStyles}
        ${variants[variant]}
        ${disabled ? disabledStyles : ""}
        ${className}
      `}
            {...props}
        >
            {loading ? <Spinner /> : children}
        </button>
    )
}
