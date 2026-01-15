import { NavLink } from "react-router";

const baseStyles =
    "base-styles";

const variants = {
    primary:
        "btn-primary",

    secondary:
        "btn-secondary",

    ghost:
        "btn-tertiary",
};

const sizes = {
    xs: "text-caption",
    sm: "text-body-sm",
    md: "text-body",
};

interface LinkedProps extends React.ComponentProps<typeof NavLink> {
    to: string;
    children: React.ReactNode;
    variant?: keyof typeof variants;
    size?: keyof typeof sizes;
    disabled?: boolean;
    activeClassName?: string;
    className?: string;
}

export default function Linked({
    to,
    children,
    variant = "primary",
    size = "md",
    disabled = false,
    activeClassName = "bg-primary-100",
    className = "",
    ...props
}: LinkedProps) {
    if (disabled) {
        return (
            <span
                className={`
          ${baseStyles}
          ${variants[variant]}
          ${sizes[size]}
          opacity-50 disabled:cursor-default
          ${className}
        `}
            >
                {children}
            </span>
        );
    }

    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `
          ${baseStyles}
          ${variants[variant]}
          ${sizes[size]}
          ${isActive ? activeClassName : ""}
          ${className}
        `
            }
            {...props}
        >
            {children}
        </NavLink>
    );
}