import type { ReactNode } from "react";

type FormFieldProps = {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
};

/**
 * Shared label + error wrapper for every form input — see
 * docs/06-technical/component-structure.md. Keeps label association and
 * error announcement (aria-describedby / aria-invalid) consistent across
 * every form on the site rather than re-implemented per field.
 */
export function FormField({
  label,
  htmlFor,
  error,
  required,
  children,
}: FormFieldProps) {
  const errorId = `${htmlFor}-error`;

  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-sm font-medium text-gray-900"
      >
        {label}
        {required && (
          <span aria-hidden="true" className="ml-0.5 text-orange">
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p id={errorId} className="mt-1.5 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export const inputClasses =
  "w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 " +
  "placeholder:text-gray-400 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20";
