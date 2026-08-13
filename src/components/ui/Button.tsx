import type { ReactNode, ButtonHTMLAttributes } from "react";
import { Link } from "@/i18n/navigation";

type ButtonVariant = "primary" | "secondary" | "ghost";

type BaseProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  /** Shows the "arrow travels right on hover" treatment from docs/04-content/cta-copy.md */
  showArrow?: boolean;
  className?: string;
};

type ButtonAsLink = BaseProps & {
  href: string;
  external?: boolean;
  onClick?: () => void;
};

type ButtonAsButton = BaseProps &
  Pick<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "onClick" | "disabled"> & {
    href?: undefined;
  };

type ButtonProps = ButtonAsLink | ButtonAsButton;

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-teal text-overlay hover:bg-teal/90",
  secondary: "border border-gray-300 text-gray-900 hover:border-gray-400 hover:bg-white",
  ghost: "text-gray-700 hover:text-gray-900",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold " +
  "transition-all duration-200 ease-out hover:-translate-y-[1px] focus-visible:outline focus-visible:outline-2 " +
  "focus-visible:outline-offset-2 focus-visible:outline-teal-deep disabled:cursor-not-allowed disabled:opacity-50";

function Arrow() {
  return (
    <span
      aria-hidden="true"
      className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-0.5"
    >
      →
    </span>
  );
}

/**
 * The one button primitive for every CTA on the site — see
 * docs/04-content/cta-copy.md for the required hover behaviour (gentle
 * elevation, smooth background transition, arrow travel, never a bounce).
 */
export function Button(props: ButtonProps) {
  const { children, variant = "primary", showArrow, className = "" } = props;
  const classes = `group ${baseClasses} ${variantClasses[variant]} ${className}`;

  if ("href" in props && props.href) {
    if (props.external) {
      return (
        <a
          href={props.href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          onClick={props.onClick}
        >
          {children}
          {showArrow && <Arrow />}
        </a>
      );
    }

    return (
      <Link href={props.href} className={classes} onClick={props.onClick}>
        {children}
        {showArrow && <Arrow />}
      </Link>
    );
  }

  const { type = "button", onClick, disabled } = props as ButtonAsButton;

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
      {showArrow && <Arrow />}
    </button>
  );
}
