/** Shared phone-receiver glyph for the nav call link, mobile drawer footer,
 * and floating call CTA — one shape so all three stay visually consistent. */
export function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 4.5c0-1 .8-1.8 1.8-1.8h2.1c.8 0 1.5.5 1.7 1.3l1 3.3c.2.7 0 1.4-.5 1.9L9.3 10.5a13.5 13.5 0 0 0 5.2 5.2l1.3-1.3c.5-.5 1.2-.7 1.9-.5l3.3 1c.8.2 1.3.9 1.3 1.7v2.1c0 1-.8 1.8-1.8 1.8h-.7C9.8 20.5 3.5 14.2 3.5 6.2v-.7c0-.3 0-.6.1-1Z" />
    </svg>
  );
}
