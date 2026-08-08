import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Shared max-width/padding wrapper — see docs/06-technical/component-structure.md.
 * Every section composes its content inside this rather than hand-rolling
 * its own horizontal padding/max-width.
 */
export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}
